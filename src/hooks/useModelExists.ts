'use client';
import { useEffect, useState } from 'react';

/**
 * HEAD-checks whether a .glb model file is actually present in /public.
 * Lets each 3D section automatically upgrade from the photo fallback to
 * real Three.js the moment the model file is dropped in - no code changes.
 *
 * Returns: null = checking, true = model present, false = use photo fallback.
 */
export function useModelExists(path: string | undefined) {
  const [exists, setExists] = useState<boolean | null>(path ? null : false);

  useEffect(() => {
    if (!path) { setExists(false); return; }
    let active = true;
    fetch(path, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        const type = res.headers.get('content-type') || '';
        // Reject 404s that get rewritten to the HTML app shell.
        setExists(res.ok && !type.includes('text/html'));
      })
      .catch(() => active && setExists(false));
    return () => { active = false; };
  }, [path]);

  return exists;
}
