import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Control, Controller } from "react-hook-form";
import { Colors } from "../../../Shared/Styles/Colors";
import { formatDate, parseDate } from "../lib/date";
import type { AddDebtFormValues } from "../model";

type DateFieldProps = {
  control: Control<AddDebtFormValues>;
  name: "debtDate" | "dueDate";
  label: string;
  error?: string;
};

export const DateField = ({ control, name, label, error }: DateFieldProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pendingDate, setPendingDate] = useState(new Date());

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const selectedDate = value ? parseDate(value) : new Date();

          const openPicker = () => {
            setPendingDate(selectedDate);
            setIsPickerVisible(true);
          };

          const handleDateChange = (
            event: DateTimePickerEvent,
            date?: Date,
          ) => {
            if (Platform.OS === "android") {
              setIsPickerVisible(false);

              if (event.type === "set" && date) {
                onChange(formatDate(date));
              }
            } else if (date) {
              setPendingDate(date);
            }
          };

          return (
            <>
              <Pressable style={styles.dateButton} onPress={openPicker}>
                <Text
                  style={[
                    styles.dateButtonText,
                    !value && styles.datePlaceholder,
                  ]}
                >
                  {value || "Select date"}
                </Text>
              </Pressable>

              {isPickerVisible && Platform.OS === "android" && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Modal
                visible={isPickerVisible && Platform.OS === "ios"}
                transparent
                animationType="fade"
                onRequestClose={() => setIsPickerVisible(false)}
              >
                <View style={styles.modalBackdrop}>
                  <View style={styles.calendarModal}>
                    <DateTimePicker
                      value={pendingDate}
                      mode="date"
                      display="inline"
                      onChange={handleDateChange}
                    />
                    <View style={styles.modalActions}>
                      <Pressable
                        style={styles.modalButton}
                        onPress={() => setIsPickerVisible(false)}
                      >
                        <Text style={styles.modalCancelText}>Cancel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.modalButton, styles.modalConfirmButton]}
                        onPress={() => {
                          onChange(formatDate(pendingDate));
                          setIsPickerVisible(false);
                        }}
                      >
                        <Text style={styles.modalConfirmText}>Select</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          );
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

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
  dateButton: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 6,
  },
  dateButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  datePlaceholder: {
    color: Colors.grey,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  calendarModal: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  modalConfirmButton: {
    backgroundColor: Colors.pink,
  },
  modalCancelText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  modalConfirmText: {
    color: Colors.white,
    fontWeight: "600",
  },
  errorText: {
    marginTop: 6,
    color: Colors.error,
  },
});
