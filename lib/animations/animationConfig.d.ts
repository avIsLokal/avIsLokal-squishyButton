import type { SpongeAnimationConfig } from '../types';
/**
 * Default animation configuration for the SpongeButton.
 *
 * These values have been tuned to produce a natural, squishy elastic feel
 * reminiscent of pressing a soft sponge. Adjust via the `animationConfig`
 * prop to fine-tune the dynamics for your use case.
 */
export declare const DEFAULT_ANIMATION_CONFIG: SpongeAnimationConfig;
/**
 * Minimum and maximum boundaries for the `spread` prop.
 */
export declare const SPREAD_BOUNDS: {
    readonly min: 1;
    readonly max: 2;
};
/**
 * Duration (ms) to wait before the spread phase begins after press-in.
 * Kept short so the transition feels snappy.
 */
export declare const SPREAD_DELAY_MS = 80;
//# sourceMappingURL=animationConfig.d.ts.map