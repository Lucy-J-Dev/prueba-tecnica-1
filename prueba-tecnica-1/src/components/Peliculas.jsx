import { useEffect, useState } from "react";

const API_PELICULAS = "https://swapi.dev/api/films";

const obtenerPeliculas = async () => {
  const respuesta = await fetch(API_PELICULAS);
  const data = await respuesta.json();
  return data;
};

const obtenerPersonaje = async (url) => {
  const respuesta = await fetch(url);
  const data = await respuesta.json();
  return data;
};

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [personaje, setPersonaje] = useState();

  useEffect(() => {
    obtenerPeliculas().then((data) => {
      setPeliculas(data.results);
    });
  }, []);

  const handlePersonaje = (event) => {
    event.preventDefault();
    const url = event.target.href;
    // usar funcion para obtener info del personaje
    obtenerPersonaje(url).then((data) => {
      setPersonaje(data);
    });
  };

  return (
    <div className="tutorial flex flex-col">
      <h1>Lista de Peliculas</h1>
      {personaje && (
        <div>
          <h3>Nombre del personaje: {personaje.name}</h3>
          <p>Altura: {personaje.height} cm</p>
          <p>Masa: {personaje.mass} Kg</p>
          <p>Genero: {personaje.gender}</p>
          <p>Anio de nacimiento: {personaje.birth_year}</p>
        </div>
      )}
      <div>
        {peliculas &&
          peliculas.map((pelicula, index) => (
            <div key={index}>
              <h2>Titulo de la pelicula: {pelicula.title} </h2>
              <p>Director: {pelicula.director}</p>
              <p>Productor: {pelicula.producer} </p>
              <p>Fecha de estreno: {pelicula.release_date} </p>
              <p>Resumen de la pelicula: {pelicula.opening_crawl}</p>
              <div>
                <ul>
                  {pelicula.characters.map((personaje, index) => (
                    <li key={index}>
                      <a href={personaje} onClick={handlePersonaje}>
                        Personaje {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Peliculas;
