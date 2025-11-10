document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lluvia de Errores (Canvas Rojo) ---
    const canvas = document.getElementById('error-rain');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres para la lluvia de errores
    let matrix = "404ERROR"; 
    matrix = matrix.split("");

    const font_size = 14;
    const columns = canvas.width / font_size;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawErrorRain() {
        // Fondo negro semitransparente para el efecto de desvanecimiento
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#f00"; // Color Rojo
        ctx.font = font_size + "px arial";

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    // Iniciar la animación
    setInterval(drawErrorRain, 40);

    // --- 2. Lógica de Carga y Modal ---
    const loader = document.getElementById('loader');
    const modal = document.getElementById('modal-terminos');
    const mainContent = document.getElementById('main-content');
    const terminosTexto = document.getElementById('terminos-texto');
    const btnAceptar = document.getElementById('btn-aceptar');
    const loaderStatus = document.getElementById('loader-status');

    // Simulación de carga
    setTimeout(() => { loaderStatus.textContent = "Accediendo a registros... [AUTH_FAIL]"; }, 1000);
    setTimeout(() => { loaderStatus.textContent = "Interfaz lista. Esperando confirmación de Usuario..."; }, 2500);

    // Cuando la barra de carga termina (3s)
    setTimeout(() => {
        loader.style.display = 'none';
        modal.style.display = 'flex';
    }, 3000);

    // Habilitar botón al hacer scroll
    terminosTexto.addEventListener('scroll', () => {
        if (terminosTexto.scrollTop + terminosTexto.clientHeight >= terminosTexto.scrollHeight - 10) {
            btnAceptar.disabled = false;
        }
    });

    // Al aceptar los términos
    btnAceptar.addEventListener('click', () => {
        modal.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.classList.add('loaded');
    });

    // --- 3. Rotador de Citas (Más citas) ---
    const citas = [
        "La curiosidad es el motor del hacker ético. La ética es su brújula.",
        "Piensa defensivamente. Actúa éticamente.",
        "No hay seguridad absoluta, solo grados de inseguridad.",
        "Un sistema solo es tan fuerte como su eslabón más débil.",
        "El conocimiento es poder, pero el carácter es respeto.",
        "Para construir un muro, debes saber cómo piensa el que quiere derribarlo.",
        "La mejor defensa es una buena... auditoría.",
        "No rompas cosas. Rómpelas en un entorno de prueba y luego arréglalas."
    ];
    let citaIndex = 0;
    const citaElemento = document.getElementById('cita-texto');

    setInterval(() => {
        citaIndex = (citaIndex + 1) % citas.length;
        citaElemento.textContent = `"${citas[citaIndex]}"`;
    }, 5000); // Cambia la cita cada 5 segundos

    // --- 4. Mini-Secreto (Puzzle Hexadecimal) ---
    const btnPuzzle = document.getElementById('btn-puzzle');
    const puzzleResult = document.getElementById('puzzle-result');

    btnPuzzle.addEventListener('click', () => {
        const respuesta = prompt("Decodifica el fragmento (Hex a ASCII): \n4c 65 76 69 61 74 68 61 6d");
        
        // La respuesta es "Leviatham"
        if (respuesta && respuesta.toLowerCase() === "leviatham") {
            puzzleResult.textContent = "[+] Decodificación correcta. (1/3 Completado)";
            puzzleResult.style.color = "#f00"; // Rojo
        } else {
            puzzleResult.textContent = "[-] Fallo en la decodificación. Intento nulo.";
            puzzleResult.style.color = "#888"; // Gris
        }
    });

});
