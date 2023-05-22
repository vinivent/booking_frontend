import { Card } from "../components/card/card";
import { useState } from "react";
import CreateModal from "../components/create-modal/create-modal";
import useReservationData from "../hooks/useReservationData";
import { ReservationData } from "../interface/ReservationData";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const BookingList = () => {
  const { data } = useReservationData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col min-h-screen">
        {data && data.length > 0 ? (
          <div>
            {data.map((reservationData: ReservationData) => (
              <Card
                key={reservationData.id}
                id={reservationData.id}
                name={reservationData.name}
                image={reservationData.image}
                startDate={reservationData.startDate}
                endDate={reservationData.endDate}
                startHour={reservationData.startHour}
                endHour={reservationData.endHour}
              />
            ))}
          </div>
        ) : (
          <p className="text-black font-poppins">
            Não existem reservas no nosso site.
          </p>
        )}
        {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
        <Link
          to={"/reservas"}
          className="bg-green-600 px-3 py-1 rounded-full text-white font-poppins font-semibold fixed right-3 bottom-5"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default BookingList;
