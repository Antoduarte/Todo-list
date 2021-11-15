// Variables
const Lista = document.getElementById('lista-tareas');


// Events
Eventelistener()

function Eventelistener() {
    // Cuando se envia al formulario
    document.getElementById('formulario').addEventListener('submit', agregarTarea);
    Lista.addEventListener('click', eliminarTarea);
    document.addEventListener('DOMContentLoaded', mostraTareas)
}



// Funciones
function agregarTarea(e) {
    e.preventDefault();
    tarea = document.getElementById('tarea').value;
    //creando boton
    boton = document.createElement('a');
    boton.classList = 'borrar';
    boton.innerText = 'X';

    //creamos la lista
    li = document.createElement('li');
    li.classList = 'list';
    li.innerText = tarea;
    //agregamos el boton a la lista
    li.appendChild(boton);
    Lista.appendChild(li)
    
    agregarLocalstorage(tarea)
    tarea.value = '';
}

function eliminarTarea(e) {
    e.preventDefault();
    if (e.target.className === 'borrar') {
        e.target.parentElement.remove();
        borrarLocalstorage(e.target.parentElement.innerText);
    }

}

function mostraTareas() {
    let tareas
    tareas = obtenerLocalstorage();
    tareas.forEach(tarea => {

        //creando boton
        boton = document.createElement('a');
        boton.classList = 'borrar';
        boton.innerText = 'X';

        //creamos la lista
        li = document.createElement('li');
        li.classList = 'list';
        li.innerText = tarea;
        //agregamos el boton a la lista
        li.appendChild(boton);
        Lista.appendChild(li)
    });
}


function agregarLocalstorage(tarea) {
    let tareas;
    //obtenemos las tareas del local storage
    tareas = obtenerLocalstorage();
    //agregamos una nueva tarea al arreglo
    tareas.push(tarea);
    //agregamos al local storage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function obtenerLocalstorage() {
    let tareas;
    //agregamos un valor por defecto
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    }
    //obtenemos el local storage
    else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }

    return tareas;
}

function borrarLocalstorage(tarea) {
    let tareas, tareaBorrar

    tareaBorrar = tarea.substring(0, tarea.length - 1);

    tareas = obtenerLocalstorage();

    tareas.forEach((tarea, index) => {
        if (tareaBorrar === tarea) {
            tareas.splice(index, 1);
        }

    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
