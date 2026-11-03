import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, runOnUI, } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { animatePressIn, animateSpread, animateRecovery, } from '../animations/spongeAnimation';
import { SPREAD_DELAY_MS } from '../animations/animationConfig';
import { resolveProps } from '../utils/validation';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
/**
 * SpongeButton – A squishy, elastic animated button for React Native.
 *
 * When pressed, it compresses like a soft sponge, spreads outward organically,
 * then smoothly recovers to its original shape. All animation runs on the
 * native UI thread via Reanimated worklets — zero React re-renders during
 * animation.
 */
const SpongeButton = (rawProps) => {
    const props = useMemo(() => resolveProps(rawProps), [rawProps]);
    const { gradient, borderGradient, colors, color, spread, opacity: buttonOpacity, dimensions, text, textStyles, borderWidth, borderColor, onPress, disabled, animationConfig, style: externalStyle, accessibilityLabel, testID, } = props;
    // ── Shared values (UI thread) ─────────────────────────────
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    // ── Animated transform style ──────────────────────────────
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }), []);
    // ── Spread timer ref ──────────────────────────────────────
    const spreadTimerRef = React.useRef(null);
    // ── Press handlers ────────────────────────────────────────
    const handlePressIn = useCallback(() => {
        if (disabled)
            return;
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
    const mergedTextStyle = useMemo(() => {
        const base = {
            fontSize: 16,
            fontWeight: '600',
            color: '#FFFFFF',
            textAlign: 'center',
        };
        return Object.assign(base, ...textStyles);
    }, [textStyles]);
    const containerStyle = useMemo(() => ({
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.borderRadius,
        opacity: disabled ? 0.5 : buttonOpacity,
        overflow: 'hidden',
    }), [dimensions, buttonOpacity, disabled]);
    // Solid border style (used when borderGradient is false)
    const solidBorderStyle = useMemo(() => {
        if (borderGradient || borderWidth <= 0)
            return undefined;
        return {
            borderWidth,
            borderColor,
        };
    }, [borderGradient, borderWidth, borderColor]);
    // ── Render helpers ────────────────────────────────────────
    const renderBackground = () => {
        if (gradient) {
            return (_jsx(LinearGradient, { colors: colors, start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: StyleSheet.absoluteFill }));
        }
        return (_jsx(View, { style: [StyleSheet.absoluteFill, { backgroundColor: color }] }));
    };
    const renderContent = () => (_jsx(View, { style: styles.contentContainer, children: _jsx(Text, { style: mergedTextStyle, numberOfLines: 1, allowFontScaling: false, children: text }) }));
    // ── Gradient border wrapper ───────────────────────────────
    if (borderGradient && borderWidth > 0) {
        return (_jsxs(AnimatedPressable, { onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: handlePress, disabled: disabled, accessible: true, accessibilityRole: 'button', accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, testID: testID, style: [
                animatedStyle,
                {
                    borderRadius: dimensions.borderRadius,
                    padding: borderWidth,
                    overflow: 'hidden',
                },
                externalStyle,
            ], children: [_jsx(LinearGradient, { colors: colors, start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: [
                        StyleSheet.absoluteFill,
                        { borderRadius: dimensions.borderRadius },
                    ] }), _jsxs(View, { style: [
                        containerStyle,
                        {
                            borderRadius: Math.max(0, dimensions.borderRadius - borderWidth),
                        },
                    ], children: [renderBackground(), renderContent()] })] }));
    }
    // ── Standard (no gradient border) render ──────────────────
    return (_jsxs(AnimatedPressable, { onPressIn: handlePressIn, onPressOut: handlePressOut, onPress: handlePress, disabled: disabled, accessible: true, accessibilityRole: 'button', accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, testID: testID, style: [
            animatedStyle,
            containerStyle,
            solidBorderStyle,
            externalStyle,
        ], children: [renderBackground(), renderContent()] }));
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
