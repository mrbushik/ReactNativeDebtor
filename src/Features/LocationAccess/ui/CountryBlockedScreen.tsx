import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../Shared/Styles/Colors";
import type { LocationAccessStatus } from "../model/types";

type BlockedStatus = Exclude<LocationAccessStatus, "checking" | "allowed">;

export type CountryBlockedScreenProps = {
  status: BlockedStatus;
  onRetry: () => void;
  shouldOpenSettings?: boolean;
};

const contentByStatus: Record<
  BlockedStatus,
  { title: string; description: string }
> = {
  permissionDenied: {
    title: "Location access required",
    description:
      "Allow location access to confirm that you are currently in Georgia.",
  },
  locationDisabled: {
    title: "Location is disabled",
    description:
      "Turn on location services in your device settings and try again.",
  },
  outsideGeorgia: {
    title: "Service unavailable",
    description: "This application is currently available only within Georgia.",
  },
  error: {
    title: "Location check failed",
    description:
      "We could not determine your location. Check your connection and try again.",
  },
};

export const CountryBlockedScreen = ({
  status,
  onRetry,
  shouldOpenSettings = false,
}: CountryBlockedScreenProps) => {
  const content = contentByStatus[status];
  const buttonText =
    status === "permissionDenied" && shouldOpenSettings
      ? "Open settings"
      : "Try again";

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.description}>{content.description}</Text>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
          onPress={onRetry}
        >
          <Text style={styles.retryButtonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    maxWidth: 360,
    marginTop: 12,
    color: Colors.grey,
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  retryButton: {
    minWidth: 160,
    marginTop: 28,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 6,
    backgroundColor: Colors.pink,
  },
  retryButtonPressed: {
    opacity: 0.75,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
