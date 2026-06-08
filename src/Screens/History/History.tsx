import DebtsHistory from "../../Features/DebtsHistory/DebtsHistory";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../Navigation/AppStack";

type HistoryScreenProps = NativeStackScreenProps<AppStackParamList, "History">;
const History = ({ navigation }: HistoryScreenProps) => {
  return <DebtsHistory />;
};

export default History;
