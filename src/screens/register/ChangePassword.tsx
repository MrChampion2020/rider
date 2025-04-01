// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { GradientBackground } from './../../components/BackgroundGradient';
// import { FormInput } from './../../components/FormInput';
// import { PasswordInput } from './../../components/PasswordInput';
// import { CodeInput } from './../../components/CodeInput';
// import { Button } from './../../components/Button';
// import { colors } from './../../constants/colors';

// type Step = 'email' | 'code' | 'password';

// const ChangePassword = () => {
//   const [currentStep, setCurrentStep] = useState<Step>('email');
//   const [email, setEmail] = useState('');
//   const [timeLeft, setTimeLeft] = useState(59);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigation = useNavigation();

//   React.useEffect(() => {
//     if (timeLeft > 0 && currentStep === 'code') {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft, currentStep]);

//   const handleCodeComplete = (code: string) => {
//     console.log('Code entered:', code);
//     setCurrentStep('password');
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 'email':
//         return (
//           <>
//             <Text style={styles.subtitle}>Input email address</Text>
//             <View style={styles.form}>
//               <TouchableOpacity 
//                 style={styles.goBack}
//                 onPress={() => navigation.goBack()}
//               >
//                 <Text style={styles.goBackText}>Go back</Text>
//               </TouchableOpacity>

//               <FormInput
//                 label="Enter Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter email address"
//                 keyboardType="email-address"
//               />

//               <Button 
//                 title="Proceed" 
//                 onPress={() => setCurrentStep('code')}
//               />
//             </View>
//           </>
//         );

//       case 'code':
//         return (
//           <>
//             <Text style={styles.subtitle}>
//               Input the code sent to your registered email
//             </Text>
//             <View style={styles.form}>
//               <TouchableOpacity 
//                 style={styles.goBack}
//                 onPress={() => setCurrentStep('email')}
//               >
//                 <Text style={styles.goBackText}>Go back</Text>
//               </TouchableOpacity>

//               <CodeInput length={5} onCodeComplete={handleCodeComplete} />

//               <Button 
//                 title="Proceed" 
//                 onPress={() => setCurrentStep('password')}
//               />

//               <Text style={styles.timerText}>
//                 Code will be resent in{' '}
//                 <Text style={styles.timer}>
//                   {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
//                   {String(timeLeft % 60).padStart(2, '0')}
//                 </Text>{' '}
//                 sec
//               </Text>
//             </View>
//           </>
//         );

//       case 'password':
//         return (
//           <>
//             <Text style={styles.subtitle}>Reset your password</Text>
//             <View style={styles.form}>
//               <TouchableOpacity 
//                 style={styles.goBack}
//                 onPress={() => setCurrentStep('code')}
//               >
//                 <Text style={styles.goBackText}>Go back</Text>
//               </TouchableOpacity>

//               <PasswordInput
//                 label="New Password"
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 placeholder="Enter new password"
//               />

//               <PasswordInput
//                 label="Re-enter Password"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholder="Re-enter new password"
//               />

//               <Button 
//                 title="Proceed" 
//                 onPress={() => navigation.navigate('Login')}
//               />
//             </View>
//           </>
//         );
//     }
//   };

//   return (
//     <GradientBackground>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.content}>
//           <Text style={styles.title}>Change Password</Text>
//           {renderStep()}
//         </View>
//       </SafeAreaView>
//     </GradientBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//     marginTop: 60
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: '900',
//     color: colors.secondary,
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: colors.lightgrey,
//     opacity: 0.8,
//     marginBottom: 20,
//   },
//   form: {
//     backgroundColor: colors.secondary,
//     borderRadius: 20,
//     padding: 20,
//     height: '80%'
//   },
//   goBack: {
//     alignSelf: 'flex-end',
//   },
//   goBackText: {
//     color: colors.primary,
//     textDecorationLine: 'underline',
//   },
//   timerText: {
//     textAlign: 'center',
//     color: colors.text.secondary,
//   },
//   timer: {
//     color: colors.primary,
//   },
// });

// export default ChangePassword;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from './../../components/BackgroundGradient';
import { CodeInput } from './../../components/CodeInput';
import { colors } from './../../constants/colors';

type Step = 'email' | 'code' | 'password';

// Validation schemas
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ChangePassword = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [timeLeft, setTimeLeft] = useState(59);
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (timeLeft > 0 && currentStep === 'code') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentStep]);

  const handleCodeComplete = (code: string) => {
    console.log('Code entered:', code);
    setVerificationCode(code);
    // You can validate the code here if needed
  };

  const handleEmailSubmit = (values) => {
    console.log('Email submitted:', values);
    setCurrentStep('code');
  };

  const handlePasswordSubmit = (values) => {
    console.log('Password reset data:', {
      ...values,
      verificationCode,
    });
    navigation.navigate('Login');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <Text style={styles.subtitle}>Input email address</Text>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={EmailSchema}
              onSubmit={handleEmailSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.form}>
                  <TouchableOpacity 
                    style={styles.goBack}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.goBackText}>Go back</Text>
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.email && errors.email && styles.inputError,
                      ]}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="Enter email address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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

              <CodeInput 
                length={5} 
                onCodeComplete={handleCodeComplete} 
              />

              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={() => setCurrentStep('password')}
              >
                <Text style={styles.submitButtonText}>Proceed</Text>
              </TouchableOpacity>

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
            <Formik
              initialValues={{ newPassword: '', confirmPassword: '' }}
              validationSchema={PasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.form}>
                  <TouchableOpacity 
                    style={styles.goBack}
                    onPress={() => setCurrentStep('code')}
                  >
                    <Text style={styles.goBackText}>Go back</Text>
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.newPassword && errors.newPassword && styles.inputError,
                      ]}
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      placeholder="Enter new password"
                      secureTextEntry
                    />
                    {touched.newPassword && errors.newPassword && (
                      <Text style={styles.errorText}>{errors.newPassword}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Re-enter Password</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.confirmPassword && errors.confirmPassword && styles.inputError,
                      ]}
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      placeholder="Re-enter new password"
                      secureTextEntry
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}
                  </View>

                  <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
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