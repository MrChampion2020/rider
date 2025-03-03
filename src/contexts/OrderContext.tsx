"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface Address {
  type: "sender" | "receiver"
  address: string
}

interface OrderDetails {
  senderAddress: string
  receiverAddress: string
  // We will Add other order details as needed
}

interface OrderContextType {
  orderDetails: OrderDetails
  updateAddress: (address: Address) => void
  //we will  Add other functions to update order details
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
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    senderAddress: "",
    receiverAddress: "",
    //we will  Initialize other order details
  })

  const updateAddress = (address: Address) => {
    setOrderDetails((prev) => ({
      ...prev,
      [address.type === "sender" ? "senderAddress" : "receiverAddress"]: address.address,
    }))
  }

  return <OrderContext.Provider value={{ orderDetails, updateAddress }}>{children}</OrderContext.Provider>
}

