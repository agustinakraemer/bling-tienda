const contenedor__productos = document.getElementById("contenedor__productos")
const contenedor = document.querySelector(".container")
const URL = "../bbdd/fundas.json"
let carrito = []
let fundas = []
let contenidoHTML = ""

const mostrarCard = (contenido)=> {
    const {id, nombre, imagen, importe} = contenido
    return `<div class="producto">
                <a href="pages/productos.html">
                    <img class="producto__imagen" src="${imagen}" alt="camisa1">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${nombre}</p>
                        <p class="producto__precio">$${importe},00</p>
                        <p class="producto__id">${id}</p>
                    </div>
                </a>    
                <button class="producto__button" id="${id}"> Añadir al carrito </button>
            </div>`
}

const cargarContenido  = async ()=> {
    try {
        const response = await fetch(URL)
        const data = await response.json()
              fundas = data 
              fundas.forEach(etiqueta => contenidoHTML += mostrarCard(etiqueta))
    } 
    catch (error) {
        contenidoHTML += mostrarError()
    }
    finally {
        contenedor__productos.innerHTML = contenidoHTML
    }
}

const recuperarCarrito = ()=> {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito")) 
    }
}
recuperarCarrito()

document.addEventListener("DOMContentLoaded", async ()=> {
    const espero = await cargarContenido()
          activarClicks()
})

const actualizarCarrito = ()=> {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `<img class="imagen-carrito" src="${item.imagen}" >
                        <p>${item.nombre}</p>
                        <p>Cantidad: <span id="cantidad">${item.cantidad}</span></p>
                        <p>Precio: $${item.importe}</p>
                        <button onclick="eliminarDelCarrito(${item.id})" class="boton-eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="23" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>`
        contenedorCarrito.appendChild(div)       
    })
}

const activarClicks = ()=> {
    let botones = document.querySelectorAll("button.producto__button")
        botones.forEach(boton => boton.addEventListener("click", (e)=> agregarAlCarrito(e)))
}

const agregarAlCarrito = (event)=> {
    let item = fundas.find(etiqueta => etiqueta.id === parseInt(event.target.id))
        item !== undefined && carrito.push(item)
        console.clear()
        console.table(carrito)  
        localStorage.setItem("carrito", JSON.stringify(carrito))      
}
