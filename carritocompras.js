// Variables globales
const usuarios = [{ username: 'usuario1' }, { username: 'usuario2' }];
let carrito = [];

// Productos disponibles
const productos = [
    { id: 1, nombre: 'Notebook', precio: 1000000 },
    { id: 2, nombre: 'PC-Escritorio', precio: 1200000 },
    { id: 3, nombre: 'PC-Oficina', precio: 1300000 },
    { id: 4, nombre: 'PC-Gammer', precio: 1400000 },
    { id: 5, nombre: 'Tablet-infantil', precio: 850000 }
];

// Función de login
function login() {
    const username = document.getElementById('username').value;
    const usuarioValido = usuarios.find(user => user.username === username);

    if (usuarioValido) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('carrito-section').style.display = 'block';
        mostrarProductos();
    } else {
        alert('Usuario no encontrado');
    }
}

// Función para mostrar productos disponibles
function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.textContent = `${producto.nombre} - $${producto.precio}`;
        const agregarButton = document.createElement('button');
        agregarButton.textContent = 'Agregar al carrito';
        agregarButton.onclick = () => agregarAlCarrito(producto);
        productoElement.appendChild(agregarButton);
        productosDiv.appendChild(productoElement);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoUl = document.getElementById('carrito');
    carritoUl.innerHTML = '';
    
    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        
        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.onclick = () => eliminarDelCarrito(index);
        item.appendChild(eliminarButton);
        
        carritoUl.appendChild(item);
    });

    console.log('Carrito actual:', carrito); 
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
    } else {
        alert('Compra realizada con éxito');
        carrito = []; 
        mostrarCarrito();
    }
}
