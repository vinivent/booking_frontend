// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios, { AxiosPromise } from "axios";
// import { ReservationData } from "../interface/ReservationData";

// const API_URL = "http://localhost:8080";

// const updateData = async (id: number, data: ReservationData): AxiosPromise<any> => {
//   const response = await axios.put(
//     `${API_URL}/reservation/updateReservation/${id}`,
//     data
//   );
//   return response;
// };

// export function useReservationDataUpdate() {
//   const queryClient = useQueryClient();
//   const mutate = useMutation({
//     mutationFn: updateData,
//     retry: 2,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["reservation-data"]);
//     },
//   });

//   return mutate;
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ReservationData } from "../interface/ReservationData";

const API_URL = "http://localhost:8080";

const updateData = async (id: number, data: ReservationData): AxiosPromise<any> => {
  const response = await axios.put(
    `${API_URL}/reservation/updateReservation/${id}`,
    data
  );
  return response;
};

export function useReservationDataUpdate() {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, { id: number; data: ReservationData }>(
    ({ id, data }) => updateData(id, data),
    {
      retry: 2,
      onSuccess: () => {
        queryClient.invalidateQueries(["reservation-data"]);
      },
    }
  );

  return mutation;
}
