import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Colors } from "../../Shared/Styles/Colors";

const AppMenu = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={styles.button}
    >
      <Text style={styles.btnText}>☰</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  btnText: {
    color: Colors.pink,
    fontSize: 24,
    fontWeight: "700",
  },
});

export default AppMenu;
