import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/screens/HomePage";
import DetailPage from "./src/screens/DetailPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailPage"
          component={DetailPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
