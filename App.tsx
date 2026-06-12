import React from "react";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthStack from "./src/Navigation/AuthStack";
import {
  AppProvider,
  hydrateAuth,
  selectIsAuthenticated,
  selectIsAuthHydrated,
  useAppDispatch,
  useAppSelector,
} from "./src/Store";
import { AppDrawer } from "./src/Widgets/AppDrawer/AppDrawer";
import {
  CountryBlockedScreen,
  LocationCheckingScreen,
  useLocationAccess,
} from "./src/Features/LocationAccess";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

function AppNavigator() {
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector(selectIsAuthHydrated);
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const { status, retryLocationAccess, shouldOpenSettings } =
    useLocationAccess();

  React.useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  if (!isHydrated) {
    return <ActivityIndicator />;
  }
  if (status === "checking") {
    return <LocationCheckingScreen />;
  }
  if (status !== "allowed") {
    return (
      <CountryBlockedScreen
        status={status}
        onRetry={retryLocationAccess}
        shouldOpenSettings={shouldOpenSettings}
      />
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {isLoggedIn ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={styles.container}
          resizeMode="cover"
        >
          <AppNavigator />
        </ImageBackground>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
