// Datos iniciales y configuración
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Carga el carrito del storage
let productos = [
    { id: 1, nombre: "Notebook", precio: 1200000 },
    { id: 2, nombre: "PC Escritorio", precio: 930000 },
    { id: 3, nombre: "PC Gammer", precio: 1400000 },
    { id: 4, nombre: "PC Oficina", precio: 950000 }
];

// Función de login
function login() {
    const username = document.getElementById("username").value.trim();

    if (username) {
        localStorage.setItem("username", JSON.stringify(username));
        alert(`Bienvenido, ${username}!`);
        mostrarCarritoSection();
    } else {
        alert("Por favor, ingresa un nombre de usuario.");
    }
}

// Muestra la sección del carrito y oculta el login
function mostrarCarritoSection() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("carrito-section").style.display = "block";
    mostrarProductos();
    actualizarCarrito();
}

// Mostrar productos disponibles
function mostrarProductos() {
    const productosContainer = document.getElementById("productos");
    productosContainer.innerHTML = ""; // Limpia el contenedor

    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");

        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

// Agrega productos al carrito
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find((producto) => producto.id === idProducto);
    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        alert(`Se agregó ${productoSeleccionado.nombre} al carrito.`);
    }
}

// Actualiza el carrito en el DOM
function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = ""; // Limpia el contenedor

    // Generar lista de productos en el carrito
    carrito.forEach((producto, index) => {
        const carritoItem = document.createElement("li");
        carritoItem.textContent = `${producto.nombre} - $${producto.precio}`;
        
        // Botón para eliminar un producto
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarDelCarrito(index);
        
        carritoItem.appendChild(eliminarBtn);
        carritoContainer.appendChild(carritoItem);
    });
    
    // Mostrar el total del carrito
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    const totalDiv = document.createElement("div");
    totalDiv.textContent = `Total: $${total}`;
    carritoContainer.appendChild(totalDiv);
}

// Función para eliminar un producto específico del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar producto del array
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Vacía el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    alert("El carrito ha sido vaciado.");
}

// Finaliza la compra
function finalizarCompra() {
    if (carrito.length > 0) {
        alert("Compra finalizada con éxito!");
        vaciarCarrito();
    } else {
        alert("El carrito está vacío.");
    }
}

// Verificar si el usuario ya está logueado
document.addEventListener("DOMContentLoaded", () => {
    const username = JSON.parse(localStorage.getItem("username"));
    if (username) {
        mostrarCarritoSection();
    }
});

