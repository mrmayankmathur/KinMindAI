import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  reasoning_text: string;
}

export function ThinkingBlock({ reasoning_text }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const lines = reasoning_text.split('\n').filter(l => l.trim() !== '');
  const firstLine = lines.length > 0 ? lines[0] : '';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.headerLeft}>
          <Brain size={16} color={Colors.textSecondary} />
          {!expanded && firstLine ? (
            <Text style={styles.previewText} numberOfLines={1}>
              {firstLine}...
            </Text>
          ) : (
            <Text style={styles.title}>AI Reasoning</Text>
          )}
        </View>
        {expanded ? (
          <ChevronUp size={16} color={Colors.textSecondary} />
        ) : (
          <ChevronDown size={16} color={Colors.textSecondary} />
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          <Text style={styles.reasoningText}>
            {reasoning_text.split('\n').map((line, i) => (
              <Text key={i}>{'> '} {line}{'\n'}</Text>
            ))}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  title: {
    ...Typography.micro,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  previewText: {
    ...Typography.micro,
    color: Colors.textSecondary,
    fontWeight: '400',
    flex: 1,
    fontStyle: 'italic',
  },
  content: {
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  reasoningText: {
    ...Typography.micro,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});
