document.addEventListener("DOMContentLoaded", function () {

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const total = localStorage.getItem('total') || 0;
    const totalNumerico = parseFloat(total) || 0;
    const totalFormateado = totalNumerico.toFixed(2);

    const resumenDiv = document.getElementById("detalle");

    let resumenTextoHTML = "<h3>Resumen de tu Compra:</h3><br>";

    for (let i = 0; i < productos.length; i++) {
        const productoActual = productos[i];
        resumenTextoHTML += `- ${productoActual.modelo}--${productoActual.nombre}: $${parseFloat(productoActual.precio).toFixed(2)}<br>`;
    }

    resumenTextoHTML += `<br><strong>Total a pagar: $${totalFormateado}</strong>`;
    resumenDiv.innerHTML = resumenTextoHTML;

    function enviarFormulario(event) {
        
        const nombreContacto = document.getElementById('nombre').value.trim();
        const emailContacto = document.getElementById('contactoEmail').value.trim();
        const telefonoContacto = document.getElementById('telefono').value.trim();

        if (!nombreContacto || !emailContacto) {
            alert("Por favor, completa con tu nombre completo y un email antes de enviar.");
            return;
        }

        let detallesCarritoParaEnvio = '';
        for (let i = 0; i < productos.length; i++) {
            const productoActual = productos[i];
            detallesCarritoParaEnvio += `${productoActual.nombre} - $${parseFloat(productoActual.precio).toFixed(2)}\n`;
        }

        document.getElementById('carritoData').value = detallesCarritoParaEnvio;
        document.getElementById('totalCarrito').value = `$${totalFormateado}`;

        // Enviar el formulario
        document.getElementById('formulario').submit();
        if (botonEnviar) {
            localStorage.removeItem("carrito");
            localStorage.clear()
        }

    }
    const botonEnviar = document.getElementById('botonEnviar');

    botonEnviar.addEventListener('click', function () {
        enviarFormulario();
        
    })
   



});
 