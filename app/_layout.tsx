import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./Onboarding";
import Profile from "./Profile";
import Splash from "./Splash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  // const isAuthed = false;
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    // load auth
    AsyncStorage.getItem("isOnboardingComplete", (strValue) => {}).then(
      (strValue) => {
        console.log("then " + strValue);
        if (strValue == null) {
          setIsOnboardingComplete(false);
        } else {
          const b = JSON.parse(strValue);
          setIsOnboardingComplete(b);
        }
      }
    );
  }, []);

  const onNextPressed = () => {
    console.log("handling next on layout");
    AsyncStorage.setItem("isOnboardingComplete", true.toString()).then(() => {
      setIsOnboardingComplete(true);
    });
  };

  if (isOnboardingComplete == null) {
    return <Splash />;
  }

  return (
    <GestureHandlerRootView>
      <Stack.Navigator>
        {isOnboardingComplete ? (
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => <Onboarding onNextPressed={onNextPressed} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
