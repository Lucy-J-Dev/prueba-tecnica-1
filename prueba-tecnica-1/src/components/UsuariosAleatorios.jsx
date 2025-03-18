import { useEffect, useState } from "react";
import "./UsuariosAleatorios.css";

const API = "https://randomuser.me/api/";

const obtenerUsuariosAleatorios = async (cantidad) => {
  //   throw new Error("Error simulado");

  const resultado = await fetch(`${API}?results=${cantidad}`);
  const respuesta = await resultado.json();
  return respuesta.results;
};

const UsuariosAleatorios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosTemporales, setUsuariosTemporales] = useState([]);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);

    setTimeout(() => {
      obtenerUsuariosAleatorios(4)
        .then((usuariosDesdeApi) => {
          setError(false);
          setUsuarios(usuariosDesdeApi);
          setUsuariosTemporales(usuariosDesdeApi);
        })
        .catch(() => {
          setError(true);
          setUsuarios([]);
          setUsuariosTemporales([]);
        })
        .finally(() => {
          setCargando(false);
        });
    }, 2000);
  }, []);

  const handleEliminarUsuario = (uuid) => {
    const usuariosFiltrados = usuarios.filter((usuario) => {
      return usuario.login.uuid !== uuid;
    });
    setUsuarios(usuariosFiltrados);
  };

  const handleRecuperarUsuarios = () => {
    setCargando(true);
    setUsuarios([]);
    setUsuariosTemporales([]);

    obtenerUsuariosAleatorios(4)
      .then((usuariosDesdeApi) => {
        setError(false);
        setUsuarios(usuariosDesdeApi);
        setUsuariosTemporales(usuariosDesdeApi);
      })
      .catch(() => {
        setError(true);
        setUsuarios([]);
        setUsuariosTemporales([]);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const handleReestablecerUsuarios = () => {
    setUsuarios(usuariosTemporales);
  };

  return (
    <div className="usuario-container">
      <header>
        <h1>Prueba tecnica</h1>
        <button
          onClick={() => {
            handleRecuperarUsuarios();
          }}
        >
          Resetear estado
        </button>
        <button
          onClick={() => {
            handleReestablecerUsuarios();
          }}
        >
          Recuperar usuarios Eliminados
        </button>
      </header>
      <main>
        {error && (
          <div>
            <p>Ha ocurrido un error al llamar al API de usuarios</p>
          </div>
        )}

        {cargando && (
          <div>
            <p>Cargando...</p>
          </div>
        )}

        {usuarios.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={usuario.picture.thumbnail}
                      alt={`Foto de ${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`}
                    />
                  </td>
                  <td>{usuario.name.first}</td>
                  <td>{usuario.name.last}</td>
                  <td>{usuario.location.country}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEliminarUsuario(usuario.login.uuid);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default UsuariosAleatorios;
