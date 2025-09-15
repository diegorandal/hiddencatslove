document.addEventListener('DOMContentLoaded', () => {
    const imagenPrincipal = document.getElementById('imagen-principal');
    const contadorGatosSpan = document.getElementById('contador-gatos');
    const totalGatosSpan = document.getElementById('total-gatos');
    const temporizadorSpan = document.getElementById('temporizador');
    const mensajeFinal = document.getElementById('mensaje-final');
    const tiempoFinalSpan = document.getElementById('tiempo-final');

    let gatosEncontrados = 0;
    let tiempoInicio;
    let temporizadorIntervalo;

    const gatos = [

    { id: 1, x: 1241, y: 275, width: 40, height: 40, encontrado: false, mensaje: "¡Mosha te amo!" },
    { id: 2, x: 940, y: 327, width: 30, height: 30, encontrado: false, mensaje: "¡MMM, ahi esta mosho!" },
    { id: 3, x: 1884, y: 428, width: 40, height: 40, encontrado: false, mensaje: "¡Te amo pri!" },
    { id: 4, x: 1850, y: 196, width: 40, height: 40, encontrado: false, mensaje: "¡Te extraño siempre!" },
    { id: 5, x: 116, y: 590, width: 40, height: 40, encontrado: false, mensaje: "¡Feliz aniversario!" },
    { id: 6, x: 391, y: 722, width: 40, height: 40, encontrado: false, mensaje: "¡Miau!" },
    { id: 7, x: 665, y: 594, width: 40, height: 40, encontrado: false, mensaje: "¡Mmmmm se!" },
    { id: 8, x: 779, y: 1008, width: 40, height: 40, encontrado: false, mensaje: "¡Por nosotros pri!" },
    { id: 9, x: 1257, y: 1072, width: 40, height: 40, encontrado: false, mensaje: "¡Siempre juntos!" },
    { id: 10, x: 1909, y: 1074, width: 40, height: 40, encontrado: false, mensaje: "¡Mosha la mas hermosa!" },
    { id: 11, x: 1416, y: 615, width: 40, height: 40, encontrado: false, mensaje: "[]<3[]" },


    ];

    totalGatosSpan.textContent = gatos.length;

    function iniciarTemporizador() {
        tiempoInicio = Date.now();
        temporizadorIntervalo = setInterval(() => {
            const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
            temporizadorSpan.textContent = `${tiempoTranscurrido}s`;
        }, 1000);
    }

    function detenerTemporizador() {
        clearInterval(temporizadorIntervalo);
    }

    function verificarGanador() {
        if (gatosEncontrados === gatos.length) {
            detenerTemporizador();
            mensajeFinal.classList.remove('oculto');
            tiempoFinalSpan.textContent = temporizadorSpan.textContent;
            imagenPrincipal.removeEventListener('click', manejarClic);
        }
    }

function crearMarcaEncontrado(gato, escalaX, escalaY) {
    const marca = document.createElement('div');
    marca.classList.add('gato-encontrado');
    
    // Asumiendo que gato.x y gato.y son el centro
    marca.style.left = `${(gato.x * escalaX) - ((gato.width * escalaX) / 2)}px`;
    marca.style.top = `${(gato.y * escalaY) - ((gato.height * escalaY) / 2)}px`;
    
    marca.style.width = `${gato.width * escalaX}px`;
    marca.style.height = `${gato.height * escalaY}px`;
    
    document.getElementById('imagen-marco').appendChild(marca);
}

    function manejarClic(evento) {
    const rect = imagenPrincipal.getBoundingClientRect();
    const clicX = evento.clientX - rect.left;
    const clicY = evento.clientY - rect.top;

    const anchoOriginal = imagenPrincipal.naturalWidth;
    const altoOriginal = imagenPrincipal.naturalHeight;
    const escalaX = rect.width / anchoOriginal;
    const escalaY = rect.height / altoOriginal;

    let encontrado = false;

    for (const gato of gatos) {
        
        if (!gato.encontrado) {
    // Las coordenadas ya son el centro, así que no las modificamos
    const gatoX = gato.x * escalaX;
    const gatoY = gato.y * escalaY;
    const gatoWidth = gato.width * escalaX;
    const gatoHeight = gato.height * escalaY;

    // Aquí calculamos los límites del área a partir del centro
    const limiteIzquierdo = gatoX - (gatoWidth / 2);
    const limiteDerecho = gatoX + (gatoWidth / 2);
    const limiteSuperior = gatoY - (gatoHeight / 2);
    const limiteInferior = gatoY + (gatoHeight / 2);

    // Detecta si el clic está dentro del área del gato
    if (clicX >= limiteIzquierdo && clicX <= limiteDerecho &&
        clicY >= limiteSuperior && clicY <= limiteInferior) {
        
        gato.encontrado = true;
        gatosEncontrados++;
        contadorGatosSpan.textContent = gatosEncontrados;
        crearMarcaEncontrado(gato, escalaX, escalaY);
        alert(gato.mensaje); 
        encontrado = true;
        break;
    }
}


    }
    
    if (encontrado) {
        verificarGanador();
    }
}

    imagenPrincipal.addEventListener('click', manejarClic);
    iniciarTemporizador();
});