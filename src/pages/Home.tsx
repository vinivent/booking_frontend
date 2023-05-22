import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fundo from "../assets/volei.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
    <div className="h-screen ">
      <Navbar />
      <div className="relative h-full">
        <img
          src={fundo}
          alt="background"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black opacity-90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-3 font-poppins">
            Reserve seu horário na Arena Karasuno
          </h1>
          <p className="text-lg font-medium">
            Agende agora e divirta-se jogando vôlei com seus amigos!
          </p>
          <Link
            to="/reservas"
            className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full border font-semibold text-lg hover:bg-blue-600 
              transition-colors duration-300 font-poppins"
          >
            Faça sua reserva!
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
