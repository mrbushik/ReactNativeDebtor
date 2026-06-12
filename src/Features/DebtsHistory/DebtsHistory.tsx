import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useAppSelector } from "../../Store";
import { useGetHistoryQuery } from "../../Store/api/historyApi";
import DebtCard from "../../Widgets/DebtCard/DebtCard";
import { Colors } from "../../Shared/Styles/Colors";
const DebtsHistory = () => {
  const [order, setOrder] = useState<"asc" | "dest">();
  const [sortBy, setSortBy] = useState<string>("");
  const userData = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useGetHistoryQuery(
    {
      userId: userData?._id!,
      sortBy,
      order,
    },
    {
      skip: !userData?._id,
    },
  );

  const handleSort = (sortBy: string) => {
    if (sortBy === "dest") {
      setOrder("dest");
    } else {
      setOrder("asc");
    }
    setSortBy("refundAmount");
  };

  const handleReset = () => {
    setOrder(undefined);
    setSortBy("");
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Debts History</Text>
        <View style={styles.btnContainer}>
          <Pressable
            style={!order ? [styles.btn, styles.selectedBtn] : styles.btn}
            onPress={handleReset}
          >
            <Text
              style={
                !order
                  ? [styles.btnText, styles.selectedBtnText]
                  : styles.btnText
              }
            >
              Without
            </Text>
          </Pressable>
          <Pressable
            style={
              order === "asc" ? [styles.btn, styles.selectedBtn] : styles.btn
            }
            onPress={() => handleSort("asc")}
          >
            <Text
              style={
                order === "asc"
                  ? [styles.btnText, styles.selectedBtnText]
                  : styles.btnText
              }
            >
              Increasing
            </Text>
          </Pressable>
          <Pressable
            style={
              order === "dest" ? [styles.btn, styles.selectedBtn] : styles.btn
            }
            onPress={() => handleSort("dest")}
          >
            <Text
              style={
                order === "dest"
                  ? [styles.btnText, styles.selectedBtnText]
                  : styles.btnText
              }
            >
              Decreasing
            </Text>
          </Pressable>
        </View>
      </View>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {data?.length ? (
        <View style={styles.content}>
          <FlatList
            data={data}
            renderItem={({ item }) => <DebtCard debt={item} />}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.loadingText}>No debts yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginLeft: 16,
    marginTop: -20,
    marginBottom: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
  },
  loadingText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    color: Colors.pink,
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  btn: {
    width: 100,
    backgroundColor: Colors.white,
    padding: 7,
    borderRadius: 5,
  },
  btnText: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 16,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  selectedBtn: {
    backgroundColor: Colors.pink,
    padding: 7,
    borderRadius: 5,
  },
  selectedBtnText: {
    color: Colors.white,
    fontSize: 16,
  },
});
export default DebtsHistory;
