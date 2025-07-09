// Asigna evento clic a todos los botones con la clase "comprar" del HTML
let botonesComprar = document.getElementsByClassName('comprar');
   for (let i = 0; i < botonesComprar.length; i++) {
     botonesComprar[i].addEventListener('click', agregarProducto);
   }

// Vacía carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
     localStorage.removeItem('carrito');
     cargarCarrito();
});

// Agrega productos al carrito
function agregarProducto(event) {
    let producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio'),
        modelo: event.target.getAttribute('data-modelo')
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';
    totalCarrito.textContent = '0';

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
   
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];   
        let li = document.createElement('li');
        li.textContent =producto.modelo+'-'+ producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio) || 0;
    }
    // Mostrar el total redondeado a 3 decimales
    totalCarrito.textContent = total.toFixed(3);
}

function pagar() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += parseFloat(carrito[i].precio) || 0;
    }

    // Guardar datos en sessionStorage
    sessionStorage.setItem('productos', JSON.stringify(carrito));
    sessionStorage.setItem('total', total.toFixed(3));

    alert(`Total a pagar: $${total.toFixed(3)}`);
    window.location.href = "compra.html";
}

// Asignar el evento al botón (cuando el DOM esté listo)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnPagar').addEventListener('click', pagar);
});
