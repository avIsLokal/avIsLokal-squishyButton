import { type SharedValue } from 'react-native-reanimated';
import type { SpongeAnimationConfig } from '../types';
/**
 * Phase 1 – Press In
 *
 * Compresses the button slightly to simulate a soft sponge being pressed.
 * ScaleX widens a bit (squish) while ScaleY shrinks, giving an organic feel.
 */
export declare function animatePressIn(scaleX: SharedValue<number>, scaleY: SharedValue<number>, config: SpongeAnimationConfig): void;
/**
 * Phase 2 – Squishy Spread
 *
 * After the initial compression, the button elastically expands outward
 * in a slightly asymmetric fashion (X spreads a tiny bit more than Y)
 * to mimic organic sponge-like expansion.
 *
 * @param spread – The user-configurable max spread factor (e.g. 1.15).
 */
export declare function animateSpread(scaleX: SharedValue<number>, scaleY: SharedValue<number>, spread: number, config: SpongeAnimationConfig): void;
/**
 * Phase 3 – Recovery
 *
 * Smoothly returns the button to its resting (1, 1) scale using a softer
 * spring so it feels like a sponge settling back into shape.
 */
export declare function animateRecovery(scaleX: SharedValue<number>, scaleY: SharedValue<number>, config: SpongeAnimationConfig): void;
//# sourceMappingURL=spongeAnimation.d.ts.map