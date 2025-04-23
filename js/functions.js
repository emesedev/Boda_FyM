function reproducirAudio() {
    var audio = document.getElementById("audio");

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("envio").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Mostrar popup
            const popup = document.getElementById("popup-gracias");
            popup.style.display = "block";

            // Limpiar formulario
            form.reset();

            // Cerrar modal
            setTimeout(() => {
                document.getElementById("modal-toggle").checked = false;
                popup.style.display = "none";
            }, 3000);
        } else {
            alert("Hubo un error. Intenta de nuevo más tarde.");
        }
    }).catch(error => {
        alert("Hubo un problema con el envío. Inténtalo más tarde.");
        console.error(error);
    });
});

function enviarFormulario() {
    setTimeout(() => {
        const popup = document.getElementById("popup-gracias");
        popup.style.display = "block";

        document.getElementById("modal-toggle").checked = false;

        document.getElementById("envio").reset();

        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);
    }, 500);

    return true;
}