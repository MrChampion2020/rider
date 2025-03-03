import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from './../../components/BackgroundGradient';
import { colors } from './../../constants/colors';
import { theme } from './../../constants/theme';

const { width } = Dimensions.get('window');

const screens = [
  {
    id: 1,
    title: 'Deliver Parcels\nWith Ease',
    description: 'Fast lets you deliver your goods quickly and securely with our advanced tracking technology',
    image: require('../../assets/images/amico.png'),
  },
  {
    id: 2,
    title: 'Secure Payment\nHandling',
    description: 'With our in app wallet system, you can make your order pay on delivery and we will handle the transaction seamlessly.',
    image: require('../../assets/images/rafiki.png'),
  },
  {
    id: 3,
    title: 'Excellent\nSupport System',
    description: 'We are always available 24/7 to make sure we attend to your needs and give you the best customer service',
    image: require('../../assets/images/pana.png'),
  },
];

const Onboard = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentScreen < screens.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentScreen + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, [currentScreen]);

  const handleSkip = () => {
    navigation.navigate('Login');
  };
  

  const handleProceed = () => {
    if (currentScreen === screens.length - 1) {
      navigation.navigate('Login');
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentScreen + 1,
        animated: true,
      });
    }
  };

  const renderItem = ({ item }: { item: typeof screens[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={screens}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentScreen(newIndex);
          }}
          keyExtractor={(item) => item.id.toString()}
        />

        <View style={styles.pagination}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentScreen && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 200,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
    marginBottom: 150,
    opacity: 0.5,
  },
  paginationDotActive: {
    opacity: 1,
    width: 20,
    backgroundColor: colors.primary,
  },
  textContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 10,
    width: '100%',
    height: '35%',
    marginTop: 60,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 35,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  proceedText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Onboard;