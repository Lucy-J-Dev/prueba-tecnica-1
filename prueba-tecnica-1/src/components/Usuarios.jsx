import { useEffect, useState } from "react";

const API_USUARIOS = "https://randomuser.me/api";

const obtenerUsuarios = async () => {
  const respuesta = await fetch(`https://randomuser.me/api/?results=10`);
  const usuarios = await respuesta.json();
  return usuarios.results;
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [errores, setErrores] = useState("");

  useEffect(() => {
    obtenerUsuarios(10)
      .then((usuarios) => {
        console.log(usuarios);
        setUsuarios(usuarios);
      })
      .catch((error) => setErrores(error));
  }, []);

  return (
    <section>
      <h1>Lista de usuarios</h1>

      {errores && (
        <p style={{ color: "red" }}>No se puede mostrar los usuarios</p>
      )}

      {usuarios &&
        usuarios.map((usuario, index) => (
          <div key={index}>
            <h3>{`${usuario.name.first} ${usuario.name.last}`}</h3>
            <p>{`${usuario.location.city} - ${usuario.location.country}`}</p>
            <img
              src={`${usuario.picture.medium}`}
              alt={`Foto de perfil de ${usuario.name.first} ${usuario.name.last}`}
            />
          </div>
        ))}
    </section>
  );
};

export default Usuarios;
