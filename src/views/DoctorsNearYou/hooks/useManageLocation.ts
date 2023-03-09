import { Profile } from "@/services/graphql/schemas/profile.schema";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { useEffect, useState } from "react";

const useManageLocation = (
  fetchDoctors: LazyQueryExecFunction<
    {
      getDoctorsNearMe: Partial<Profile>[] | null;
    },
    OperationVariables
  >
) => {
  const [coords, setCoords] = useState<Pick<
    GeolocationCoordinates,
    "longitude" | "latitude"
  > | null>(null);
  const [maxDistance, setMaxDistance] = useState(100);

  useEffect(() => {
    if (!coords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchDoctors({
            variables: {
              input: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                maxDistance,
              },
            },
          });
        },
        () => {
          setCoords(null);
        }
      );
    } else {
      fetchDoctors({ variables: { input: { ...coords, maxDistance } } });
    }
  }, [maxDistance]);

  return { coords, maxDistance, setMaxDistance };
};

export default useManageLocation;
