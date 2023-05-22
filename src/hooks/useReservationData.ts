import axios, { AxiosPromise } from "axios";
import { ReservationData } from "../interface/ReservationData";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<ReservationData[]> => {
  const response = await axios.get(API_URL + "/reservation/getReservations");
  return response;
};

const useReservationData = () => {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['reservation-data'],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
};

export default useReservationData;

