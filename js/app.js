const contenedor__productos = document.getElementById("contenedor__productos")
const contenedor = document.querySelector(".container")
const URL = "../bbdd/fundas.json"
const carrito = []
let fundas = []
let contenidoHTML = ""


const mostrarCard = (contenido)=> {
    const {id, nombre, imagen, importe} = contenido
    return `<div class="producto">
                <a href="pages/productos.html">
                    <img class="producto__imagen" src="${imagen}" alt="camisa1">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${nombre}</p>
                        <p class="producto__precio">$${importe}</p>
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

document.addEventListener("DOMContentLoaded", async ()=> {
    const espero = await cargarContenido()
          activarClicks()
        }
)
const actualizarCarrito = ()=> {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `<p>${item.nombre}</p>
                        <img class="imagen-carrito" src="${item.imagen}" >
                        <p>Cantidad: <span id="cantidad">${item.cantidad}</span></p>
                        <p>Precio: $${item.importe}</p>
                        <button onclick="eliminarDelCarrito(${item.id})" class="boton-eliminar">X</button>`

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, item) => acc + item.cantidad * item.importe, 0)
}

const activarClicks = ()=> {
    let botones = document.querySelectorAll("button.producto__button")
        botones.forEach(boton => boton.addEventListener("click", (e)=> agregarAlCarrito(e)))
}


const agregarAlCarrito = (event)=> {
    let item = fundas.find(etiqueta => etiqueta.id === parseInt(event.target.id))
        item !== undefined && carrito.push(item)
        console.clear()
        actualizarCarrito()
        console.table(carrito)
        
}




const eliminarDelCarrito = () => {
    const item = carrito.find((item) => item.id === item.Id)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    console.log(carrito)
}

const comprar = () => {
    carrito.length = 0
    console.log("listo")
    actualizarCarrito() 
    console.log(carrito)
}

botonComprar.addEventListener("click", ()=> comprar())
