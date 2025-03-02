import { useEffect, useState } from "react";

const API_PELICULAS = "https://swapi.dev/api/films";

const obtenerPeliculas = async () => {
  const respuesta = await fetch(API_PELICULAS);
  const data = await respuesta.json();
  return data;
};

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    obtenerPeliculas().then((data) => {
      console.log(data.results);
      setPeliculas(data.results);
    });
  }, []);

  return (
    <div className="tutorial flex flex-col">
      <h1>Lista de Peliculas</h1>
      <div>
        {peliculas.map((pelicula, index) => (
          <div key={index}>
            <h2>Titulo de la pelicula: {pelicula.title} </h2>
            <p>Director: {pelicula.director}</p>
            <p>Productor: {pelicula.producer} </p>
            <p>Fecha de estreno: {pelicula.release_date} </p>
            <p>Resumen de la pelicula: {pelicula.opening_crawl}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;
