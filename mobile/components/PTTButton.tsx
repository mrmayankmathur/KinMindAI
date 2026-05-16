import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { Colors, Shadows } from '../constants/theme';

interface PTTButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  isRecording: boolean;
}

export function PTTButton({ onPressIn, onPressOut, isRecording }: PTTButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  return (
    <View style={styles.wrapper}>
      {isRecording && (
        <Animated.View 
          style={[
            styles.pulseRing, 
            { transform: [{ scale: pulseAnim }], opacity: 0.3 }
          ]} 
        />
      )}
      <TouchableOpacity 
        style={[styles.button, isRecording && styles.buttonRecording]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.8}
      >
        <Mic size={28} color={isRecording ? Colors.surface : Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.emergency,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.md,
  },
  buttonRecording: {
    backgroundColor: Colors.emergency,
    borderColor: Colors.emergency,
  },
});
