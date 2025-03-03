import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { GradientBackground } from "./../../components/BackgroundGradient";
import { colors } from "./../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={colors.text.light}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor={colors.text.light}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.text.secondary} />
                  ) : (
                    <Eye size={20} color={colors.text.secondary} />
                  )}
                </Pressable>
              </View>
            </View>


            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Verify")}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text style={styles.resetPassword}>Reset Password</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account ?</Text>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing you agree with Fast Logistics{" "}
                <Text style={styles.link}>terms of agreement</Text> and{" "}
                <Text style={styles.link}>privacy policy</Text>
              </Text>
            </View>
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
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 16,
    color: "lightgrey",
    opacity: 0.8,
  },
  form: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  eyeIcon: {
    padding: 12,
  },
  resetPassword: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
    marginBottom: 20,
    marginTop: 15,
  },
  registerText: {
    color: colors.text.secondary,
  },
  registerButton: {
    margin: "auto",
    backgroundColor: "#E4E4E4",
    width: "90%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 80,
  },
  registerButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",
  },
  termsContainer: {
    paddingHorizontal: 20,
  },
  termsText: {
    textAlign: "center",
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default Login;
