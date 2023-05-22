import { useState } from "react";
import { useReservationDataDelete } from "../../hooks/useReservationDataDelete";
import { useReservationDataUpdate } from "../../hooks/useReservationDataUpdate";
import CreateModal from "../create-modal/create-modal";

interface CardProps {
  id?: number;
  name: string;
  image: string;
  startDate: Date;
  endDate: Date;
  startHour: string;
  endHour: string;
}

export function Card({
  id,
  name,
  image,
  startDate,
  endDate,
  startHour,
  endHour,
}: CardProps) {
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState<CardProps>({
    id,
    name,
    image,
    startDate,
    endDate,
    startHour,
    endHour,
  });
  const deleteMutation = useReservationDataDelete();
  const updateMutation = useReservationDataUpdate();

  const handleDelete = () => {
    if (id !== undefined) {
      deleteMutation.mutate(id);
    } else {
      alert("Failed to delete. ID is not defined.");
    }
  };

  const handleUpdate = () => {
    if (id !== undefined) {
      setIsModalOpen(true);
    } else {
      alert("Failed to update. ID is not defined.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card grid grid-cols-3 gap-4 items-center bg-[#242424] rounded-lg p-4 shadow-md hover:shadow-red-900 mb-3">
      <img
        src={image}
        className="col-span-1 w-32 h-32 object-cover rounded-full mr-4"
        alt="Profile"
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="card-title text-white font-poppins text-xl">{name}</h2>
        </div>
        <div className="flex flex-col">
          <p className="mb-2 font-poppins text-white">
            <span className="font-semibold text-white">
              Data inicial da reserva:
            </span>{" "}
            {formattedStartDate}
          </p>
          <p className="mb-2 font-poppins text-white">
            <span className="font-semibold text-white">
              Data final da reserva:
            </span>{" "}
            {formattedEndDate}
          </p>
          <p className="mb-2 font-poppins text-white">
            <span className="font-semibold text-white">
              Horário inicial da reserva:
            </span>{" "}
            {startHour}
          </p>
          <p className="font-poppins text-white">
            <span className="font-semibold text-white">
              Horário final da reserva:
            </span>{" "}
            {endHour}
          </p>
        </div>
      </div>
          <div className="space-x-2">
            <button
              onClick={handleDelete}
              className="ml-16 bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 font-poppins"
            >
              Deletar
            </button>
            {updateMutation.isLoading ? (
              <button
                className="bg-blue-500 text-white rounded px-2 py-1 font-poppins"
                disabled
              >
                Atualizando...
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 font-poppins"
              >
                Editar
              </button>
            )}
          </div>
      {isModalOpen && (
        <CreateModal
          reservationData={reservationData}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}
