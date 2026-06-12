import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../Shared/Styles/Colors";
import { Controller, useForm } from "react-hook-form";
import { LoginFormShema, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../Shared/Api/getApiErrorMessage";
import { useLoginMutation } from "../../Store";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormShema>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormShema) => {
    try {
      await login(data).unwrap();
    } catch {
      // Error state is already exposed by the mutation result.
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <View>
          <Text style={styles.title}>Login Form</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        </View>
        {error && (
          <Text style={styles.errorText}>{getApiErrorMessage(error)}</Text>
        )}
        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.btn, isLoading && styles.btnDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.btnText}>
              {isLoading ? "Signing in..." : "Login"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            {"Don't have an account? "}
            <Text style={styles.registerBtn}>Register now</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  inputContainer: {
    // marginTop: 20,
    width: "100%",
  },
  inputLabels: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    minWidth: 250,
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    color: Colors.white,
  },
  btn: {
    width: "100%",
    backgroundColor: "#ae7aff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    textAlign: "center",
    minWidth: 250,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    color: Colors.white,
  },
  registerBtn: {
    color: Colors.pink,
  },
  errorText: {
    marginTop: 5,
    color: Colors.error,
    maxWidth: 220,
  },
});
export default LoginForm;
