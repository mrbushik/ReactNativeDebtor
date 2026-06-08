import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../Shared/Styles/Colors";

type BackButtonProps = {
  onPress: () => void;
  label?: string;
};

const BackButton = ({ onPress, label = "Back" }: BackButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>←</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BackButton;
