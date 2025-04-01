"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved authentication state on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await AsyncStorage.getItem("isAuthenticated")
        setIsAuthenticated(authStatus === "true")
      } catch (error) {
        console.error("Error checking auth status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async () => {
    try {
      await AsyncStorage.setItem("isAuthenticated", "true")
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.setItem("isAuthenticated", "false")
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (isLoading) {
    // You could return a loading screen here if needed
    return null
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

