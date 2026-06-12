import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import type { AppStackParamList } from "../../Navigation/AppStack";
import Overview from "../../Features/Overview/Overview";

type MainScreenProps = NativeStackScreenProps<AppStackParamList, "Main">;

const Main = ({ navigation }: MainScreenProps) => {
  return (
    <View style={styles.root}>
      <Overview />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Main;
