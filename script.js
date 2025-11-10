// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lluvia Binaria (Canvas) ---
    const canvas = document.getElementById('binary-rain');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let purpleMatrix = "01"; // Puedes agregar más caracteres si quieres
    purpleMatrix = purpleMatrix.split("");

    const font_size = 14;
    const columns = canvas.width / font_size;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawBinaryRain() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#800080"; // Color Morado
        ctx.font = font_size + "px arial";

        for (let i = 0; i < drops.length; i++) {
            const text = purpleMatrix[Math.floor(Math.random() * purpleMatrix.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);

            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawBinaryRain, 40);

    // --- 2. Lógica de Carga y Modal ---
    const loader = document.getElementById('loader');
    const modal = document.getElementById('modal-terminos');
    const mainContent = document.getElementById('main-content');
    const terminosTexto = document.getElementById('terminos-texto');
    const btnAceptar = document.getElementById('btn-aceptar');
    const loaderStatus = document.getElementById('loader-status');

    // Simulación de carga
    setTimeout(() => { loaderStatus.textContent = "Accediendo a registros..."; }, 1000);
    setTimeout(() => { loaderStatus.textContent = "Interfaz lista. Esperando confirmación..."; }, 2500);

    // Cuando la barra de carga termina (3s)
    setTimeout(() => {
        loader.style.display = 'none'; // Oculta el loader
        modal.style.display = 'flex'; // Muestra el modal
    }, 3000);

    // Habilitar botón al hacer scroll
    terminosTexto.addEventListener('scroll', () => {
        // Comprueba si el usuario llegó al final (con un margen de 10px)
        if (terminosTexto.scrollTop + terminosTexto.clientHeight >= terminosTexto.scrollHeight - 10) {
            btnAceptar.disabled = false;
        }
    });

    // Al aceptar los términos
    btnAceptar.addEventListener('click', () => {
        modal.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.classList.add('loaded'); // Permite el scroll en el body
    });

    // --- 3. Rotador de Citas ---
    const citas = [
        "La curiosidad es el motor del hacker ético. La ética es su brújula.",
        "Piensa defensivamente. Actúa éticamente.",
        "No hay seguridad absoluta, solo grados de inseguridad.",
        "Un sistema solo es tan fuerte como su eslabón más débil.",
        "El conocimiento es poder, pero el carácter es respeto."
    ];
    let citaIndex = 0;
    const citaElemento = document.getElementById('cita-texto');

    setInterval(() => {
        citaIndex = (citaIndex + 1) % citas.length;
        citaElemento.textContent = `"${citas[citaIndex]}"`;
    }, 5000); // Cambia la cita cada 5 segundos

    // --- 4. Mini-Secreto (Puzzle) ---
    const btnPuzzle = document.getElementById('btn-puzzle');
    const puzzleResult = document.getElementById('puzzle-result');

    btnPuzzle.addEventListener('click', () => {
        const respuesta = prompt("Descifra el código: 'UHJvdG9jb2xvTGV2aWF0aGFt'\n(Pista: Es un formato de codificación común)");
        
        // La respuesta es "ProtocoloLeviatham" (Base64)
        if (respuesta && respuesta.toLowerCase() === "protocololeviatham") {
            puzzleResult.textContent = "[+] Acertijo resuelto. (1/3 Completado)";
            puzzleResult.style.color = "#0f0";
        } else {
            puzzleResult.textContent = "[-] Intento fallido. Sigue intentando.";
            puzzleResult.style.color = "red";
        }
    });

});


