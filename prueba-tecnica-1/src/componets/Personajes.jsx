import React from 'react';

const API_PELICULAS = 'https://swapi.dev/api/films';

const obtenerPersonajes = async () => {
  const respuesta = await fetch('https://swapi.dev/api/films');
  const data = await respuesta.json();
  return data;
};

const Personajes = () => {
  return (
    <div>
      <h1>Personajes</h1>
    </div>
  );
};

export default Personajes;
