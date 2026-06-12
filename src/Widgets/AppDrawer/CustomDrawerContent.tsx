import { View, Pressable, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../Shared/Styles/Colors";
import { logout, useAppDispatch } from "../../Store";

const CustomDrawerContent = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuItemContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("Home", {
              screen: "Main",
            })
          }
        >
          <Text style={styles.itemText}>Overview</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Home", {
              screen: "History",
            })
          }
        >
          <Text style={styles.itemText}>History</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Home", {
              screen: "AddDebt",
            })
          }
        >
          <Text style={styles.itemText}>Add Debt</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={() => dispatch(logout())}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  menuItemContainer: {
    marginTop: 40,
    marginLeft: 20,
    gap: 30,
  },
  itemText: {
    fontSize: 18,
  },
  logoutBtn: {
    fontSize: 18,
    marginLeft: 20,
    color: Colors.error,
  },
});
export default CustomDrawerContent;
