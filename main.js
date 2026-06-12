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
  var TITULO_CARTA = 'Mi amor, Mi vida';
  var TEXTO_CARTA = 'Sabes a veces me pregunto cuántas batallas has tenido que pelear en silencio. Cuántas lágrimas has tenido que esconder. Cuántas veces sonreíste cuando por dentro estabas cansada de todo, cuando estabas herida o simplemente deseando que alguien entendiera todo lo que llevabas dentro.\n\nY cada vez que pienso en eso, me duele, pero aun sigues aca y por eso te admiro amor.\n\nPorque detrás de esa sonrisa que tanto amo existe una historia que no fue nada fácil. Una niña que tuvo que aprender a ser fuerte cuando quizás solo necesitaba que la abrazaran y escucharan de verdad. Una mujer que ha seguido adelante incluso cuando la vida parecía empeñada en ponerle más peso sobre los hombros verdad...\n\nSé que hay heridas que todavía duelen. Sé que hay recuerdos que aún te acompañan. Sé que existen días en los que sientes que el mundo entero está en tu contra y que las cosas nunca terminan de salir como esperabas.\n\nPero aca me tienes amor. Y se que podremos salir adelante…\n\nY si pudiera pedir un deseo, no pediría riqueza, ni suerte.\nPediría paz para tu corazón.\nPediría que algún día puedas mirarte con los mismos ojos con los que yo te veo.\n\nVeo…\nVeo a una mujer hermosa, incluso en los días en los que ella no logra verlo.\nVeo a una persona llena de luz, aunque a veces sus propias sombras le impidan serlo.\nVeo a alguien que merece sentirse amada, elegida, cuidada y valorada cada día de su vida.\n\nY también quiero que sepas algo.\nNo amo solamente tus momentos felices.\nNo amo solamente tus sonrisas.\nTambién amo tus miedos.\nTus inseguridades.\nTus días difíciles.\nTus silencios.\nTus lágrimas.\nPorque todo eso también forma parte de ti.\nY te amo completa.\n\nY si honestamente si, me duele saber que hayas sufrido tanto. Me duele imaginar todas las veces que te sentiste sola, incomprendida o poco importante para las personas que debieron hacerte sentir especial.\n\nPero sabes también hay algo que me llena de esperanza.\nY es que tu historia todavía no ha terminado amor.\nTodavía quedan capítulos hermosos por escribir.\nTodavía quedan sueños por cumplir.\nTodavía quedan amaneceres que no has visto.\nTodavía existen abrazos que te esperan.\nTodavía existen motivos para volver a creer.\n\nY aunque no pueda prometerte una vida perfecta, sí puedo prometerte algo:\nMientras me permitas caminar a tu lado, intentaré recordarte quién eres cuando tú lo olvides, intentare ser eso que haga falta...\nIntentaré sostener tu mano cuando las fuerzas te falten.\nIntentaré celebrar tus alegrías y acompañarte en tus tristezas.\nIntentaré ser un lugar seguro para tu corazón.\nLo intentare amor…¡¡\n\nPorque eres una de las personas más importantes que han llegado a mi vida.\n\nY porque, después de todo lo que has vivido, deseo con toda mi alma que este nuevo año no sea el año en el que simplemente sobrevivas amor.\nDeseo que sea el año en el que vuelvas a sentir esa ilusión.\nEl año en el que empieces a creer un mucho más en ti.\nEl año en el que recibas una pequeña parte de todo el amor que mereces.\n\nFeliz cumpleaños, mi amor.\n\nGracias por existir.\nGracias por seguir luchando.\nGracias por permitirme conocerte.\nY gracias por ocupar un lugar tan importante dentro de mi corazón.\n\nTe amo hoy.\nTe amo en tus días buenos.\nTe amo en tus días difíciles.\nY seguiré amándote mientras la vida me permita hacerlo.\n\nCon todo mi amor,\nTu compañero de vida.';

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
    // Detiene la animacion de fuegos artificiales, pero la cancion 1 sigue sonando
    fireworksAnim.stop();

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

    // Lanza confeti inicial y lo repite mientras se escribe la carta
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      var confettiInterval = setInterval(function () {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1500);

      // Detiene el confeti repetido despues de un tiempo (cuando la carta termina de escribirse)
      setTimeout(function () {
        clearInterval(confettiInterval);
      }, 60000);
    }

    // Reproduce la segunda cancion
    // Detiene la cancion 1 y reproduce la cancion 2
    audio1.pause();
    audio1.currentTime = 0;

    audio2.currentTime = 0;
    audio2.play().catch(function (e) {
      console.log('No se pudo reproducir audio2 automáticamente:', e);
    });

    // Muestra la carta con efecto de aparicion
    carta.classList.add('mostrar');

    // Escribe el titulo y el texto poco a poco
    setTimeout(function () {
      escribirTexto(cartaTitulo, TITULO_CARTA, 80, function () {
        escribirTexto(cartaTexto, TEXTO_CARTA, 45);
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