import { ReservationData } from "../../interface/ReservationData";
import { useReservationDataPost } from "../../hooks/useReservationDataPost";
import { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";

interface CreateModalProps {
  closeModal(): void;
  reservationData?: ReservationData;
}

const CreateModal = ({ closeModal, reservationData }: CreateModalProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { mutate, isSuccess, isLoading } = useReservationDataPost();

  const handleSubmit = () => {
    const updatedReservationData: ReservationData = {
      ...reservationData,
      name,
      image,
      startDate,
      endDate,
      startHour,
      endHour,
    };
    mutate(updatedReservationData);
  };

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess]);

  return (
    <div className="modal bg-gray-900 p-6 rounded-lg flex flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-between mb-2">
        <h2 className="text-white text-2xl font-bold mb-4">
          Register Schedule
        </h2>
        <VscClose
          className="text-white text-3xl cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <form className="flex flex-wrap">
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">Image:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate.toISOString().split("T")[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate.toISOString().split("T")[0]}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">Start Hour:</label>
          <input
            type="time"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 px-2 mb-4">
          <label className="text-white font-semibold">End Hour:</label>
          <input
            type="time"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            className="form-input mt-1"
          />
        </div>
        <div className="flex justify-center w-full px-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-1"
            onClick={handleSubmit}
          >
            {isLoading ? "Editando" : "Editar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
