// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('result');

    // Comprobar si el navegador admite la API de reconocimiento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        // Definir configuraciones del reconocimiento de voz
        recognition.lang = 'es-ES'; // Configurar el idioma a español

        // Escuchar cuando se haya detectado un resultado
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Transcripción de voz:', transcript);
            
            // Aquí deberías agregar tu lógica para identificar la orden específica
            // Por ahora, simplemente mostramos la transcripción en la interfaz
            resultDiv.innerHTML = `<p>Orden detectada: <strong>${transcript}</strong></p>`;
        };

        // Escuchar errores
        recognition.onerror = function(event) {
            console.error('Error de reconocimiento de voz:', event.error);
            resultDiv.innerHTML = '<p>Error al procesar la orden de voz. Por favor, inténtalo de nuevo.</p>';
        };

        // Iniciar el reconocimiento de voz cuando se haga clic en cualquier parte del documento
        document.body.addEventListener('click', function() {
            recognition.start();
            resultDiv.innerHTML = '<p>Escuchando... Di tu orden.</p>';
        });
    } else {
        // Si el navegador no admite la API de reconocimiento de voz, mostrar un mensaje de error
        resultDiv.innerHTML = '<p>Tu navegador no admite la API de reconocimiento de voz. Por favor, actualízalo a una versión más reciente.</p>';
    }
});
