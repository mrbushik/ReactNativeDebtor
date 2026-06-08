import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "../../Navigation/AppStack";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AppStack} />
      {/*<Drawer.Screen name="" component={ProfileScreen} />*/}
      {/*<Drawer.Screen name="Settings" component={SettingsScreen} />*/}
    </Drawer.Navigator>
  );
};
