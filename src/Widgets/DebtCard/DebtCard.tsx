import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import type { Debt } from "../../Shared/Types/Debt";
import { Colors } from "../../Shared/Styles/Colors";
import { getDebtStatusText } from "../../entities/DebtStatusText/DebtStatusText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../Navigation/AppStack";

type DebtCardProps = {
  debt: Debt;
};

const DebtCard = ({ debt }: DebtCardProps) => {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Main">>();

  const handleNavigate = () => {
    navigation.navigate("Debt", { debtId: debt._id });
  };

  return (
    <Pressable
      onPress={handleNavigate}
      style={[styles.root, { width: width * 0.9 }]}
    >
      <View>
        <Text style={styles.title}>{debt.debtorName}</Text>
        <Text style={styles.description}>
          Must be returned : {debt.refundAmount}
        </Text>
      </View>
      <View>
        <Text style={styles.debtStatus}>
          {getDebtStatusText(debt?.dueDate)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 8,
    backgroundColor: Colors.primary,
    color: Colors.white,
    marginVertical: 8,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
  },
  description: {
    fontSize: 16,
    color: Colors.grey,
  },
  debtStatus: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default DebtCard;
