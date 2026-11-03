import type { SpongeAnimationConfig } from '../types';

/**
 * Default animation configuration for the SpongeButton.
 *
 * These values have been tuned to produce a natural, squishy elastic feel
 * reminiscent of pressing a soft sponge. Adjust via the `animationConfig`
 * prop to fine-tune the dynamics for your use case.
 */
export const DEFAULT_ANIMATION_CONFIG: SpongeAnimationConfig = {
  // Phase 1 – Press: Quick, firm compression
  pressDamping: 12,
  pressStiffness: 200,

  // Phase 2 – Spread: Organic outward expansion
  spreadDamping: 8,
  spreadStiffness: 150,

  // Phase 3 – Recovery: Smooth elastic return
  recoveryDamping: 10,
  recoveryStiffness: 120,

  // Deformation amounts
  compressScale: 0.92,
  squishX: 1.06,
  squishY: 0.88,
};

/**
 * Minimum and maximum boundaries for the `spread` prop.
 */
export const SPREAD_BOUNDS = {
  min: 1.0,
  max: 2.0,
} as const;

/**
 * Duration (ms) to wait before the spread phase begins after press-in.
 * Kept short so the transition feels snappy.
 */
export const SPREAD_DELAY_MS = 80;
