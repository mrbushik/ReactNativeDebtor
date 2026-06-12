import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import type { LocationAccessStatus } from "./types";
import { AppState, Linking } from "react-native";

const GEORGIA_COUNTRY_CODE = "GE";

export type LocationAccessResult = {
  status: LocationAccessStatus;
  checkLocationAccess: () => Promise<void>;
  retryLocationAccess: () => Promise<void>;
  shouldOpenSettings: boolean;
};

export const useLocationAccess = (): LocationAccessResult => {
  const [status, setStatus] = useState<LocationAccessStatus>("checking");
  const [shouldOpenSettings, setShouldOpenSettings] = useState(false);
  const isReturningFromSettings = useRef(false);

  const checkLocationAccess = useCallback(async () => {
    setStatus("checking");

    try {
      const isLocationEnabled = await Location.hasServicesEnabledAsync();

      if (!isLocationEnabled) {
        setStatus("locationDisabled");
        return;
      }

      let permission = await Location.getForegroundPermissionsAsync();

      if (
        permission.status !== Location.PermissionStatus.GRANTED &&
        permission.canAskAgain
      ) {
        permission = await Location.requestForegroundPermissionsAsync();
      }

      if (permission.status !== Location.PermissionStatus.GRANTED) {
        setShouldOpenSettings(!permission.canAskAgain);
        setStatus("permissionDenied");
        return;
      }

      setShouldOpenSettings(false);

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const countryCode = addresses[0]?.isoCountryCode?.toUpperCase();

      if (!countryCode) {
        setStatus("error");
        return;
      }

      setStatus(
        countryCode === GEORGIA_COUNTRY_CODE ? "allowed" : "outsideGeorgia",
      );
    } catch {
      setStatus("error");
    }
  }, []);

  const retryLocationAccess = useCallback(async () => {
    if (status === "permissionDenied" && shouldOpenSettings) {
      try {
        isReturningFromSettings.current = true;
        await Linking.openSettings();
      } catch {
        isReturningFromSettings.current = false;
        setStatus("error");
      }

      return;
    }

    await checkLocationAccess();
  }, [checkLocationAccess, shouldOpenSettings, status]);

  useEffect(() => {
    void checkLocationAccess();
  }, [checkLocationAccess]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active" && isReturningFromSettings.current) {
        isReturningFromSettings.current = false;
        void checkLocationAccess();
      }
    });

    return () => subscription.remove();
  }, [checkLocationAccess]);

  return {
    status,
    checkLocationAccess,
    retryLocationAccess,
    shouldOpenSettings,
  };
};
