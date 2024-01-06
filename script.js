document.addEventListener('DOMContentLoaded', function () {
    iniciarJuego();
  });
  
  function iniciarJuego() {
    const gameContainer = document.getElementById('game-container');
    mostrarMensaje(gameContainer, " ¿Ya pensaste tu número?", true, function (respuestaPrimeraPregunta) {
      if (respuestaPrimeraPregunta) {
        let min = 1;
        let max = 100;
  
        adivinarNumero(min, max, gameContainer);
      } else {
        mostrarMensaje(gameContainer, "¡Piensa en un número del 1 al 100!", false, function () {
          iniciarJuego(); // Reiniciar el juego
        });
      }
    });
  }
  
  function adivinarNumero(min, max, container) {
    let guess;
  
    function realizarAccion(respuestaUsuario) {
        if (respuestaUsuario) {
            mostrarMensaje(container, `¡Excelente! Tu número es ${guess}. ¿Quieres volver a jugar? `, true, function (quiereVolver) {
                if (quiereVolver) {
                    iniciarJuego();
                } else {
                    mostrarMensajeSimple(container, '¡Gracias por jugar! Hasta luego.');

                }
            });
        } else {
            mostrarMensaje(container, `Es tu numero menor a ${guess}?`, true, function (esMayor) {
                if (esMayor) {
                    max = guess - 1;
                    realizarSiguienteAccion();
                } else {
                    min = guess + 1;
                    realizarSiguienteAccion();
                }
            });
        }
    }
    
  
    function realizarSiguienteAccion() {
      if (min <= max) {
        guess = Math.floor((min + max) / 2);
        mostrarMensaje(container, `¿Tu número es ${guess}?`, true, realizarAccion);
      }
    }
  
    realizarSiguienteAccion();
  }
  
  function mostrarMensaje(container, mensaje, esConfirm, callback) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    container.innerHTML = '';
    container.appendChild(mensajeElement);
  
    const botonSi = document.createElement('button');
    botonSi.textContent = 'Sí';
    botonSi.classList.add('btn', 'btn-primary', 'bn5', 'btn-lg', 'mr-2', 'custom-class');
    botonSi.addEventListener('click', function () {
      limpiarMensajes(container, mensajeElement, botonSi, botonNo);
      callback(true);
    });
  
    const botonNo = document.createElement('button');
    botonNo.textContent = 'No';
    botonNo.classList.add('btn', 'btn-primary', 'bn5', 'btn-lg', 'mr-2', 'custom-class');
    botonNo.addEventListener('click', function () {
      limpiarMensajes(container, mensajeElement, botonSi, botonNo);
      callback(false);
    });
  
    container.appendChild(botonSi);
    container.appendChild(botonNo);
  }

  function mostrarMensajeSimple(container, mensaje) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    container.innerHTML = '';
    container.appendChild(mensajeElement);
    console.log(mensaje);
  }
  
  function limpiarMensajes(container, ...elements) {
    elements.forEach(function (element) {
      container.removeChild(element);
    });
  }
  