import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { theme } from '../constants/theme';
import { icons } from '../constants/icons';

interface DeliverySummaryProps {
  isExpanded: boolean;
  onToggle: () => void;
  details: Array<{
    label: string;
    value: string;
  }>;
}

export function DeliverySummary({ isExpanded, onToggle, details }: DeliverySummaryProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onToggle}
      >
        <Text style={styles.title}>Delivery Summary</Text>
        <Icon 
          name={isExpanded ? icons.chevronUp : icons.chevronDown} 
          size={24} 
          color={colors.text.primary} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.addressSection}>
            <View style={styles.addressItem}>
              <Text style={styles.addressLabel}>Sender Address</Text>
              <View style={styles.addressRow}>
                <Icon name={icons.location} size={20} color={colors.secondary} />
                <Text style={styles.addressText}>
                  No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo
                </Text>
              </View>
            </View>

            <View style={styles.addressItem}>
              <Text style={styles.addressLabel}>Receiver Address</Text>
              <View style={styles.addressRow}>
                <Icon name={icons.location} size={20} color={colors.status.error} />
                <Text style={styles.addressText}>
                  No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            {details.map((detail, index) => (
              <View key={index} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  addressSection: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  addressItem: {
    gap: theme.spacing.xs,
  },
  addressLabel: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.secondary,
    marginLeft: 28, // To align with the address text
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  addressText: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    lineHeight: 20,
  },
  detailsSection: {
    gap: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
});