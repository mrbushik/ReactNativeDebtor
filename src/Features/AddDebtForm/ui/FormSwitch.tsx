import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import { Colors } from "../../../Shared/Styles/Colors";
import type { AddDebtFormValues } from "../model";

type FormSwitchProps = {
  control: Control<AddDebtFormValues>;
  name: "withoutDetails" | "isReturned";
  label: string;
  hint: string;
  onValueChange?: (value: boolean) => void;
};

export const FormSwitch = ({
  control,
  name,
  label,
  hint,
  onValueChange,
}: FormSwitchProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.hint}>{hint}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={(enabled) => {
            onChange(enabled);
            onValueChange?.(enabled);
          }}
          trackColor={{ false: Colors.grey, true: Colors.pink }}
        />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  text: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    marginBottom: 8,
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: Colors.grey,
    lineHeight: 20,
  },
});
