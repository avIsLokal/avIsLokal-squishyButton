import type { SpongeButtonProps, ResolvedSpongeButtonProps } from '../types';
/**
 * Validate and resolve raw SpongeButtonProps into a fully-populated
 * ResolvedSpongeButtonProps object with sensible defaults.
 *
 * Gracefully handles incompatible combinations:
 *  - If `gradient` is true but `colors` has fewer than 2 entries,
 *    falls back to solid color.
 *  - If `borderGradient` is true but `colors` has fewer than 2 entries,
 *    falls back to solid border.
 *  - Clamps `spread` to [SPREAD_BOUNDS.min, SPREAD_BOUNDS.max].
 *  - Clamps `opacity` to [0, 1].
 */
export declare function resolveProps(props: SpongeButtonProps): ResolvedSpongeButtonProps;
//# sourceMappingURL=validation.d.ts.map