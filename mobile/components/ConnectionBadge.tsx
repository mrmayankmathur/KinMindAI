import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

interface Props {
  status: 'connected' | 'disconnected';
}

export function ConnectionBadge({ status }: Props) {
  const isConnected = status === 'connected';
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.dot, 
        { backgroundColor: isConnected ? Colors.online : Colors.offline }
      ]} />
      <Text style={styles.text}>
        {isConnected ? 'Local AI Active' : 'Edge Disconnected'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    ...Typography.micro,
    color: Colors.textPrimary,
  },
});
