import React, { useCallback, useMemo } from 'react';
import {
  AccessibilityRole,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  animatePressIn,
  animateSpread,
  animateRecovery,
} from '../animations/spongeAnimation';
import { SPREAD_DELAY_MS } from '../animations/animationConfig';
import { resolveProps } from '../utils/validation';
import type { SpongeButtonProps } from '../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * SpongeButton – A squishy, elastic animated button for React Native.
 *
 * When pressed, it compresses like a soft sponge, spreads outward organically,
 * then smoothly recovers to its original shape. All animation runs on the
 * native UI thread via Reanimated worklets — zero React re-renders during
 * animation.
 */
const SpongeButton: React.FC<SpongeButtonProps> = (rawProps) => {
  const props = useMemo(() => resolveProps(rawProps), [rawProps]);

  const {
    gradient,
    borderGradient,
    colors,
    color,
    spread,
    opacity: buttonOpacity,
    dimensions,
    text,
    textStyles,
    borderWidth,
    borderColor,
    onPress,
    disabled,
    animationConfig,
    style: externalStyle,
    accessibilityLabel,
    testID,
  } = props;

  // ── Shared values (UI thread) ─────────────────────────────
  const scaleX = useSharedValue(1);
  const scaleY = useSharedValue(1);

  // ── Animated transform style ──────────────────────────────
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
  }), []);

  // ── Spread timer ref ──────────────────────────────────────
  const spreadTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Press handlers ────────────────────────────────────────
  const handlePressIn = useCallback(() => {
    if (disabled) return;

    // Clear any pending spread from a previous rapid press
    if (spreadTimerRef.current) {
      clearTimeout(spreadTimerRef.current);
      spreadTimerRef.current = null;
    }

    // Phase 1 – Compress
    runOnUI(animatePressIn)(scaleX, scaleY, animationConfig);

    // Phase 2 – Spread (after short delay for the press to register visually)
    spreadTimerRef.current = setTimeout(() => {
      runOnUI(animateSpread)(scaleX, scaleY, spread, animationConfig);
    }, SPREAD_DELAY_MS);
  }, [disabled, spread, animationConfig, scaleX, scaleY]);

  const handlePressOut = useCallback(() => {
    // Clear spread timer if user lifts before spread fires
    if (spreadTimerRef.current) {
      clearTimeout(spreadTimerRef.current);
      spreadTimerRef.current = null;
    }

    // Phase 3 – Recovery
    runOnUI(animateRecovery)(scaleX, scaleY, animationConfig);
  }, [animationConfig, scaleX, scaleY]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress();
    }
  }, [disabled, onPress]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (spreadTimerRef.current) {
        clearTimeout(spreadTimerRef.current);
      }
    };
  }, []);

  // ── Resolved styles ───────────────────────────────────────
  const mergedTextStyle: TextStyle = useMemo(() => {
    const base: TextStyle = {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
    };
    return Object.assign(base, ...textStyles);
  }, [textStyles]);

  const containerStyle: ViewStyle = useMemo(
    () => ({
      width: dimensions.width as number,
      height: dimensions.height as number,
      borderRadius: dimensions.borderRadius,
      opacity: disabled ? 0.5 : buttonOpacity,
      overflow: 'hidden' as const,
    }),
    [dimensions, buttonOpacity, disabled],
  );

  // Solid border style (used when borderGradient is false)
  const solidBorderStyle: ViewStyle | undefined = useMemo(() => {
    if (borderGradient || borderWidth <= 0) return undefined;
    return {
      borderWidth,
      borderColor,
    };
  }, [borderGradient, borderWidth, borderColor]);

  // ── Render helpers ────────────────────────────────────────

  const renderBackground = () => {
    if (gradient) {
      return (
        <LinearGradient
          colors={colors as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      );
    }
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: color }]} />
    );
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text
        style={mergedTextStyle}
        numberOfLines={1}
        allowFontScaling={false}
      >
        {text}
      </Text>
    </View>
  );

  // ── Gradient border wrapper ───────────────────────────────
  if (borderGradient && borderWidth > 0) {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        accessible
        accessibilityRole={'button' as AccessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        testID={testID}
        style={[
          animatedStyle,
          {
            borderRadius: dimensions.borderRadius,
            padding: borderWidth,
            overflow: 'hidden' as const,
          },
          externalStyle,
        ]}
      >
        {/* Gradient border layer */}
        <LinearGradient
          colors={colors as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: dimensions.borderRadius },
          ]}
        />
        {/* Inner content with clipped corners */}
        <View
          style={[
            containerStyle,
            {
              borderRadius: Math.max(0, dimensions.borderRadius - borderWidth),
            },
          ]}
        >
          {renderBackground()}
          {renderContent()}
        </View>
      </AnimatedPressable>
    );
  }

  // ── Standard (no gradient border) render ──────────────────
  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      accessible
      accessibilityRole={'button' as AccessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      testID={testID}
      style={[
        animatedStyle,
        containerStyle,
        solidBorderStyle,
        externalStyle,
      ]}
    >
      {renderBackground()}
      {renderContent()}
    </AnimatedPressable>
  );
};

// ── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SpongeButton);
