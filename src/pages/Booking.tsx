import { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import { ReservationData } from "../interface/ReservationData";
import { useReservationDataPost } from "../hooks/useReservationDataPost";
import { Link } from "react-router-dom";

interface CreateBooking {
  reservationData?: ReservationData;
}

const Booking = ({ reservationData }: CreateBooking) => {
  

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { mutate, isSuccess, isLoading } = useReservationDataPost();

  const sliderRef = useRef<Slider>(null);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const totalDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const daysOfMonth = Array.from({ length: totalDays }, (_, i) => {
    const dayIndex = (currentDate.getDay() + i) % 7;
    const day = i + 1;
    const formattedDate = `${day.toString().padStart(2, "0")}/${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;
    return {
      day,
      dayIndex,
      formattedDate,
    };
  }).filter((day) => day.day >= currentDate.getDate());

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const selectedDate = new Date(formattedDate);
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  };

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">
          Reserva de Horário da Arena Karasuno
        </h1>
        <p className="text-lg text-gray-600">
          Escolha a data desejada para a reserva
        </p>
        <h1 className="uppercase mt-6 font-poppins font-semibold">
          Dias de {currentMonth}
        </h1>
      </div>
      <div className="mx-auto max-w-2xl relative">
        <Slider {...settings} ref={sliderRef}>
          {daysOfMonth.map((day, index) => (
            <div key={index} className="p-2">
              <div
                className={`h-20 w-20 flex items-center justify-center rounded-lg cursor-pointer ${
                  selectedDate === day.formattedDate
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
                onClick={() => handleDateClick(day.formattedDate)}
              >
                <h3
                  className={`text-lg font-poppins ${
                    selectedDate === day.formattedDate ? "text-white" : ""
                  }`}
                >
                  {day.day}{" "}
                  {
                    ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"][
                      day.dayIndex
                    ]
                  }
                </h3>
              </div>
            </div>
          ))}
        </Slider>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6"
          onClick={previousSlide}
        >
          <AiFillCaretLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6"
          onClick={nextSlide}
        >
          <AiFillCaretRight size={24} />
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Reservation Form</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="font-semibold">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="image" className="font-semibold">
                Imagem (insira um link válido):
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="font-semibold">
                Data inicial do agendamento:
              </label>
              <input
                type="text"
                id="startDate"
                className="border p-2 w-full"
                value={new Date(startDate.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="font-semibold">
                Data final do agendamento:
              </label>
              <input
                type="text"
                id="endDate"
                className="border p-2 w-full"
                value={new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startHour" className="font-semibold">
                Hora inicial do agendamento:
              </label>
              <input
                type="time"
                id="startHour"
                value={startHour}
                onChange={(event) => setStartHour(event.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="endHour" className="font-semibold">
                Hora final do agendamento:
              </label>
              <input
                type="time"
                id="endHour"
                value={endHour}
                onChange={(event) => setEndHour(event.target.value)}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          {isSuccess && (
            <p className="text-green-500 font-semibold">
              Reserva feita com sucesso!
            </p>
          )}
        </form>
      </div>
      <Link to={"/bookingList"} className="bg-red-800 text-white rounded-full absolute top-[1%] right-[2%] px-2 py-1">Gerenciar Reservas</Link>
    </div>
  );
};

export default Booking;
