import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface StatusBadgeProps {
  status: 'In Transit' | 'Delivered' | 'Cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'In Transit':
        return colors.status.info;
      case 'Delivered':
        return colors.status.success;
      case 'Cancelled':
        return colors.status.error;
      default:
        return colors.status.warning;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});



