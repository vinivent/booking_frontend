import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { ReservationData } from "../interface/ReservationData";

const API_URL = "http://localhost:8080";

const postData = async (data: ReservationData): AxiosPromise<any> => {
  const response = await axios.post(
    API_URL + "/reservation/addReservations",
    data
  );
  return response;
};

export function useReservationDataPost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries(["reservation-data"]);
    },
  });

  return mutation;
}
