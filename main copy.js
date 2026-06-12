// ===== Controlador principal de la sorpresa =====

document.addEventListener('DOMContentLoaded', function () {

  var pantallaInicio = document.getElementById('pantalla-inicio');
  var pantallaCumple = document.getElementById('pantalla-cumple');
  var pantallaRegalo = document.getElementById('pantalla-regalo');

  var btnTodo = document.getElementById('btn-todo');
  var btnSiguiente = document.getElementById('btn-siguiente');

  var audio1 = document.getElementById('audio1');
  var audio2 = document.getElementById('audio2');

  var regaloClick = document.getElementById('regalo-click');
  var regaloCerrado = document.getElementById('regalo-cerrado');
  var regaloAbierto = document.getElementById('regalo-abierto');
  var textoInstruccion = document.getElementById('texto-instruccion');
  var carta = document.getElementById('carta');
  var cartaTitulo = document.getElementById('carta-titulo');
  var cartaTexto = document.getElementById('carta-texto');

  var regaloAbiertoFlag = false;

  // ===== TEXTO DE LA CARTA =====
  // Puedes editar libremente el titulo y el contenido de la carta aqui.
  var TITULO_CARTA = '¡Feliz cumpleaños, mi amor! ♥';
  var TEXTO_CARTA = 'Hoy quiero celebrarte a ti, a tu sonrisa y a todo lo que llenas mi vida de color.\n\nGracias por cada momento juntos, por tu paciencia y tu cariño. Espero que este día sea tan especial como tú lo eres para mí.\n\nTe amo mucho. ¡Feliz cumpleaños! ♥';

  // ===== FUNCION: cambiar de pantalla =====
  function mostrarPantalla(pantalla) {
    var pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(function (p) {
      p.classList.remove('activa');
    });
    pantalla.classList.add('activa');
  }

  // ===== PASO 1: Boton "Presiona aquí" =====
  btnTodo.addEventListener('click', function () {
    mostrarPantalla(pantallaCumple);

    // Inicia animacion de fuegos artificiales
    fireworksAnim.start();

    // Reproduce la primera cancion
    audio1.currentTime = 0;
    audio1.play().catch(function (e) {
      console.log('No se pudo reproducir audio1 automáticamente:', e);
    });
  });

  // ===== PASO 2: Boton "Siguiente" -> va a la pantalla del regalo =====
  btnSiguiente.addEventListener('click', function () {
    // Detiene la animacion de fuegos artificiales y la primera cancion
    fireworksAnim.stop();
    audio1.pause();
    audio1.currentTime = 0;

    mostrarPantalla(pantallaRegalo);
  });

  // ===== PASO 3: Click en el regalo -> abre el regalo, suena cancion 2 y muestra la carta =====
  regaloClick.addEventListener('click', function () {
    if (regaloAbiertoFlag) return;
    regaloAbiertoFlag = true;

    // Cambia la imagen del regalo
    regaloCerrado.style.display = 'none';
    regaloAbierto.style.display = 'block';

    // Oculta el texto de instruccion
    textoInstruccion.style.display = 'none';

    // Lanza confeti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Reproduce la segunda cancion
    audio2.currentTime = 0;
    audio2.play().catch(function (e) {
      console.log('No se pudo reproducir audio2 automáticamente:', e);
    });

    // Muestra la carta con efecto de aparicion
    carta.classList.add('mostrar');

    // Escribe el titulo y el texto poco a poco
    setTimeout(function () {
      escribirTexto(cartaTitulo, TITULO_CARTA, 60, function () {
        escribirTexto(cartaTexto, TEXTO_CARTA, 30);
      });
    }, 500);
  });

  // ===== FUNCION: efecto de escritura letra por letra =====
  function escribirTexto(elemento, texto, velocidad, callback) {
    elemento.textContent = '';
    elemento.classList.add('cursor-escritura');

    var i = 0;

    function escribir() {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        setTimeout(escribir, velocidad);
      } else {
        elemento.classList.remove('cursor-escritura');
        if (typeof callback === 'function') callback();
      }
    }

    escribir();
  }

});