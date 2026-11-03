// ================= Modal del video =================
// Pega aquí la URL de "insertar" (embed) de tu video. Ej: https://www.youtube.com/embed/ID_DEL_VIDEO
const VIDEO_URL = "";

const modal = document.getElementById("modal");
const btnAbrir = document.getElementById("btn-abrir-modal");
const btnCerrar = document.getElementById("btn-cerrar-modal");
const videoBox = document.getElementById("video-contenedor");

function abrirModal() {
    if (VIDEO_URL) {
        // El iframe se crea al abrir: así el video no se carga hasta que se necesita
        videoBox.innerHTML = `<iframe src="${VIDEO_URL}" title="Tutorial" allowfullscreen></iframe>`;
    } else {
        videoBox.textContent = "Aquí irá tu video. Define VIDEO_URL en scripts.js.";
    }
    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");
    btnCerrar.focus();
}

function cerrarModal() {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
    videoBox.innerHTML = ""; // al quitar el iframe el video se detiene
    btnAbrir.focus();
}

btnAbrir.addEventListener("click", abrirModal);
btnCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal(); // clic en el fondo oscuro
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("abierto")) cerrarModal();
});

// ================= Simulador de cotización =================
const simServicio = document.getElementById("sim-servicio");
const simSecciones = document.getElementById("sim-secciones");
const simUrgente = document.getElementById("sim-urgente");
const simTotal = document.getElementById("sim-total");
const simError = document.getElementById("sim-error");

const PRECIO_POR_SECCION = 150;

function calcular() {
    const base = Number(simServicio.value);
    const cantidad = Number(simSecciones.value);

    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 50) {
        simError.textContent = "Ingresa una cantidad entera entre 1 y 50.";
        simTotal.textContent = "Q0.00";
        return;
    }
    simError.textContent = "";

    let total = base + cantidad * PRECIO_POR_SECCION;
    if (simUrgente.checked) total *= 1.2;

    simTotal.textContent = "Q" + total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

document.getElementById("form-simulador").addEventListener("submit", (e) => e.preventDefault());
[simServicio, simSecciones, simUrgente].forEach((el) => {
    el.addEventListener("input", calcular);
    el.addEventListener("change", calcular);
});
calcular();

// ================= Pestañas =================
const tabs = document.querySelectorAll(".tab");
const paneles = document.querySelectorAll(".panel");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => {
            t.classList.remove("activa");
            t.setAttribute("aria-selected", "false");
        });
        paneles.forEach((p) => p.classList.remove("activo"));

        tab.classList.add("activa");
        tab.setAttribute("aria-selected", "true");
        document.getElementById("panel-" + tab.dataset.tab).classList.add("activo");
    });
});

// ================= Formulario de contacto =================
const formContacto = document.getElementById("form-contacto");
const exito = document.getElementById("c-exito");

function mostrarError(id, mensaje) {
    document.querySelector(`[data-error-for="${id}"]`).textContent = mensaje;
    document.getElementById(id).classList.toggle("invalido", Boolean(mensaje));
}

formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    exito.textContent = "";

    const nombre = document.getElementById("c-nombre").value.trim();
    const correo = document.getElementById("c-correo").value.trim();
    const mensaje = document.getElementById("c-mensaje").value.trim();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    mostrarError("c-nombre", nombre.length < 2 ? "Escribe tu nombre (mínimo 2 letras)." : "");
    mostrarError("c-correo", correoValido ? "" : "Escribe un correo válido.");
    mostrarError("c-mensaje", mensaje.length < 10 ? "El mensaje debe tener al menos 10 caracteres." : "");

    if (nombre.length >= 2 && correoValido && mensaje.length >= 10) {
        exito.textContent = `¡Gracias, ${nombre}! Recibimos tu mensaje.`;
        formContacto.reset();
    }
});
