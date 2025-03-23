

"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface DeliveryDetails {
  senderAddress: string
  receiverAddress: string
  senderName: string
  senderPhone: string
  receiverName: string
  receiverPhone: string
  parcelName: string
  parcelCategory: string
  parcelValue: string
  description: string
  payer: string
  paymentMethod: string
  payOnDelivery: boolean
  amount: number
  delivery: number
  scheduleDateTime: string
}

interface OrderContextType {
  deliveryDetails: DeliveryDetails
  updateDeliveryDetails: (details: Partial<DeliveryDetails>) => void
}

const defaultDeliveryDetails: DeliveryDetails = {
  senderAddress: "",
  receiverAddress: "",
  senderName: "",
  senderPhone: "",
  receiverName: "",
  receiverPhone: "",
  parcelName: "",
  parcelCategory: "",
  parcelValue: "",
  description: "",
  payer: "",
  paymentMethod: "",
  payOnDelivery: false,
  amount: 0,
  delivery: 0,
  scheduleDateTime: "",
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>(defaultDeliveryDetails)

  const updateDeliveryDetails = (details: Partial<DeliveryDetails>) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      ...details,
    }))
  }

  return <OrderContext.Provider value={{ deliveryDetails, updateDeliveryDetails }}>{children}</OrderContext.Provider>
}

