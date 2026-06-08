import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Debt } from "../../Shared/Types/Debt";
import { getDebtStatusText } from "../../entities/DebtStatusText/DebtStatusText";
import {
  getDebtAnnualPercentageText,
  getDebtRevenueText,
} from "../../entities/DebtMetrics/DebtMetrics";
import { Colors } from "../../Shared/Styles/Colors";

const DebtInfo: React.FC<Record<"debt", Debt>> = ({ debt }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Debtor: {debt.debtorName}</Text>
      <Text style={styles.debtText}>
        The amount borrowed:{" "}
        <Text style={styles.debtAmountText}>{debt.debtAmount}</Text>
      </Text>
      <Text style={styles.debtText}>
        To be refunded:{" "}
        <Text style={styles.debtAmountText}>{debt.refundAmount}</Text>
      </Text>
      <Text style={styles.debtText}>
        Revenue:{" "}
        <Text style={styles.debtAmountText}>{getDebtRevenueText(debt)}</Text>
      </Text>
      {debt.withoutDetails ? (
        <Text style={styles.debtAmountText}>Debt Without details</Text>
      ) : (
        <View>
          <Text style={styles.debtText}>
            Debt date:{" "}
            <Text style={styles.debtAmountText}>{debt?.debtDate || "N/A"}</Text>
          </Text>
          <Text style={styles.debtText}>
            Due date:{" "}
            <Text style={styles.debtAmountText}>{debt?.dueDate || "N/A"}</Text>
          </Text>
          <Text style={styles.debtText}>
            Initial percentage per annum:{" "}
            <Text style={styles.debtAmountText}>
              {getDebtAnnualPercentageText(debt)}
            </Text>
          </Text>
          <Text style={styles.debtText}>{getDebtStatusText(debt.dueDate)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    marginVertical: 16,
  },
  debtText: {
    marginVertical: 4,
    fontSize: 18,
    fontWeight: "500",
    color: Colors.white,
  },
  debtAmountText: {
    color: Colors.pink,
  },
});

export default DebtInfo;
