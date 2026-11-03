import { DEFAULT_ANIMATION_CONFIG, SPREAD_BOUNDS } from '../animations/animationConfig';
import type {
  SpongeButtonProps,
  ResolvedSpongeButtonProps,
  SpongeAnimationConfig,
} from '../types';

/**
 * Clamp a numeric value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

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
export function resolveProps(props: SpongeButtonProps): ResolvedSpongeButtonProps {
  const {
    gradient: rawGradient = false,
    borderGradient: rawBorderGradient = false,
    colors = ['#6C63FF', '#3F3D99'],
    color = '#6C63FF',
    spread: rawSpread = 1.15,
    opacity: rawOpacity = 1,
    dimensions,
    text,
    textStyles = [],
    borderWidth = 0,
    borderColor = 'transparent',
    onPress,
    disabled = false,
    animationConfig: partialConfig,
    style,
    accessibilityLabel,
    testID,
  } = props;

  // ── Gradient validation ───────────────────────────────────
  const hasEnoughColors = colors.length >= 2;

  let gradient = rawGradient;
  if (gradient && !hasEnoughColors) {
    if (__DEV__) {
      console.warn(
        '[SpongeButton] gradient=true requires at least 2 colors. Falling back to solid color.',
      );
    }
    gradient = false;
  }

  let borderGradient = rawBorderGradient;
  if (borderGradient && !hasEnoughColors) {
    if (__DEV__) {
      console.warn(
        '[SpongeButton] borderGradient=true requires at least 2 colors. Falling back to solid border.',
      );
    }
    borderGradient = false;
  }

  // ── Numeric clamping ──────────────────────────────────────
  const spread = clamp(rawSpread, SPREAD_BOUNDS.min, SPREAD_BOUNDS.max);
  const opacity = clamp(rawOpacity, 0, 1);

  // ── Dimensions ────────────────────────────────────────────
  const resolvedDimensions = {
    width: dimensions?.width ?? 200,
    height: dimensions?.height ?? 50,
    borderRadius: dimensions?.borderRadius ?? 14,
  };

  // ── Animation config merge ────────────────────────────────
  const animationConfig: SpongeAnimationConfig = {
    ...DEFAULT_ANIMATION_CONFIG,
    ...partialConfig,
  };

  return {
    gradient,
    borderGradient,
    colors,
    color,
    spread,
    opacity,
    dimensions: resolvedDimensions,
    text,
    textStyles,
    borderWidth,
    borderColor,
    onPress: onPress ?? (() => {}),
    disabled,
    animationConfig,
    style,
    accessibilityLabel: accessibilityLabel ?? text,
    testID,
  };
}
