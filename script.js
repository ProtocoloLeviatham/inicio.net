// --- EJECUTAR CUANDO EL DOM ESTÉ LISTO ---
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DE LLUVIA BINARIA MORADA ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        // Fondo semi-transparente para crear el efecto de "estela"
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#90f'; // Color morado
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reiniciar la gota aleatoriamente o si se sale de la pantalla
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 40); // Ajusta la velocidad de la lluvia

    // --- LÓGICA DE PANTALLA DE CARGA ---
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const loadingStatus = document.getElementById('loading-status');
    const modalTerminos = document.getElementById('modal-terminos');
    let width = 0;

    const loadingMessages = [
        'Estableciendo conexión segura...',
        'Compilando módulos de defensa...',
        'Verificando integridad del sistema...',
        'Cargando protocolos éticos...',
        'Acceso concedido.'
    ];

    const loadInterval = setInterval(() => {
        width += Math.random() * 5; // Simula una carga irregular
        if (width >= 100) {
            width = 100;
            progressBar.style.width = width + '%';
            loadingStatus.textContent = loadingMessages[4];
            clearInterval(loadInterval);
            
            // Ocultar pantalla de carga y mostrar modal de términos
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                modalTerminos.style.display = 'flex';
            }, 500); // Espera medio segundo
        } else {
            progressBar.style.width = width + '%';
            if (width > 80 && loadingStatus.textContent !== loadingMessages[3]) loadingStatus.textContent = loadingMessages[3];
            else if (width > 50 && loadingStatus.textContent !== loadingMessages[2]) loadingStatus.textContent = loadingMessages[2];
            else if (width > 20 && loadingStatus.textContent !== loadingMessages[1]) loadingStatus.textContent = loadingMessages[1];
        }
    }, 150); // Velocidad de la barra de carga

    // --- LÓGICA DEL MODAL DE TÉRMINOS ---
    const btnAceptar = document.getElementById('btn-aceptar');
    const mainContent = document.getElementById('main-content');

    // La función 'checkScroll' se llama desde el atributo 'onscroll' en el HTML
    window.checkScroll = function(element) {
        // Se activa el botón solo si el scroll llega al final (con un pequeño margen)
        if (element.scrollTop + element.clientHeight >= element.scrollHeight - 20) {
            btnAceptar.disabled = false;
        }
    };

    // Al hacer clic en Aceptar
    btnAceptar.addEventListener('click', () => {
        modalTerminos.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.style.overflow = 'auto'; // Habilitar scroll en la página principal
    });

    // --- LÓGICA DEL ROTADOR DE CITAS ---
    const citaElement = document.getElementById('cita-codigo').querySelector('p');
    const citas = [
        "La curiosidad es el motor del hacker, pero la ética es su brújula.",
        "No rompas cosas. Rómpelas de forma constructiva para entenderlas y mejorarlas.",
        "Un sistema es tan fuerte como su eslabón más débil. Sé el que lo encuentra y lo reporta.",
        "El conocimiento es poder. Úsalo para proteger, no para destruir.",
        "Piensa como el atacante, actúa como el defensor."
    ];
    let citaIndex = 0;

    setInterval(() => {
        citaIndex = (citaIndex + 1) % citas.length;
        citaElement.textContent = `"${citas[citaIndex]}"`;
    }, 7000); // Cambia la cita cada 7 segundos

    // --- LÓGICA DEL MINI-PUZZLE ---
    const puzzleBtn = document.getElementById('puzzle-btn');
    const puzzleInput = document.getElementById('puzzle-input');
    const puzzleResult = document.getElementById('puzzle-result');

    puzzleBtn.addEventListener('click', () => {
        const respuesta = puzzleInput.value.toLowerCase().trim();
        const respuestasCorrectas = ['proteger', 'defender', 'ayudar', 'mejorar la seguridad', 'reportar vulnerabilidades'];

        // Comprobamos si la respuesta del usuario incluye alguna de las palabras clave
        if (respuestasCorrectas.some(r => respuesta.includes(r))) {
            puzzleResult.textContent = 'Acceso verificado. [PUZLE 1/3 COMPLETADO]';
            puzzleResult.style.color = '#0f0'; // Verde
        } else {
            puzzleResult.textContent = 'Intención no verificada. Reintenta.';
            puzzleResult.style.color = '#f00'; // Rojo
        }
    });

    // --- NUEVO: LISTENER PARA EL ENLACE DEL FOOTER ---
    document.getElementById('revisar-terminos').addEventListener('click', (e) => {
        e.preventDefault(); // Evitar que el link '#' mueva la página
        modalTerminos.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll de nuevo
        btnAceptar.disabled = true; // Re-deshabilitar el botón
        document.getElementById('terminos-texto').scrollTop = 0; // Reiniciar el scroll del modal
    });

});


