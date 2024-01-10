const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


//------------------------ btn añadir y quitar (Y Total de productos)
let botonesCantidad = document.querySelectorAll(".btnCantidad")
let cantidadTotalProductos = document.querySelector("#cantidadTotal")
botonesCantidad.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        let h5Numero = document.querySelector(`#${e.target.dataset.idCantidad}`)
        let cantidadActual = h5Numero.innerText
        let containerProducto = e.target.closest('.producto')
        let textoProducto = containerProducto.querySelector(".textoProducto")
        if (e.target.dataset.accion == "menos") {
            if (cantidadActual > 0) {
                cantidadActual = parseInt(cantidadActual) - 1
                //-----------------------Contador de productos (-)
                cantidadTotalProductos.innerText = parseInt(cantidadTotalProductos.innerText) - 1
            }
        } else {
            cantidadActual = parseInt(cantidadActual) + 1
            //-----------------------Contador de productos (+)
            cantidadTotalProductos.innerText = parseInt(cantidadTotalProductos.innerText) + 1
        }
        h5Numero.innerHTML = cantidadActual
        calcularPrecioTotal();

        if (cantidadActual == 0) {
            textoProducto.innerHTML = `<h5 class="text-decoration-line-through">${textoProducto.innerText}</h5>`
        } else {
            textoProducto.innerHTML = textoProducto.innerText
        }
    })

})

// ----------------------btn (X) eliminar producto

let botonEliminarPoducto = document.querySelectorAll(".botonQuitar")
botonEliminarPoducto.forEach((botonX) => {
    botonX.addEventListener("click", (e) => {
        let divProducto = document.querySelector(`#${e.target.dataset.idQuitar}`)
        if (divProducto) {
            divProducto.remove()
            let divsRestantes = document.querySelectorAll(".producto")
            if (divsRestantes.length === 0) {
                document.querySelector("#cajaProductos").innerHTML = '<h2 class="mt-3">No hay productos en el carrito</h2>'
                calcularPrecioTotal();
            }
        }
    })

})

// ----------------------btn borrar todo
document.querySelector("#btnBorrarTodo").addEventListener('click', () => {
    Swal.fire({
        title: "Esta seguro?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, vaciar carrito",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector("#cajaProductos").innerHTML = '<h2 class="mt-3">No hay productos en el carrito</h2>'
            cantidadTotalProductos.innerText = 0
            calcularPrecioTotal();
            Swal.fire({
                title: "Eliminado",
                icon: "success"
            })
        }
    })

})


//----------------- precio total y descuento
function calcularPrecioTotal() {
    let precioTotal = document.querySelector("#precioTotal")
    let productos = document.querySelectorAll(".producto")
    let precioTotalCalc = 0
    productos.forEach((producto) => {
        let cantidad = parseInt(producto.querySelector(".cantidad").innerText)
        let precio = producto.querySelector(".precio").innerText
        precio = precio.split("$")
        precio = parseInt(precio[1]);
        precioTotalCalc = (precio * cantidad) + precioTotalCalc
        precioTotal.innerHTML = `$ ${precioTotalCalc}`
    });
}

// ------------------- Metodo de pago
let btnPagar = document.querySelector(".btnPagar").addEventListener("click", (e) => {
    let pagoContraEntrega = document.querySelector("#pagoContraentrega")
    let pagoTransferencia = document.querySelector("#pagoTransferencia")
    let pagoTC = document.querySelector("#pagoTC")

    if (pagoContraEntrega.checked) {
        $('#ModalPagoContraentrega').modal('show')
    } else if (pagoTransferencia.checked) {
        window.location.href = "https://portalpagos.davivienda.com/#/"
    } else if (pagoTC.checked) {
        $('#ModalPagoTC').modal('show')
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Selecciona un metodo de pago",
          });
    }
})









