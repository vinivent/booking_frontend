import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

const API_URL = "http://localhost:8080";

const deleteData = async (id: number): AxiosPromise<any> => {
  const response = await axios.delete(
    `${API_URL}/reservation/deleteReservation/${id}`
  );
  return response;
};

export function useReservationDataDelete() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(["reservation-data"]);
    },
  });

  return mutation;
}
