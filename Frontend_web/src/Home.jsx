import LogoMuni from './assets/logo-temuco-1024x791.webp';
import AbuelosHome from './assets/abuelosHome.webp';
import Uct from './assets/Logo_UCT.webp';
import Header from './components/header';
import { Link } from 'react-router-dom';
import Footer from './components/footer';

function Home() {

  return (
  <div className="App h-screen flex flex-col bg-gray-200">
    <Header />
    <div className="flex h-screen bg-slate-50 rounded-lg shadow mx-4 mt-20 items-center justify-center">


      <div className="flex flex-col justify-center pr-10">
        <h2 className="text-4xl font-bold mb-5">Servicio Online de agendamiento <br />para Adulto Mayor</h2>
        <p className="text-lg mb-8">
          Aquí podrás encontrar toda la información que necesitas sobre los servicios <br />
          disponibles, horarios, y cómo solicitarlos de manera sencilla y rápida.
        </p>
        


        <div className="flex justify-center items-center mb-4 gap-4">
            <Link to="/FuncionamientoUser" className="bg-naranja-claro text-white px-4 py-2 rounded border-naranja-claro hover:bg-white hover:text-black border hover:border-naranja-claro">
              Ir a Informaciones
            </Link>


            <Link to="/SolicitudUsuario" className="bg-naranja-claro text-white px-4 py-2 rounded border-naranja-claro hover:bg-white hover:text-black border hover:border-naranja-claro">
              Ir a Solicitar Servicio
            </Link>
        </div>
      </div>



      <div className="w-2/6">
        <img src={AbuelosHome} alt="Imagen Adulto mayor" className="w-5/6 h-5/6 object-cover"/>
      </div>

    </div>

    <div className="flex justify-center space-x-4 bg-slate-50 rounded-lg shadow m-4 p-2 gap-5">
      <img src={LogoMuni} alt="Logo Participante 1" className="w-[80px] h-[80px] object-cover"/>
      <img src={Uct} alt="Logo UCT" className="w-[80px] h-[80px] object-cover"/>
    </div>


    <Footer />
  </div>
  );
}

export default Home;
