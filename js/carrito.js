const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

let carrito = JSON.parse(localStorage.getItem("carrito")) 
const sumaTotal = document.getElementById("sumaTotal")
const cuotasTotal = document.getElementById("cuotasTotal")
const carritoVacio = document.getElementsByClassName("carritoVacio")[0]
const botonComprar = document.getElementById("botonComprar")
const sumaTotalClass = document.getElementsByClassName("sumaTotalClass")[0]
const cuotasTotalClass = document.getElementsByClassName("cuotasTotalClass")[0]


const recuperoCarrito = ()=> {
    let tabla = document.getElementById("tabla__body")
    carrito.forEach((item) => {
        let fila = `<tr>
                        <td align="center"><img class="imagen-carrito" src="${item.imagen}"></td>
                        <td align="center">${item.nombre}</td>
                        <td align="center">${formatterPeso.format(item.importe)}</td>
                    </tr>`
                    tabla.innerHTML += fila
                    sumaTotal.innerText = formatterPeso.format(carrito.reduce((acc, item) => acc + item.cantidad * item.importe, 0))
                    cuotasTotal.innerText = formatterPeso.format(carrito.reduce((acc, item) => acc + item.importe / 6, 0))
} )}
recuperoCarrito()

const vacio = ()=> {
    if (carrito.length > 0){
        botonComprar.classList.remove("ocultar")
        carritoVacio.classList.add("ocultar")
        sumaTotalClass.classList.remove("ocultar")
        cuotasTotalClass.classList.remove("ocultar")
     } else if (carrito.length <= 0){
        botonComprar.classList.add("ocultar")
        sumaTotalClass.classList.add("ocultar")
        cuotasTotalClass.classList.add("ocultar")
        carritoVacio.classList.remove("ocultar")
     }
}
vacio()

const alertaFinal = ()=> {
    Swal.fire({ 
        title: "¡Muchas gracias por su compra!",
        text: "En breve recibirá un correo electrónico con su factura.",
        icon: "success",
        backdrop: true,
        iconColor:'green',
        width: '70%',
        confirmButtonColor:'#c69e98',
        confirmButtonText: 'Aceptar',
        background: '#e9e9e9',
        stopKeydownPropagation: true,
        allowEscapeKey: false,
        allowEnterKey: false
    }).then(function(){ 
        location.reload();
        }
     );
}

/* const eliminarDelCarrito = () => {
    const item = carrito.find((item) => item.id === item.Id)
    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.
    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    console.log(carrito) 
}
 */
const comprar = () => {
    localStorage.clear(carrito)
    alertaFinal()
    console.log(carrito)
}


botonComprar.addEventListener("click", ()=> comprar() )
