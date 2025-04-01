
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from './../../components/BackgroundGradient';
import { colors } from './../../constants/colors';

// Validation schema
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .required('Full name is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number is too short')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUp = () => {
  const navigation = useNavigation();
  const scrollViewRef = React.useRef(null);

  const handleSignUp = (values) => {
    Keyboard.dismiss();
    console.log('SignUp form data:', values);
    // If validation passes, navigate to Verify
    navigation.navigate('Verify');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Create an account with your details</Text>

            <Formik
              initialValues={{ fullName: '', phone: '', email: '', password: '' }}
              validationSchema={SignUpSchema}
              onSubmit={handleSignUp}
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
                  <View style={styles.header}>
                    <Text style={styles.headerText}>Got an account?</Text>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Login')}
                      style={styles.loginButton}
                    >
                      <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.fullName && errors.fullName && styles.inputError,
                      ]}
                      placeholder="Enter full name"
                      placeholderTextColor={colors.text.light}
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      autoCapitalize="words"
                    />
                    {touched.fullName && errors.fullName && (
                      <Text style={styles.errorText}>{errors.fullName}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.phone && errors.phone && styles.inputError,
                      ]}
                      placeholder="Enter phone number"
                      placeholderTextColor={colors.text.light}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      keyboardType="phone-pad"
                    />
                    {touched.phone && errors.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.email && errors.email && styles.inputError,
                      ]}
                      placeholder="Enter email address"
                      placeholderTextColor={colors.text.light}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      style={[
                        styles.input,
                        touched.password && errors.password && styles.inputError,
                      ]}
                      placeholder="Enter password"
                      placeholderTextColor={colors.text.light}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Create an Account</Text>
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    By continuing you agree with Fast Logistics{' '}
                    <Text style={styles.link}>terms of agreement</Text> and{' '}
                    <Text style={styles.link}>privacy policy</Text>
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'grey',
    marginRight: 4,
  },
  loginButton: {
    backgroundColor: colors.grey,
    padding: 12,
    borderRadius: 50,
    width: 80,
  },
  loginLink: {
    color: colors.black,
    fontWeight: '600',
    textDecorationLine: 'none',
    textAlign: 'center',
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