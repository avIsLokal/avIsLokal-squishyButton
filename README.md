# 🧽 SpongeButton

A squishy, elastic animated button component for React Native — press it and watch it compress, spread, and bounce back like a soft sponge.

Built with **React Native Reanimated** for buttery-smooth 60 FPS+ animations that run entirely on the native UI thread with zero React re-renders during animation.

---

## ✨ Features

- **Squishy press** — compresses on touch with organic deformation
- **Elastic spread** — expands outward with configurable spread factor
- **Smooth recovery** — springs back to its original shape naturally
- **Gradient backgrounds** — linear gradients with customizable colors
- **Gradient borders** — gradient-stroked borders for eye-catching designs
- **Fully typed** — strict TypeScript with zero `any` usage
- **Accessible** — screen reader support, disabled state, reduced-motion aware
- **Cross-platform** — works on iOS, Android, and Expo
- **New Architecture ready** — compatible with React Native's New Architecture

---

## 📦 Installation

```bash
npm install sponge-button
```

### Peer Dependencies

Make sure these are installed in your project:

```bash
npx expo install react-native-reanimated expo-linear-gradient react-native-gesture-handler
```

| Peer Dependency | Version |
|---|---|
| `react` | ≥ 18.0.0 |
| `react-native` | ≥ 0.72.0 |
| `react-native-reanimated` | ≥ 3.0.0 |
| `expo-linear-gradient` | ≥ 12.0.0 |

> **Expo users**: All dependencies are Expo-compatible. Use `npx expo install` for automatic version resolution.

### Babel Configuration

Add the Reanimated Babel plugin to your `babel.config.js` (if not already present):

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

---

## 🚀 Basic Usage

```tsx
import { SpongeButton } from 'sponge-button';

function MyScreen() {
  return (
    <SpongeButton
      gradient
      colors={['#00C853', '#B2FF59']}
      spread={1.25}
      dimensions={{
        width: 200,
        height: 55,
        borderRadius: 16,
      }}
      text="Get Started"
      textStyles={[
        {
          fontSize: 16,
          fontWeight: '700',
          color: '#FFFFFF',
        },
      ]}
      onPress={() => console.log('Pressed!')}
    />
  );
}
```

---

## 📖 Props

### Appearance

| Prop | Type | Default | Description |
|---|---|---|---|
| `gradient` | `boolean` | `false` | Use gradient background from `colors` |
| `borderGradient` | `boolean` | `false` | Use gradient border from `colors` |
| `colors` | `string[]` | `['#6C63FF', '#3F3D99']` | Gradient color stops (need ≥ 2) |
| `color` | `string` | `'#6C63FF'` | Solid background color (when `gradient` is false) |
| `opacity` | `number` | `1` | Button opacity (0–1) |
| `borderWidth` | `number` | `0` | Border thickness |
| `borderColor` | `string` | `'transparent'` | Solid border color |

### Animation

| Prop | Type | Default | Description |
|---|---|---|---|
| `spread` | `number` | `1.15` | Max spread factor (1.0–2.0) |
| `animationConfig` | `Partial<SpongeAnimationConfig>` | See below | Override spring dynamics |

### Dimensions

| Prop | Type | Default | Description |
|---|---|---|---|
| `dimensions.width` | `number \| string` | `200` | Button width |
| `dimensions.height` | `number \| string` | `50` | Button height |
| `dimensions.borderRadius` | `number` | `14` | Corner radius |

### Text

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | **(required)** | Button label |
| `textStyles` | `TextStyle[]` | `[]` | Array of styles merged onto defaults |

### Interaction

| Prop | Type | Default | Description |
|---|---|---|---|
| `onPress` | `() => void` | `undefined` | Press callback |
| `disabled` | `boolean` | `false` | Disables the button (50% opacity) |

### Advanced

| Prop | Type | Default | Description |
|---|---|---|---|
| `style` | `ViewStyle` | `undefined` | Style for the outer container |
| `accessibilityLabel` | `string` | `text` value | Custom a11y label |
| `testID` | `string` | `undefined` | Test ID |

---

## 🎛 Animation Configuration

Override individual spring parameters via `animationConfig`:

```tsx
<SpongeButton
  text="Bouncy"
  animationConfig={{
    // Phase 1: Press compression
    pressDamping: 12,      // Lower = bouncier
    pressStiffness: 200,   // Higher = snappier

    // Phase 2: Spread expansion
    spreadDamping: 8,
    spreadStiffness: 150,

    // Phase 3: Recovery
    recoveryDamping: 10,
    recoveryStiffness: 120,

    // Deformation amounts
    compressScale: 0.92,   // How much it shrinks on press
    squishX: 1.06,         // Horizontal squish
    squishY: 0.88,         // Vertical squish
  }}
/>
```

### Animation Phases

```
Press In           Spread            Recovery
┌─────────┐    ┌──────────────┐    ┌─────────┐
│ ╔═════╗ │    │╔════════════╗│    │ ╔═════╗ │
│ ║     ║ │ →  │║            ║│ →  │ ║     ║ │
│ ╚═════╝ │    │╚════════════╝│    │ ╚═════╝ │
└─────────┘    └──────────────┘    └─────────┘
  Compress        Expand            Restore
  scaleX↑↓        scaleX↑           scale=1
  scaleY↓         scaleY↑
```

---

## 🎨 Customization Examples

### Gradient Background

```tsx
<SpongeButton
  gradient
  colors={['#E040FB', '#7C4DFF', '#536DFE']}
  spread={1.2}
  dimensions={{ width: 240, height: 52, borderRadius: 26 }}
  text="Magic Button"
  textStyles={[{ fontSize: 16, fontWeight: '700', color: '#FFF' }]}
  onPress={() => {}}
/>
```

### Solid Color + Gradient Border

```tsx
<SpongeButton
  color="#1A1A2E"
  borderGradient
  colors={['#E040FB', '#7C4DFF']}
  borderWidth={2}
  spread={1.15}
  dimensions={{ width: 240, height: 52, borderRadius: 26 }}
  text="Continue"
  textStyles={[{ fontSize: 15, fontWeight: '600', color: '#E040FB' }]}
  onPress={() => {}}
/>
```

### Pill Shape

```tsx
<SpongeButton
  color="#FF5722"
  spread={1.3}
  dimensions={{ width: 180, height: 48, borderRadius: 24 }}
  text="Sign Up"
  onPress={() => {}}
/>
```

---

## 📱 Platform Support

| Platform | Status |
|---|---|
| iOS | ✅ Fully supported |
| Android | ✅ Fully supported |
| Web (Expo) | ⚠️ Best-effort (Reanimated web support) |

---

## 🏗 Project Structure

```
src/
├── components/
│   └── SpongeButton.tsx      # Main component
├── animations/
│   ├── spongeAnimation.ts    # Press/Spread/Recovery worklets
│   └── animationConfig.ts    # Default spring constants
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   └── validation.ts         # Prop resolution & validation
└── index.ts                  # Barrel export

example/
└── ExampleApp.tsx             # Interactive demo
```

---

## ♿ Accessibility

- Sets `accessibilityRole="button"` automatically
- Forwards `accessibilityLabel` (defaults to `text`)
- Reports `accessibilityState.disabled` when the button is disabled
- Disabled buttons render at 50% opacity and ignore touch events

---

## 📄 License

MIT
# avIsLokal-squishyButton
