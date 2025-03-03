import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from './../../components/BackgroundGradient';
import { FormInput } from './../../components/FormInput';
import { PasswordInput } from './../../components/PasswordInput';
import { Button } from './../../components/Button';
import { colors } from './../../constants/colors';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Create an account with your details</Text>

          

          <View style={styles.form}>


          <View style={styles.header}>
            <Text style={styles.headerText}>Got an account ? <Text>Login Here </Text> </Text> 

            <TouchableOpacity onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>





            <FormInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              autoCapitalize="words"
            />

            <FormInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />

            <FormInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
            />

            <PasswordInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
            />

            <Button 
              title="Create an Account" 
              onPress={() => navigation.navigate('Verify')}
            />

            <Text style={styles.termsText}>
              By continuing you agree with Fast Logistics{' '}
              <Text style={styles.link}>terms of agreement</Text> and{' '}
              <Text style={styles.link}>privacy policy</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 60,
   
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.grey,
    marginBottom: 18,
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightgrey,
    opacity: 0.8,
    marginBottom: 20,
  },
  
  form: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 50
  },
  headerText: {
    color: 'grey',
    marginRight: 4,
  },
  loginButton: {
    backgroundColor: colors.grey,
    padding: 14,
    borderRadius: 50,
    width: 70
  },
  loginLink: {
    color: colors.black,
    fontWeight: '600',
    textDecorationLine: 'none',
    textAlign: 'center',
  },
  termsText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default SignUp;