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
