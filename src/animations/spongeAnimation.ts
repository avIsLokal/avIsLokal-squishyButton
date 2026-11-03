import {
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from 'react-native-reanimated';
import type { SpongeAnimationConfig } from '../types';

// ── Spring helpers ──────────────────────────────────────────

function pressSpring(config: SpongeAnimationConfig): WithSpringConfig {
  'worklet';
  return {
    damping: config.pressDamping,
    stiffness: config.pressStiffness,
    mass: 1,
    overshootClamping: false,
  };
}

function spreadSpring(config: SpongeAnimationConfig): WithSpringConfig {
  'worklet';
  return {
    damping: config.spreadDamping,
    stiffness: config.spreadStiffness,
    mass: 1,
    overshootClamping: false,
  };
}

function recoverySpring(config: SpongeAnimationConfig): WithSpringConfig {
  'worklet';
  return {
    damping: config.recoveryDamping,
    stiffness: config.recoveryStiffness,
    mass: 1,
    overshootClamping: false,
  };
}

// ── Public animation API ────────────────────────────────────

/**
 * Phase 1 – Press In
 *
 * Compresses the button slightly to simulate a soft sponge being pressed.
 * ScaleX widens a bit (squish) while ScaleY shrinks, giving an organic feel.
 */
export function animatePressIn(
  scaleX: SharedValue<number>,
  scaleY: SharedValue<number>,
  config: SpongeAnimationConfig,
): void {
  'worklet';
  const springCfg = pressSpring(config);
  scaleX.value = withSpring(config.squishX * config.compressScale, springCfg);
  scaleY.value = withSpring(config.squishY * config.compressScale, springCfg);
}

/**
 * Phase 2 – Squishy Spread
 *
 * After the initial compression, the button elastically expands outward
 * in a slightly asymmetric fashion (X spreads a tiny bit more than Y)
 * to mimic organic sponge-like expansion.
 *
 * @param spread – The user-configurable max spread factor (e.g. 1.15).
 */
export function animateSpread(
  scaleX: SharedValue<number>,
  scaleY: SharedValue<number>,
  spread: number,
  config: SpongeAnimationConfig,
): void {
  'worklet';
  const springCfg = spreadSpring(config);

  // Slightly more horizontal spread for organic feel
  const asymmetry = 0.02;
  scaleX.value = withSpring(spread + asymmetry, springCfg);
  scaleY.value = withSpring(spread - asymmetry, springCfg);
}

/**
 * Phase 3 – Recovery
 *
 * Smoothly returns the button to its resting (1, 1) scale using a softer
 * spring so it feels like a sponge settling back into shape.
 */
export function animateRecovery(
  scaleX: SharedValue<number>,
  scaleY: SharedValue<number>,
  config: SpongeAnimationConfig,
): void {
  'worklet';
  const springCfg = recoverySpring(config);
  scaleX.value = withSpring(1, springCfg);
  scaleY.value = withSpring(1, springCfg);
}
