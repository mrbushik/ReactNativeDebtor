import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Colors } from "../../../Shared/Styles/Colors";
import { getApiErrorMessage } from "../../../Shared/Api/getApiErrorMessage";
import {
  addDebtFormDefaultValues,
  addDebtSchema,
  AddDebtFormValues,
} from "../model";
import { DateField } from "./DateField";
import { FormInput } from "./FormInput";
import { FormSwitch } from "./FormSwitch";
import {
  selectCurrentUser,
  useAddDebtMutation,
  useAppSelector,
} from "../../../Store";

export const AddDebtForm = () => {
  const {
    control,
    clearErrors,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddDebtFormValues>({
    resolver: zodResolver(addDebtSchema),
    defaultValues: addDebtFormDefaultValues,
  });
  const withoutDetails = useWatch({ control, name: "withoutDetails" });
  const currentUser = useAppSelector(selectCurrentUser);
  const [addDebt, { error, isLoading }] = useAddDebtMutation();
  const handleWithoutDetailsChange = (enabled: boolean) => {
    if (!enabled) {
      return;
    }

    setValue("debtDate", "");
    setValue("dueDate", "");
    clearErrors(["debtDate", "dueDate"]);
  };

  const onSubmit = async (values: AddDebtFormValues) => {
    if (!currentUser?._id) {
      return;
    }

    try {
      await addDebt({
        ...values,
        lenderId: currentUser._id,
        debtAmount: Number(values.debtAmount),
        refundAmount: Number(values.refundAmount),
        dueDate: values.dueDate || null,
      }).unwrap();
      reset();
    } catch {
      // The mutation exposes the request error below the form.
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add debt</Text>

          <FormInput
            control={control}
            name="debtorName"
            label="Debtor name"
            placeholder="John Smith"
            error={errors.debtorName?.message}
          />
          <FormInput
            control={control}
            name="debtorInfo"
            label="Debt information"
            placeholder="Debt notes..."
            multiline
            error={errors.debtorInfo?.message}
          />
          <FormInput
            control={control}
            name="debtAmount"
            label="Debt amount"
            placeholder="1000"
            keyboardType="decimal-pad"
            error={errors.debtAmount?.message}
          />
          <FormInput
            control={control}
            name="refundAmount"
            label="Refund amount"
            placeholder="0"
            keyboardType="decimal-pad"
            error={errors.refundAmount?.message}
          />

          <FormSwitch
            control={control}
            name="withoutDetails"
            label="Without details"
            hint="Hide dates and additional debtor information"
            onValueChange={handleWithoutDetailsChange}
          />

          {!withoutDetails && (
            <>
              <DateField
                control={control}
                name="debtDate"
                label="Debt date"
                error={errors.debtDate?.message}
              />
              <DateField
                control={control}
                name="dueDate"
                label="Due date"
                error={errors.dueDate?.message}
              />
            </>
          )}

          <FormSwitch
            control={control}
            name="isReturned"
            label="Has debt already been paid?"
            hint="Don't add debt to the current debt list, but keep it in history"
          />

          {error && (
            <Text style={styles.errorText}>{getApiErrorMessage(error)}</Text>
          )}

          <Pressable
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !currentUser?._id}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Creating..." : "Create debt"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  title: {
    marginBottom: 24,
    color: Colors.white,
    fontSize: 28,
    fontWeight: "700",
  },
  submitButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 6,
    backgroundColor: Colors.pink,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  errorText: {
    marginBottom: 12,
    color: Colors.error,
  },
});
