
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Navigation } from "./src/navigation"
import { OrderProvider } from "./src/contexts/OrderContext"

export default function App() {
  return (
    <SafeAreaProvider>
      <OrderProvider>
        <Navigation />
      </OrderProvider>
    </SafeAreaProvider>
  )
}

