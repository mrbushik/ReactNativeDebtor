import { View, Pressable, Text } from "react-native";
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
      </View>

      <Pressable onPress={() => dispatch(logout())}>
        <Text style={styles.logoutBtn}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  menuItemContainer: {
    marginTop: 40,
    marginLeft: 20,
  },
  itemText: {
    fontSize: 18,
  },
  logoutBtn: {
    fontSize: 18,
    marginLeft: 20,
    color: Colors.error,
  },
};
export default CustomDrawerContent;
