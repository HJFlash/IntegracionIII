import inicioImagen from './assets/imagen_inicio.webp';
import Header from './components/header';
import { Link } from 'react-router-dom';

function Home() {

  const scrollToVideo = () => {
    document.getElementById('videoSection').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header />
      <div className="flex items-center bg-celeste-claro mt-16 ">
        <img src={inicioImagen} alt="Imagen Inicio" className="image" />
        <div className='flex items-center flex-col  flex-grow'>
          <div className='flex justify-center items-center flex-col mb-16'>
            <h2 className='mb-4 text-3xl'>Informacion de Uso</h2>
            <button className='bg-naranja-claro text-white font-semibold py-2 px-4 rounded shadow border-2 border-naranja-claro hover:bg-colors-claro hover:text-black transition duration-200' id='infoBtn' onClick={scrollToVideo}>ir a informaciones</button>
          </div>
          <div className='flex justify-center items-center flex-col'>
            <p className='mb-4 text-2xl' >Ya cuentas con esta informacion?</p>
            <Link to="/TomaSoli">
              <button className='bg-naranja-claro text-white font-semibold py-2 px-4 rounded shadow border-2 border-naranja-claro hover:bg-colors-claro hover:text-black transition duration-200' id='soliBtn'>Solicitar Petición</button>
            </Link>
          </div>
        </div>
      </div>



      <div className='Borrar'>
        <p>Temporal</p>
        <Link to="/Admin">
          <button className='mx-2'>Admin Modo</button>
        </Link>
        <Link to="/TrabajadorMod">
          <button className='mx-2'>TrabajadorModo</button>
        </Link>
        <Link to="/profileUser">
          <button className='mx-2'>Prerfil</button>
        </Link>
      </div>


      
      <div className='flex justify-center items-center flex-col mt-48 mb-48 '>
        <h3 className='mb-4 mt-4 text-3xl'>informacion de uso</h3>
        <p className='mb-4 mt-4 text-2xl'>En el siguente video encontrar la informacion de como realizar  una peticion de servicio </p>
        <div className='mb-16 mt-16'>
          <iframe 
            className="video-container" 
            id="videoSection"
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/Y-x0efG1seA?si=Bw2I4bQeYNd_s8jU" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;
