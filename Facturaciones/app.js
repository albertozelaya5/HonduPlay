let listaInventario = [];

const objInventario = {
    id: '',
    producto: '',
    cantidad: '',
    precio: '',
}

let editar = false; 

const formulario = document.querySelector('#formulario');
const productoImput = document.querySelector('#producto');
const cantidadImput = document.querySelector('#cantidad');
const precioImput = document.querySelector('#precio');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(productoImput.value === '' || precioImput.value === '' || cantidadImput.value === ''){
        alert('Todos los campos son obligatorios');
        return;
    }

    if(editar){
        editarInventario();
        editar = false;
    } else {
        objInventario.id = Date.now();
        objInventario.producto = productoImput.value;
        objInventario.cantidad = cantidadImput.value;
        objInventario.precio = precioImput.value;

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
    objInventario.producto = '';
    objInventario.cantidad='';
    objInventario.precio = '';
}

function mostrarInventario() {

    limpairHTML();

    const divInventario = document.querySelector('.div-inventario');

    listaInventario.forEach(inventario => {
        const{id, producto,cantidad, precio}  = inventario;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} -  ${producto} - ${cantidad} - ${precio} - `;
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

    const{id, producto,cantidad,  precio} = inventario;

    productoImput.value = producto;
    cantidadImput.value = cantidad;
    precioImput.value = precio;

    objInventario.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'

    editar = true;

}

function editarInventario (){

    objInventario.producto = productoImput.value;
    objInventario.cantidad = cantidadImput.value;
    objInventario.precio = precioImput.value;

    listaInventario.map(inventario => {

        if(inventario.id === objInventario.id){
            inventario.id = objInventario.id;
            inventario.producto = objInventario.producto;
            inventario.cantidad = objInventario.cantidad;
            inventario.precio = objInventario.precio;
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
