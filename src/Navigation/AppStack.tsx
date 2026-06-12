import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../Screens/Main/Main";
import Debt from "../Screens/Debt/Debt";
import History from "../Screens/History/History";
import AppMenu from "../Features/AppMenu/AppMenu";
import { Colors } from "../Shared/Styles/Colors";
import AddDebt from "../Screens/AddDebt/AddDebt";

export type AppStackParamList = {
  Main: undefined;
  Debt: { debtId: string };
  History: undefined;
  AddDebt: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
        headerTintColor: Colors.white,
        headerTitleStyle: {
          color: Colors.white,
          fontSize: 20,
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: "Your Debtor",
          headerLeft: () => <AppMenu />,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerTitle: "Your Debtor",
          headerLeft: () => <AppMenu />,
        }}
      />
      <Stack.Screen
        name="AddDebt"
        component={AddDebt}
        options={{
          headerTitle: "Your Debtor",
          headerLeft: () => <AppMenu />,
        }}
      />
      <Stack.Screen
        name="Debt"
        component={Debt}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
