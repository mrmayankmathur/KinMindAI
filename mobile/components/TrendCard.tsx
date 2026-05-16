import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activity } from 'lucide-react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';

interface TrendCardProps {
  metric: string;
  value: string;
  status: 'normal' | 'warning';
}

export function TrendCard({ metric, value, status }: TrendCardProps) {
  const isWarning = status === 'warning';
  const statusColor = isWarning ? Colors.warning : Colors.success;
  const statusBg = isWarning ? Colors.warning + '15' : Colors.success + '15';

  return (
    <View style={[styles.card, isWarning && styles.cardWarning]}>
      <View style={styles.header}>
        <Text style={styles.metric}>{metric}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Activity size={14} color={statusColor} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {isWarning ? 'Warning' : 'Normal'}
          </Text>
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>~~ Chart Visualization ~~</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  cardWarning: {
    borderColor: Colors.warning,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  metric: {
    ...Typography.bodyPrimary,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    ...Typography.micro,
    fontWeight: 'bold',
  },
  value: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  chartPlaceholder: {
    height: 80,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
  },
  chartText: {
    ...Typography.micro,
    color: Colors.textSecondary,
  },
});
