import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
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

  const handleLogout = () => {
    AsyncStorage.clear().then(() => {
      AsyncStorage.setItem("isOnboardingComplete", "false").then(() => {
        setIsOnboardingComplete(false);
      });
    });
  };

  if (isOnboardingComplete == null) {
    return <Splash />;
  }

  return (
    <GestureHandlerRootView>
      <Stack.Navigator>
        {isOnboardingComplete ? (
          <Stack.Screen name="Profile" options={{ headerShown: false }}>
            {(props) => <Profile {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => <Onboarding onNextPressed={onNextPressed} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
