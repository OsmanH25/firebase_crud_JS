//Este es el encargado de interactuar con la base de datos "firebase" 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/ /firebase-app.js"; // Importamos la funcion initializeApp desde la libreria firebase-app.js
import { getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    deleteDoc, 
    onSnapshot,// Esta funcion nos permite obtener los datos en tiempo real sin necesidad de recargar la pagina
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/ /firebase-firestore.js" // Importamos firestore, con esto podemos interactuar con la base de datos
//collection es una funcion que nos permite crear una coleccion en la base de datos y getFirestore es una funcion que nos permite obtener la base de datos
// addDoc es una funcion que nos permite agregar un documento a la base de datos
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
    
// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "",
 authDomain: "fir-crud-js-",
 projectId: "fir-crud-js-",
 storageBucket: "",
 messagingSenderId: ",
 appId: ""
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); // Obtenemos la base de datos

export const guardarTarea = (titulo, descripcion) => // Esta funcion nos permite guardar una tarea en la base de datos
    addDoc(collection(db, 'tareas'), {titulo, descripcion}) // addDoc recibe dos parametros, el primero es la coleccion a la que queremos agregar el documento y el segundo es el documento que queremos agregar

export const obtenerTareas = () => getDocs(collection(db, 'tareas')) 

export const onGetTareas = (callback) => 
    onSnapshot(collection(db, 'tareas'), callback); // con esta funcion simplificamos codigo

export const eliminarTarea = (id) => deleteDoc(doc(db, 'tareas', id));

export const obtenerTarea = (id) => getDoc(doc(db, 'tareas', id));

export const actualizarTarea = (id, newFields) => updateDoc(doc(db, 'tareas', id), newFields);
