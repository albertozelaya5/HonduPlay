let listaInventario = [];

const objInventario = {
    id: '',
    nombre: '',
    cedula: '',
    email: '',
    movil: '',
}

let editar = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const cedulaImput = document.querySelector('#cedula');
const emailImput = document.querySelector('#email');
const movilImput = document.querySelector('#movil');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreImput.value === ''|| cedulaImput.value === '' || emailImput.value === ''|| movilImput.value === ''){
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editar){
        editarInventario();
        editar = false;
    } else {
        objInventario.id = Date.now();
        objInventario.nombre = nombreImput.value;
        objInventario.cedula = cedulaImput.value;
        objInventario.email = emailImput.value;
        objInventario.movil = movilImput.value;
        

        agregarProducto();
    }
}

function agregarProducto() {
    listaInventario.push({...objInventario});

    mostrarInventario();

    formulario.reset();

    limpairObjeto();

}

function limpairObjeto() {
    objInventario.id = '';
    objInventario.nombre = '';
    objInventario.cedula = '';
    objInventario.email = '';
    objInventario.movil = '';
}

function mostrarInventario() {

    limpairHTML();

    const divInventario = document.querySelector('.div-inventario');

    listaInventario.forEach(inventario => {
        const{id, nombre, cedula, email, movil,}  = inventario;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${cedula} - ${email} - ${movil} - `;
        parrafo.dataset.id = id;
    
        const  editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarInventario(inventario);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const  eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarInventario(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divInventario.appendChild(parrafo);
        divInventario.appendChild(hr);


    });
}

function cargarInventario(inventario)  {

    const{id, nombre, cedula, email, movil} = inventario;

    nombreImput.value = nombre;
    cedulaImput.value = cedula;
    emailImput.value = email;
    movilImput.value = movil;

    objInventario.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

    editar = true;

}

function editarInventario (){

    objInventario.nombre = nombreImput.value;
    objInventario.cedula = cedulaImput.value;
    objInventario.email = emailImput.value;
    objInventario.movil = movilImput.value;

    listaInventario.map(inventario => {

        if(inventario.id === objInventario.id){
            inventario.id = objInventario.id;
            inventario.nombre = objInventario.nombre;
            inventario.cedula = objInventario.cedula;
            inventario.email = objInventario.email;
            inventario.movil = objInventario.movil;
        }
    
    });

    limpairHTML();
    mostrarInventario();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editar = false;

}

function eliminarInventario(id) {

    listaInventario = listaInventario.filter(inventario => inventario.id !== id);

    limpairHTML();
    mostrarInventario();

}

function limpairHTML(){
    const divInventario = document.querySelector('.div-inventario');
    while(divInventario.firstChild){
        divInventario.removeChild(divInventario.firstChild);
    }
}