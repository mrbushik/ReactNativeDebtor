import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../Shared/Styles/Colors";

export const LocationCheckingScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.pink} />
        <Text style={styles.text}>Checking your location...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  text: {
    marginTop: 16,
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
  },
});
