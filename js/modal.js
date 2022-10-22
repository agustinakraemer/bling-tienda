const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const contenedorModalFinal = document.getElementsByClassName('modal-contenedor-final')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const modalCarritoFinal = document.getElementsByClassName('modal-carrito-final')[0]
const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
    if (carrito.length > 0){
        botonComprar.classList.remove("ocultar")
     } else if (carrito.length >= 0){
        botonComprar.classList.add("ocultar")

     }
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})

