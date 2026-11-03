import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SpongeButton } from '../src';

export default function ExampleApp() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badgeContainer}>
            <Text style={styles.eyebrow}>REACT NATIVE COMPONENT</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>v1.0.0</Text>
            </View>
          </View>
          <Text style={styles.title}>SpongeButton</Text>
          <Text style={styles.subtitle}>
            A customizable animated button with a soft, elastic press interaction.
          </Text>
        </View>

        {/* Section Grid */}
        <View style={styles.grid}>
          {/* 01 - Primary */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>01</Text>
              <View>
                <Text style={styles.cardTitle}>Gradient Button</Text>
                <Text style={styles.description}>Two-color gradient background</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                gradient
                colors={['#FFFFFF', '#3B82F6']}
                spread={1.25}
                opacity={1}
                dimensions={{
                  width: 260,
                  height: 54,
                  borderRadius: 10,
                }}
                text="Get Started"
                textStyles={[
                  {
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000000',
                  },
                ]}
                borderWidth={0}
                onPress={() => Alert.alert('Get Started', 'Button pressed.')}
              />
            </View>
          </View>

          {/* 02 - Gradient Border */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>02</Text>
              <View>
                <Text style={styles.cardTitle}>Gradient Border</Text>
                <Text style={styles.description}>Solid background with gradient outline</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                gradient={false}
                borderGradient
                color="#FFFFFF"
                colors={['#2563EB', '#7C3AED']}
                spread={1.2}
                dimensions={{
                  width: 260,
                  height: 54,
                  borderRadius: 10,
                }}
                text="Continue"
                textStyles={[
                  {
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000000',
                  },
                ]}
                borderWidth={2}
                onPress={() => Alert.alert('Continue', 'Button pressed.')}
              />
            </View>
          </View>

          {/* 03 - Solid */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>03</Text>
              <View>
                <Text style={styles.cardTitle}>Solid Button</Text>
                <Text style={styles.description}>Simple solid-color button</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                color="pink"
                spread={1.3}
                dimensions={{
                  width: 220,
                  height: 50,
                  borderRadius: 10,
                }}
                text="Create Account"
                textStyles={[
                  {
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000000',
                  },
                ]}
                onPress={() => Alert.alert('Create Account', 'Button pressed.')}
              />
            </View>
          </View>

          {/* 04 - Wide */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>04</Text>
              <View>
                <Text style={styles.cardTitle}>Wide Button</Text>
                <Text style={styles.description}>Subtle animation for wider buttons</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                gradient
                colors={['#FFFFFF', '#475569']}
                spread={1.08}
                dimensions={{
                  width: 300,
                  height: 48,
                  borderRadius: 8,
                }}
                text="Explore Components"
                textStyles={[
                  {
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#000000',
                  },
                ]}
                onPress={() => Alert.alert('Explore', 'Button pressed.')}
              />
            </View>
          </View>

          {/* 05 - Disabled */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>05</Text>
              <View>
                <Text style={styles.cardTitle}>Disabled State</Text>
                <Text style={styles.description}>Non-interactive button appearance</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                color="#FFFFFF"
                spread={1.15}
                dimensions={{
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                }}
                text="Unavailable"
                textStyles={[
                  {
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#FFFFFF',
                  },
                ]}
                disabled
              />
            </View>
          </View>

          {/* 06 - Animation */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>06</Text>
              <View>
                <Text style={styles.cardTitle}>Custom Animation</Text>
                <Text style={styles.description}>Adjust spring behavior and bounce</Text>
              </View>
            </View>
            <View style={styles.preview}>
              <SpongeButton
                gradient
                colors={['#FFFFFF', '#F59E0B']}
                spread={1.4}
                dimensions={{
                  width: 160,
                  height: 48,
                  borderRadius: 10,
                }}
                text="Try Animation"
                textStyles={[
                  {
                    fontSize: 14,
                      fontWeight: '400',
                    color: '#000000',
                  },
                ]}
                animationConfig={{
                  spreadDamping: 5,
                  spreadStiffness: 180,
                  recoveryDamping: 6,
                  recoveryStiffness: 100,
                }}
                onPress={() => Alert.alert('Animation', 'Button pressed.')}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerTitle}>SpongeButton</Text>
            <Text style={styles.footerText}>Built for React Native developers.</Text>
          </View>
          <Text style={styles.copyright}>v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#64748B',
  },
  versionBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginTop: 6,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 16,
  },
  number: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    fontVariant: ['tabular-nums'],
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  preview: {
    // minHeight: 96,
    backgroundColor: '#000000',
    borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  footer: {
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContent: {
    gap: 2,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
  },
  copyright: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
});