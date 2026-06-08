import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { AppStackParamList } from "../../Navigation/AppStack";
import { useGetDebtQuery } from "../../Store/api/debtApi";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Shared/Styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import DebtInfo from "../../Widgets/DebtInfo/DebtInfo";
import { getApiErrorMessage } from "../../Shared/Api/getApiErrorMessage";
import BackButton from "../../Widgets/BackButton/BackButton";

type DebtScreenProps = NativeStackScreenProps<AppStackParamList, "Debt">;

const DebtOverview = ({ route }: DebtScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { debtId } = route.params;
  const { data, isLoading, error } = useGetDebtQuery(debtId!, {
    skip: !debtId,
  });

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.btnsContainer}>
        <BackButton onPress={handleBack} />
        <Pressable style={styles.editBtn} onPress={() => {}}>
          <Text style={styles.editBtnText}>Edit</Text>
        </Pressable>
      </View>
      {isLoading && (
        <View style={styles.content}>
          <Text style={styles.editBtnText}>Loading debt...</Text>
        </View>
      )}
      {error && !isLoading && (
        <View style={styles.content}>
          <Text style={styles.errorText}>{getApiErrorMessage(error)}</Text>
        </View>
      )}
      {data && !isLoading && !error && (
        <View style={styles.content}>
          <DebtInfo debt={data} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
  },
  editBtn: {
    color: Colors.pink,
    borderColor: Colors.pink,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  editBtnText: {
    color: Colors.pink,
    fontSize: 16,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});

export default DebtOverview;
