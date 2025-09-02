import { useState, useEffect } from "react";

export default function Background() {
  const [bgUrl, setBgUrl] = useState("");

  const getNewBackground = () => {
    const url = `https://picsum.photos/3840/2160?random=${Date.now()}`;
    setBgUrl(url);
  };

  useEffect(() => {
    getNewBackground();
  }, []);

  return (
    <>
      {/* Fondo detrás */}
    <div
  className="absolute inset-0 -z-10 bg-cover bg-center"
  style={{ backgroundImage: `url(${bgUrl})` }}
></div>
      {/* Botón encima */}
      <button
        onClick={getNewBackground}
        className="fixed top-4 right-4 z-20 bg-white/80 text-gray-800 px-4 py-2 rounded-xl shadow-md hover:bg-white transition"
      >
        Cambiar Fondo
      </button>
    </>
  );
}
