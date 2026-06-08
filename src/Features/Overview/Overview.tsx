import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector, useGetOverviewQuery } from "../../Store";
import { getApiErrorMessage } from "../../Shared/Api/getApiErrorMessage";
import { Colors } from "../../Shared/Styles/Colors";
import DebtCard from "../../Widgets/DebtCard/DebtCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Overview = () => {
  const userId = useAppSelector((state) => state.auth.user?._id);
  const { data, isLoading, error } = useGetOverviewQuery(userId!, {
    skip: !userId,
  });
  const activeDebts = data?.activeDebts ?? [];

  if (isLoading) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.text}>Loading overview...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={styles.errorText}>{getApiErrorMessage(error)}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.root}>
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.text}>Total: {data?.total ?? 0}</Text>
        <Text style={styles.text}>Debt amount: {data?.debtAmount ?? 0}</Text>
        <Text style={styles.text}>
          Deposit amount: {data?.depositAmount ?? 0}
        </Text>
        <Text style={styles.text}>Active debts: {activeDebts.length}</Text>
      </View>
      <View style={styles.debtCardContainer}>
        <FlatList
          data={activeDebts}
          renderItem={({ item }) => <DebtCard debt={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: -16,
  },
  root: {
    marginLeft: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    color: Colors.pink,
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
  },
  debtCardContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 16,
    alignItems: "center",
  },
});

export default Overview;
