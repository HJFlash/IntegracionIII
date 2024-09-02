import './App.css';
import inicioImagen from './assets/imagen_inicio.webp';
import image1 from './assets/image 1.png';
import Header from './components/header';

function App() {

  const scrollToVideo = () => {
    document.getElementById('videoSection').scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={inicioImagen} alt="Imagen Inicio" className="image" />
        <div className='info'>
          <div className='infoUser'>
            <h2>Aqui encontraras informacion de uso</h2>
            <button className='btn' id='infoBtn' onClick={scrollToVideo}>ir a informaciones</button>
          </div>
          <div className='solicitudUser'>
            <p>Ya cuentas con esta informacion?</p>
            <button className='btn' id='soliBtn'>Solicitar Petición</button>
          </div>
        </div>
      </div>
      <div className='content2'>
        <h3>informacion de uso</h3>
        <p>En el siguente video encontrar la informacion de como realizar  una peticion de servicio </p>
        <div className="video-container">
          <iframe 
            className="video-container" 
            id="videoSection"
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/Y-x0efG1seA?si=Bw2I4bQeYNd_s8jU" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
