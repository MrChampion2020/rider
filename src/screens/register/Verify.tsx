
// "use client"

// import { useState, useEffect } from "react"
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { GradientBackground } from "./../../components/BackgroundGradient"
// import { CodeInput } from "./../../components/CodeInput"
// import { Button } from "./../../components/Button"
// import { colors } from "./../../constants/colors"
// import { useAuth } from "../../contexts/AuthContext"

// const Verify = () => {
//   const [timeLeft, setTimeLeft] = useState(59)
//   const navigation = useNavigation()
//   const { login } = useAuth()

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
//       return () => clearTimeout(timer)
//     }
//   }, [timeLeft])

//   const handleCodeComplete = (code: string) => {
//     console.log("Code entered:", code)
//     // We will Handle verification logic here
//   }

//   const handleProceed = async () => {
//     // Login the user
//     await login()
//     // Navigate to the main app
//     navigation.navigate("User")
//   }

//   return (
//     <GradientBackground>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.content}>
//           <Text style={styles.title}>Verify</Text>
//           <Text style={styles.subtitle}>Verify your phone number by entering the 5 - digit code</Text>

//           <View style={styles.form}>
//             <View style={styles.headerRow}>
//               <Text style={styles.enterCodeText}>Enter Code</Text>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text style={styles.goBackText}>Go back</Text>
//               </TouchableOpacity>
//             </View>

//             <CodeInput length={5} onCodeComplete={handleCodeComplete} allowBackspace={true} />

//             <Button title="Proceed" onPress={handleProceed} />

//             <Text style={styles.timerText}>
//               Code will be resent in{" "}
//               <Text style={styles.timer}>
//                 {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
//               </Text>{" "}
//               sec
//             </Text>
//           </View>
//         </View>
//       </SafeAreaView>
//     </GradientBackground>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//     marginTop: 60,
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: "bold",
//     color: colors.secondary,
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: colors.lightgrey,
//     opacity: 0.8,
//     marginBottom: 20,
//   },
//   form: {
//     backgroundColor: colors.secondary,
//     borderRadius: 20,
//     padding: 20,
//     height: "80%",
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   enterCodeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: colors.text.primary,
//   },

//   goBack: {
//     alignSelf: "flex-end",
//   },
//   goBackText: {
//     color: colors.primary,
//     textDecorationLine: "underline",
//   },
//   timerText: {
//     textAlign: "center",
//     color: colors.text.secondary,
//   },
//   timer: {
//     color: colors.primary,
//   },
// })

// export default Verify




"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { GradientBackground } from "./../../components/BackgroundGradient"
import { CodeInput } from "./../../components/CodeInput"
import { colors } from "./../../constants/colors"
import { useAuth } from "../../contexts/AuthContext"

const Verify = () => {
  const [timeLeft, setTimeLeft] = useState(59)
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const navigation = useNavigation()
  const { login } = useAuth()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleCodeComplete = (code: string) => {
    console.log("Code entered:", code)
    setVerificationCode(code)
    setError("") // Clear any previous errors
  }

  const handleProceed = async () => {
    // Validate the verification code
    if (!verificationCode || verificationCode.length < 5) {
      setError("Please enter the complete verification code")
      return
    }

    console.log("Verification submitted with code:", verificationCode)
    
    // Login the user
    await login()
    // Navigate to the main app
    navigation.navigate("User")
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Verify</Text>
          <Text style={styles.subtitle}>Verify your phone number by entering the 5 - digit code</Text>

          <View style={styles.form}>
            <View style={styles.headerRow}>
              <Text style={styles.enterCodeText}>Enter Code</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Go back</Text>
              </TouchableOpacity>
            </View>

            <CodeInput 
              length={5} 
              onCodeComplete={handleCodeComplete} 
              allowBackspace={true} 
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleProceed}
            >
              <Text style={styles.submitButtonText}>Proceed</Text>
            </TouchableOpacity>

            <Text style={styles.timerText}>
              Code will be resent in{" "}
              <Text style={styles.timer}>
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
              </Text>{" "}
              sec
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}

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
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightgrey,
    opacity: 0.8,
    marginBottom: 20,
  },
  form: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
    height: "80%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  enterCodeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  goBackText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  timerText: {
    textAlign: "center",
    color: colors.text.secondary,
  },
  timer: {
    color: colors.primary,
  },
})

export default Verify