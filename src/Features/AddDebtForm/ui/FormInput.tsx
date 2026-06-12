import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Control, Controller } from "react-hook-form";
import { Colors } from "../../../Shared/Styles/Colors";
import type { AddDebtFormValues } from "../model";

type FormInputProps = {
  control: Control<AddDebtFormValues>;
  name: "debtorName" | "debtorInfo" | "debtAmount" | "refundAmount";
  label: string;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: "default" | "decimal-pad";
};

export const FormInput = ({
  control,
  name,
  label,
  placeholder,
  error,
  multiline,
  keyboardType = "default",
}: FormInputProps) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.grey}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 8,
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 6,
    color: Colors.white,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
  },
  errorText: {
    marginTop: 6,
    color: Colors.error,
  },
});
