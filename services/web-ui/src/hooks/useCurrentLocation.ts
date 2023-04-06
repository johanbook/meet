import React from "react";

interface UseCurrentLocationSuccessfulResult {
  // TODO: Remove undefined from type
  coordinates: GeolocationCoordinates | undefined;
  error: undefined;
}

interface UseCurrentLocationErrorResult {
  coordinates: undefined;
  error: string;
}

type UseCurrentLocationResult =
  | UseCurrentLocationErrorResult
  | UseCurrentLocationSuccessfulResult;

export function useCurrentLocation(): UseCurrentLocationResult {
  const [coordinates, setCoordinates] =
    React.useState<GeolocationCoordinates>();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      setCoordinates(coords);
    });
  }, []);

  // TODO: Include error message
  return { coordinates, error: undefined };
}
