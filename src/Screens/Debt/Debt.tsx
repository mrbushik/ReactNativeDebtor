import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../../Navigation/AppStack";
import DebtOverview from "../../Features/DebtOverview/DebtOverview";

type DebtScreenProps = NativeStackScreenProps<AppStackParamList, "Debt">;

const Debt = ({ navigation, route }: DebtScreenProps) => {
  return <DebtOverview navigation={navigation} route={route} />;
};

export default Debt;
