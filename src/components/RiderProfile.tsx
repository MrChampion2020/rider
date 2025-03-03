
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ImageStyle,

} from 'react-native';
import { colors } from '../constants/colors';
import { theme } from '../constants/theme';
import { icons } from '../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import imageSource from '../assets/images/pp.png';



interface RiderProfileProps {
  name: string;
  rating: number;
  onChat?: () => void;
  onCall?: () => void;
}

export function RiderProfile({ 
  name, 
  rating,
  onChat,
  onCall,
}: RiderProfileProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image
           source={imageSource}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(rating)].map((_, index) => (
            
                <Icon
                key={index}
                name={icons.star}
                size={16}
                color={colors.primary}
              />
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onChat}
            accessibilityLabel="Chat with rider"
          >
             <Icon name={icons.chat} size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onCall}
            accessibilityLabel="Call rider"
          >
            <Image
              source={icons.phone}
              style={styles.actionIcon as ImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    overflow: 'hidden',
 
    ...Platform.select({
      ios: {
        shadowColor: colors.white
       
      },
      android: {
        elevation: 0,
      },
    }),
  },
  content: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileInfo: {
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: theme.fontSizes.md,
    fontWeight: Platform.select({ ios: '600', android: '700' }),
    color: colors.text.primary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  vehicleIcon: {
    width: 20,
    height: 20,
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto-Regular' }),
  },
});
