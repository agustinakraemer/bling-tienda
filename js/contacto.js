const servicio = document.querySelector("#servicio")
const ubicacion = document.querySelector("#ubicacion")
const necesidad = document.querySelector("#necesidad")
const mensaje = document.querySelector("#mensaje")
const nombre = document.querySelector("#nombre")
const apellido = document.querySelector("#apellido")
const zona = document.querySelector("#zona")
const btnEnviarForm = document.getElementById("btnEnviarForm")
const importe = document.querySelector("span")
const btnEnviar = document.querySelector("span.guardar")
const mail = document.querySelector("#mail")
const recuadro = document.querySelector("#recuadro_final")
const form_before = document.querySelector("#form_before")
let servicios = []
const URLser = "../bbdd/datosServicios.json"
const URLne = "../bbdd/datosNecesidad.json"
const URLub = "../bbdd/datosUbicacion.json"
const CostoBase = 72.60

class Cotizador {
    constructor(factorNecesidad, factorServicio, factorUbicacion, factorBase) {
        this.factorNecesidad = parseInt(factorNecesidad)
        this.factorSr = parseFloat(factorServicio)
        this.factorUb = parseFloat(factorUbicacion)
        this.factorBase = parseFloat(factorBase)
    }
    cotizar() {
        let resultado = ((this.factorBase + this.factorSr + this.factorUb + this.factorNecesidad)*1.21)
        return resultado.toFixed(2)
    }
}

//Función cargar Combos SELECT
const cargarCombo = async (select, url)=> {
    try {
        const respuesta = await fetch(url) 
        const respuestaData = await respuesta.json()
        servicios = respuestaData
        servicios.forEach(elemento => {
                select.innerHTML += `<option value="${elemento.factor}">${elemento.tipo}</option>`
            })
    } catch (error) {
        console.error("No existen elementos en el array.")
    } finally {
        servicios
    } 
} 
cargarCombo(ubicacion, URLub)
cargarCombo(necesidad, URLne)

const datosCompletos = ()=> {
    if (ubicacion.value !== "..." && necesidad.value !== "..." && mail.value !== "" && mensaje.value !== "" && nombre.value !== "" && apellido.value !== "") {
        return true
    } else {
        return false
    }
}
const loading = ()=> `<span class="loader"></span>`

const enviar = ()=> {
    btnEnviarForm.innerHTML = loading()
        setTimeout(() => {
            const ppto = new Cotizador( ubicacion.value, necesidad.value, CostoBase)
                importe.innerText = ppto.cotizar()
                btnEnviar.classList.remove("ocultar")
                recuadro.classList.remove("ocultar")
                form_before.classList.add("ocultar")
            nombresa.innerHTML = nombre.value
        }, 2000);
}


const realizarCotizacion = ()=> {
    datosCompletos() ? enviar() : alerta("Completa todos los campos.","warning")
}

const enviarPorEmail = ()=> {
    btnEnviar.innerHTML = loading()
    setTimeout(() => {
        const cotizacion = {
            fechaCotizacion: new Date().toLocaleString(),
            servicio: servicio[servicio.selectedIndex].text,
            ubicacion: ubicacion[ubicacion.selectedIndex].text,
            necesidad: necesidad.value,
        }
        localStorage.setItem("UltimaCotizacion", JSON.stringify(cotizacion))
        alerta("Presupuesto enviado a su casilla de correo.", "success")
    }, 1500);
    
}

btnEnviarForm.addEventListener("click", realizarCotizacion)
btnEnviar.addEventListener("click", enviarPorEmail)

// SWEET ALERT

const alerta = (mensaje, icono)=> {
    if (icono == "warning") {
        Swal.fire({ 
            title: mensaje,
            icon: icono,
            backdrop: true,
            iconColor:'rgb(189, 0, 0)',
            confirmButtonColor:'#253759',
            confirmButtonText: 'Aceptar',
            background: 'rgb(212, 212, 212)',
            stopKeydownPropagation: true,
            allowEscapeKey: false,
            allowEnterKey: false
        });
    } else {
        Swal.fire({ 
            title: mensaje,
            icon: icono,
            backdrop: true,
            iconColor:'green',
            confirmButtonColor:'#253759',
            confirmButtonText: 'Aceptar',
            background: 'rgb(212, 212, 212)',
            stopKeydownPropagation: true,
            allowEscapeKey: false,
            allowEnterKey: false
        }).then(function(){ 
            location.reload();
            btnEnviar.classList.add("ocultar")
            recuadro.classList.add("ocultar")
            form_before.classList.remove("ocultar")
            }
         );
    }
    
}