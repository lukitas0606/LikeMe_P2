import { errorToast, successToast } from "../utils/toast";
import { useState } from "react";

export default function AddPost({ createPost }) {
  const [values, setValues] = useState({
    titulo: "",
    img: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { titulo, img, descripcion } = values;

    if (!titulo.trim() || !img.trim() || !descripcion.trim()) {
      errorToast("Todos los campos son obligatorios");
      return;
    }

    try {
      await createPost({ titulo, img, descripcion });
      successToast("Se ha agregado con éxito");

      window.location.reload();
    } catch (error) {
      console.error("Error al agregar la publicación:", error);
      errorToast("Error interno del servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="titulo" className="form-label">
          Titulo
        </label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          name="titulo"
          onChange={handleChange}
          value={values.titulo}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="img" className="form-label">
          Imagen URL
        </label>
        <input
          type="text"
          className="form-control"
          id="img"
          name="img"
          onChange={handleChange}
          value={values.img}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripcion
        </label>
        <textarea
          id="descripcion"
          className="form-control"
          name="descripcion"
          onChange={handleChange}
          value={values.descripcion}
        />
      </div>
      <button
        type="submit"
        className="btn btn-light mx-auto d-block"
        disabled={
          !values.titulo.trim() ||
          !values.img.trim() ||
          !values.descripcion.trim()
        }
      >
        Agregar
      </button>
    </form>
  );
}
