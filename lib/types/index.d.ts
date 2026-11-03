import { TextStyle, ViewStyle } from 'react-native';
/**
 * Configuration for the sponge animation timing and dynamics.
 */
export interface SpongeAnimationConfig {
    /** Spring damping for the press phase. Higher = less bouncy. @default 12 */
    pressDamping: number;
    /** Spring stiffness for the press phase. Higher = faster snap. @default 200 */
    pressStiffness: number;
    /** Spring damping for the spread phase. @default 8 */
    spreadDamping: number;
    /** Spring stiffness for the spread phase. @default 150 */
    spreadStiffness: number;
    /** Spring damping for the recovery phase. @default 10 */
    recoveryDamping: number;
    /** Spring stiffness for the recovery phase. @default 120 */
    recoveryStiffness: number;
    /** How much the button compresses on press (0-1). @default 0.92 */
    compressScale: number;
    /** Horizontal squish factor during press. @default 1.06 */
    squishX: number;
    /** Vertical squish factor during press. @default 0.88 */
    squishY: number;
}
/**
 * Props for the SpongeButton component.
 */
export interface SpongeButtonProps {
    /** Enable gradient background. When true, `colors` is used. @default false */
    gradient?: boolean;
    /** Enable gradient border. When true, `colors` is used for the border gradient. @default false */
    borderGradient?: boolean;
    /**
     * Array of colors for the gradient background and/or border.
     * Must contain at least 2 colors when `gradient` or `borderGradient` is true.
     * @default ['#6C63FF', '#3F3D99']
     */
    colors?: string[];
    /** Solid background color. Used when `gradient` is false. @default '#6C63FF' */
    color?: string;
    /**
     * Controls how far the button expands during the squishy-spread phase.
     * A value of 1.0 means no spread, 1.3 means 30% expansion.
     * @default 1.15
     */
    spread?: number;
    /** Overall button opacity. @default 1 */
    opacity?: number;
    /** Button dimensions including width, height, and optional border radius. */
    dimensions?: {
        /** Width of the button. Numbers are in points; strings can use '%'. @default 200 */
        width: number | string;
        /** Height of the button. Numbers are in points; strings can use '%'. @default 50 */
        height: number | string;
        /** Border radius. @default 14 */
        borderRadius?: number;
    };
    /** Button label text. */
    text: string;
    /**
     * Array of TextStyle objects merged left-to-right onto the default text style.
     * Later entries override earlier ones.
     */
    textStyles?: TextStyle[];
    /** Border thickness. @default 0 */
    borderWidth?: number;
    /** Solid border color. Used when `borderGradient` is false. @default 'transparent' */
    borderColor?: string;
    /** Callback fired on press. */
    onPress?: () => void;
    /** Whether the button is disabled. @default false */
    disabled?: boolean;
    /** Override default animation configuration. */
    animationConfig?: Partial<SpongeAnimationConfig>;
    /** Additional style applied to the outermost container. */
    style?: ViewStyle;
    /** Custom accessibility label. Falls back to `text` if not provided. */
    accessibilityLabel?: string;
    /** Test ID for testing frameworks. */
    testID?: string;
}
/**
 * Resolved (non-optional) props with defaults applied.
 * Used internally after validation.
 */
export interface ResolvedSpongeButtonProps {
    gradient: boolean;
    borderGradient: boolean;
    colors: string[];
    color: string;
    spread: number;
    opacity: number;
    dimensions: {
        width: number | string;
        height: number | string;
        borderRadius: number;
    };
    text: string;
    textStyles: TextStyle[];
    borderWidth: number;
    borderColor: string;
    onPress: () => void;
    disabled: boolean;
    animationConfig: SpongeAnimationConfig;
    style?: ViewStyle;
    accessibilityLabel: string;
    testID?: string;
}
//# sourceMappingURL=index.d.ts.map