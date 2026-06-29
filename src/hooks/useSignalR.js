import { useState, useEffect, useCallback, useRef } from 'react';
import * as signalRService from '../services/signalRService';

/**
 * React hook for managing the SignalR connection lifecycle and ride requests.
 *
 * Usage:
 *   const { status, error, connect, broadcastRide, cancelRide, disconnect } = useSignalR(userId);
 *
 * @param {string|null} userId - The user's unique ID (null when not authenticated)
 * @returns {{ status, error, connect, broadcastRide, cancelRide, disconnect, isConnected }}
 */
export function useSignalR(userId) {
  const [status, setStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected' | 'reconnecting'
  const [error, setError] = useState(null);
  const callbacksRef = useRef({});

  // ── Connect ──────────────────────────────────────────────────────────────

  const connect = useCallback(async (callbacks = {}) => {
    if (!userId) {
      setError('No user ID provided');
      return;
    }

    callbacksRef.current = callbacks;

    try {
      setError(null);
      setStatus('connecting');
      await signalRService.connect(userId, {
        ...callbacks,
        onStatusChange: (s) => {
          setStatus(s);
          callbacks.onStatusChange?.(s);
        },
      });
    } catch (e) {
      const msg = e?.message || String(e);
      setError(msg);
      setStatus('disconnected');
      callbacks.onError?.(msg);
    }
  }, [userId]);

  // ── Broadcast ride request ───────────────────────────────────────────────

  const broadcastRide = useCallback(async (rideData) => {
    try {
      setError(null);
      await signalRService.broadcastRideRequest(rideData);
    } catch (e) {
      const msg = e?.message || String(e);
      setError(msg);
      throw e;
    }
  }, []);

  // ── Cancel ride request ──────────────────────────────────────────────────

  const cancelRide = useCallback(async (rideData) => {
    try {
      await signalRService.cancelRideRequest(rideData);
    } catch (_) {
      // best effort
    }
  }, []);

  // ── Disconnect ───────────────────────────────────────────────────────────

  const disconnect = useCallback(async () => {
    await signalRService.disconnect();
    setStatus('disconnected');
    setError(null);
  }, []);

  // ── Auto-disconnect on unmount ───────────────────────────────────────────

  useEffect(() => {
    return () => {
      signalRService.disconnect();
    };
  }, []);

  return {
    status,
    error,
    connect,
    broadcastRide,
    cancelRide,
    disconnect,
    isConnected: status === 'connected',
  };
}
