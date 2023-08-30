// Este archivo es el que se encarga de correr la aplicacion
// Buscar informacion en "firebase add" sobre como agregar la libreria de firebase a un proyecto de javascript, tipos de datos y demas
import {
  guardarTarea,
  obtenerTareas,
  onGetTareas,
  eliminarTarea,
  obtenerTarea,
  actualizarTarea
} from "./firebase_conec.js"; // Importamos las funciones desde firebase_conec.js

const contenedorTareas = document.getElementById("contenedor-tareas");
const formularioTareas = document.getElementById("formulario-tareas"); // Obtenemos el formulario de tareas
let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  // Cuando la pagina se cargue, se ejecutara lo que esta dentro de esta funcion
  onGetTareas((querySnapshot) => {
    let html = ""; // Creamos una variable que contendra el html que queremos mostrar en la pagina

    querySnapshot.forEach((doc) => {
      // con el "foreach" recorremos los datos que obtenemos y le decimos que por cada documento#
      const tarea = doc.data(); // Obtenemos los datos de la tarea
      html += `
              <div class="card car-body mt-2 border-primary">
                  <h3 class="h5">${tarea.titulo}</h3>
                  <p>${tarea.descripcion}</p>
                  <div class="d-flex">
                      <button class='btn btn-primary btn-delete' data-id="${doc.id}">Eliminar</button>
                      <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Editar</button>
                  </div>
              </div> 
          `;
    });

    contenedorTareas.innerHTML = html;

    const btnsDelete = contenedorTareas.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        eliminarTarea(dataset.id);
      });
    });

    const btnsEdit = contenedorTareas.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const doc = await obtenerTarea(e.target.dataset.id);
        const tarea = doc.data();

        formularioTareas["tarea-titulo"].value = tarea.titulo;
        formularioTareas["tarea-descripcion"].value = tarea.descripcion;

        editStatus = true;
        id = e.target.dataset.id;

        formularioTareas["btn-tarea-guardar"].innerText = "Actualizar";
      });
    });
  });
}); // Cuando la pagina se cargue, se ejecutara lo que esta dentro de esta funcion

formularioTareas.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenimos que el formulario se recargue

  const titulo = formularioTareas["tarea-titulo"]; // Obtenemos el titulo de la tarea
  const descripcion = formularioTareas["tarea-descripcion"]; // Obtenemos la descripcion de la tarea

  if (!editStatus) {
    guardarTarea(titulo.value, descripcion.value);
  } else {
    actualizarTarea(id, {
      titulo: titulo.value,
      descripcion: descripcion.value
    });

    editStatus = false;
  }
  //guardarTarea(titulo.value, descripcion.value); // Guardamos la tarea en la base de datos
  formularioTareas.reset(); // Reseteamos el formulario
});

//mirar apartir de https://youtu.be/ey4k6mW9ds4?t=3980 1:06:20
// con F1 abrimos el servidor de firebase
