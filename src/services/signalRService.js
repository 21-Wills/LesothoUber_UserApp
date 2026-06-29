import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

/**
 * SignalR service for the Leeto passenger app.
 *
 * Architecture (Azure SignalR Serverless mode):
 *   - WebSocket connection  → for RECEIVING real-time events (RideAccepted, etc.)
 *   - REST API POST calls    → for SENDING ride requests to the drivers group
 *
 * NOTE: This passenger app does NOT track driver locations.
 *       It only broadcasts ride requests and listens for responses.
 */

// ── Configuration ────────────────────────────────────────────────────────────

// Dev (no env var):  uses Vite proxy → /api
// Prod (VITE_API_URL): uses full Azure URL
let _apiBase = import.meta.env.VITE_API_URL || '/api';
const DRIVERS_GROUP = 'drivers';

let connection = null;
let currentUserId = null;

// ── Public API ───────────────────────────────────────────────────────────────

export function getApiBase() {
  return _apiBase;
}

export function setApiBase(url) {
  _apiBase = url;
}

/**
 * Connect to the SignalR hub via WebSocket (for receiving events).
 */
export async function connect(userId, callbacks = {}) {
  if (connection && connection.state === HubConnectionState.Connected) {
    return connection;
  }

  currentUserId = userId;

  connection = new HubConnectionBuilder()
    .withUrl(_apiBase, {
      headers: { 'x-ms-signalr-userid': userId },
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Warning)
    .build();

  // ── Incoming events ──
  // NOTE: Azure SignalR Service may lowercase event names, so we register
  //       both casings to be safe.

  // newRideRequest / newriderequest — sent when a ride is requested
  connection.on('newRideRequest', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideRequest?.(parsed));
  });
  connection.on('newriderequest', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideRequest?.(parsed));
  });

  // RideAccepted / rideaccepted
  connection.on('RideAccepted', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideAccepted?.(parsed));
  });
  connection.on('rideaccepted', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideAccepted?.(parsed));
  });

  // RideDeclined / ridedeclined
  connection.on('RideDeclined', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideDeclined?.(parsed));
  });
  connection.on('ridedeclined', (data) => {
    _safeParse(data, (parsed) => callbacks.onRideDeclined?.(parsed));
  });

  // groupMessage / groupmessage — broadcast messages from the group
  connection.on('groupMessage', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });
  connection.on('groupmessage', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });

  // userJoined / userjoined — someone joined the group
  connection.on('userJoined', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });
  connection.on('userjoined', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });

  // userLeft / userleft — someone left the group
  connection.on('userLeft', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });
  connection.on('userleft', (data) => {
    _safeParse(data, (parsed) => callbacks.onGroupMessage?.(parsed));
  });

  // ── Connection lifecycle ──
  connection.onreconnecting(() => callbacks.onStatusChange?.('reconnecting'));
  connection.onreconnected(async () => {
    callbacks.onStatusChange?.('connected');
    try { await joinDriversGroup(userId); } catch (_) { /* best effort */ }
  });
  connection.onclose(() => callbacks.onStatusChange?.('disconnected'));

  await connection.start();

  try { await joinDriversGroup(userId); } catch (_) { /* non-fatal */ }

  callbacks.onStatusChange?.('connected');
  return connection;
}

/**
 * Join the drivers group via REST API.
 */
export async function joinDriversGroup(userId) {
  return _post('/group-join', { userId, group: DRIVERS_GROUP });
}

/**
 * Request a ride — matches the reference app's submitRideRequest() flow.
 *
 * Calls POST /api/request-ride with the exact same payload shape
 * as the lesothoubertest_userapplication reference:
 *   { userId, driverId, pickupLocation, destination }
 *
 * The Azure Function logs the request and sends a newRideRequest
 * SignalR message to the target driver.
 *
 * Also broadcasts to the drivers group via POST /api/group-send
 * so ALL connected drivers see the request.
 *
 * @param {object} rideData
 * @param {string} rideData.userId
 * @param {string} rideData.pickupLocation
 * @param {string} rideData.destination
 * @param {number} rideData.price
 */
export async function broadcastRideRequest(rideData) {
  _setLastRequest(rideData);

  const userId = rideData.userId || currentUserId || 'passenger';

  // 1) Send to /api/request-ride (exact reference format)
  //    This logs the ride request and sends newRideRequest to the driver.
  const requestRidePayload = {
    userId,
    driverId: DRIVERS_GROUP,  // broadcast target — all drivers in the group
    pickupLocation: rideData.pickupLocation,
    destination: rideData.destination,
  };

  // 2) Also broadcast to the drivers group via /api/group-send
  //    so every connected driver receives it in real time.
  const groupMessage = JSON.stringify({
    type: 'ride_request',
    userId,
    pickupLocation: rideData.pickupLocation,
    destination: rideData.destination,
    price: rideData.price,
    timestamp: rideData.timestamp || Date.now(),
  });

  // Fire both in parallel — request-ride for logging, group-send for broadcast
  const results = await Promise.allSettled([
    _post('/request-ride', requestRidePayload),
    _post('/group-send', {
      group: DRIVERS_GROUP,
      sender: userId,
      message: groupMessage,
    }),
  ]);

  // Throw if both failed
  if (results.every((r) => r.status === 'rejected')) {
    throw results[0].reason || results[1].reason;
  }

  return results;
}

/**
 * Cancel an in-progress ride request.
 */
export async function cancelRideRequest(rideData) {
  _clearLastRequest();

  const userId = rideData.userId || currentUserId || 'passenger';
  const message = JSON.stringify({
    type: 'ride_cancelled',
    userId,
    pickupLocation: rideData.pickupLocation,
    destination: rideData.destination,
    price: rideData.price,
  });

  try {
    await _post('/group-send', {
      group: DRIVERS_GROUP,
      sender: userId,
      message,
    });
  } catch (_) { /* best effort */ }
}

export async function disconnect() {
  _clearLastRequest();
  if (connection) {
    try { await connection.stop(); } catch (_) { /* best effort */ }
    connection = null;
    currentUserId = null;
  }
}

export function isConnected() {
  return connection?.state === HubConnectionState.Connected;
}

export function getConnection() {
  return connection;
}

export function getCurrentUserId() {
  return currentUserId;
}

// ── Internal ─────────────────────────────────────────────────────────────────

let _lastRequest = null;

function _setLastRequest(data)  { _lastRequest = data; }
function _getLastRequest()      { return _lastRequest; }
function _clearLastRequest()    { _lastRequest = null; }

async function _post(endpoint, body) {
  const url = `${_apiBase}${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`POST ${endpoint} failed (${res.status}): ${text}`);
  }

  return res.json();
}

function _safeParse(data, callback) {
  if (typeof data === 'string') {
    try { callback(JSON.parse(data)); } catch (_) { callback(data); }
  } else {
    callback(data);
  }
}
