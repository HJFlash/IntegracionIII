import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-blue-500 mb-4">
        ¡Bienvenido a la App!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Esta es una aplicación creada con React y Tailwind CSS.
      </p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Empezar
      </button>
    </div>
  );
}

export default App;
