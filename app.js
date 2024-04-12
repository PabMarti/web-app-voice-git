document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.getElementById('result');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Transcripción de voz:', transcript);

        if (transcript.includes('rita')) {
            procesarOrden(transcript);
        } else {
            resultDiv.innerHTML = '<p>No se ha detectado la palabra "Rita". Por favor, inténtalo de nuevo.</p>';
            recognition.start();
        }
    };

    recognition.onerror = function (event) {
        console.error('Error de reconocimiento de voz:', event.error);
        resultDiv.innerHTML = '<p>Error al procesar la orden de voz. Por favor, inténtalo de nuevo.</p>';
    };

    recognition.start();
});

function procesarOrden(transcript) {
    const resultDiv = document.getElementById('result');

    if (transcript.includes('abrir nueva pestaña')) {
        window.open('', '_blank');
        resultDiv.innerHTML = '<p>Nueva pestaña abierta.</p>';
    } else if (transcript.includes('ir a')) {
        let url = obtenerUrl(transcript);
        const términoBusqueda = encodeURIComponent(transcript.replace('rita ir a', '').trim());
        if (url.includes('.com')) {
            url =`https://www.${términoBusqueda}`;
            window.location.href = url;
            resultDiv.innerHTML = `<p>Redirigiendo a <strong>${url}</strong>.</p>`;
        } else {
            url = `https://www.google.com/search?q=${términoBusqueda}`;
            window.location.href = url;
            resultDiv.innerHTML = `<p>Realizando búsqueda en Google para <strong>${términoBusqueda}</strong>.</p>`;
        }
    } else if (transcript.includes('cerrar pestaña')) {
        window.close();
        resultDiv.innerHTML = '<p>Pestaña cerrada.</p>';
    } else if (transcript.includes('cerrar navegador')) {
        window.close();
        resultDiv.innerHTML = '<p>Navegador cerrado.</p>';
    } else if (transcript.includes('tamaño')) {
        const palabras = transcript.split(' ');
        const indexTamaño = palabras.indexOf('tamaño');

        const tamaño = parseInt(palabras[indexTamaño + 1]);

        if (!isNaN(tamaño)) {
            document.body.style.fontSize = tamaño + 'px';
            resultDiv.innerHTML = `<p>Tamaño de letra cambiado a <strong>${tamaño}px</strong>.</p>`;
        } else {
            resultDiv.innerHTML = '<p>Error: No se proporcionó un tamaño válido.</p>';
        }
    } else {
        resultDiv.innerHTML = '<p>Comando no reconocido.</p>';
    }

    // Continuar escuchando después de procesar una orden
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma a español
    recognition.start();
}

function obtenerUrl(transcript) {
    const palabras = transcript.split(' ');
    const indexIrA = palabras.indexOf('ir') + 1;
    return palabras.slice(indexIrA).join(' ');
}
