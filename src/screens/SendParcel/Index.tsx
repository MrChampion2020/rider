import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LocationSelect from "./LocationSelect"
import AddressSelect from "./AddressSelect"
import MapSelect from "./MapSelect"

export type SendParcelStackParamList = {
  LocationSelect: undefined
  AddressSelect: {
    type: "home" | "work"
    isReceiver?: boolean
  }
  MapSelect: undefined
}

const Stack = createNativeStackNavigator<SendParcelStackParamList>()

export default function SendParcelNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LocationSelect" component={LocationSelect} />
      <Stack.Screen name="AddressSelect" component={AddressSelect} />
      <Stack.Screen name="MapSelect" component={MapSelect} />
    </Stack.Navigator>
  )
}


