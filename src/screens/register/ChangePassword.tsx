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
import { CodeInput } from './../../components/CodeInput';
import { Button } from './../../components/Button';
import { colors } from './../../constants/colors';

type Step = 'email' | 'code' | 'password';

const ChangePassword = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(59);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  React.useEffect(() => {
    if (timeLeft > 0 && currentStep === 'code') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentStep]);

  const handleCodeComplete = (code: string) => {
    console.log('Code entered:', code);
    setCurrentStep('password');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <Text style={styles.subtitle}>Input email address</Text>
            <View style={styles.form}>
              <TouchableOpacity 
                style={styles.goBack}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>

              <FormInput
                label="Enter Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
              />

              <Button 
                title="Proceed" 
                onPress={() => setCurrentStep('code')}
              />
            </View>
          </>
        );

      case 'code':
        return (
          <>
            <Text style={styles.subtitle}>
              Input the code sent to your registered email
            </Text>
            <View style={styles.form}>
              <TouchableOpacity 
                style={styles.goBack}
                onPress={() => setCurrentStep('email')}
              >
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>

              <CodeInput length={5} onCodeComplete={handleCodeComplete} />

              <Button 
                title="Proceed" 
                onPress={() => setCurrentStep('password')}
              />

              <Text style={styles.timerText}>
                Code will be resent in{' '}
                <Text style={styles.timer}>
                  {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                  {String(timeLeft % 60).padStart(2, '0')}
                </Text>{' '}
                sec
              </Text>
            </View>
          </>
        );

      case 'password':
        return (
          <>
            <Text style={styles.subtitle}>Reset your password</Text>
            <View style={styles.form}>
              <TouchableOpacity 
                style={styles.goBack}
                onPress={() => setCurrentStep('code')}
              >
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>

              <PasswordInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
              />

              <PasswordInput
                label="Re-enter Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter new password"
              />

              <Button 
                title="Proceed" 
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </>
        );
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Change Password</Text>
          {renderStep()}
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
    marginTop: 60
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.secondary,
    marginBottom: 20,
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
    height: '80%'
  },
  goBack: {
    alignSelf: 'flex-end',
  },
  goBackText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  timerText: {
    textAlign: 'center',
    color: colors.text.secondary,
  },
  timer: {
    color: colors.primary,
  },
});

export default ChangePassword;