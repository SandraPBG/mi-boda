const fechaObjetivo = new Date("April 24, 2027 17:00:00").getTime();

const intervalo = setInterval(function () {

    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    const dias = Math.floor(
        distancia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (distancia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (distancia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (distancia % (1000 * 60)) /
        1000
    );

    const stringDias = String(dias).padStart(3, "0");
    const stringHoras = String(horas).padStart(2, "0");
    const stringMinutos = String(minutos).padStart(2, "0");
    const stringSegundos = String(segundos).padStart(2, "0");

    const contador = document.getElementById("cuenta-regresiva");

    if (contador) {
        contador.innerHTML =
            `${stringDias} : ${stringHoras} : ${stringMinutos} : ${stringSegundos}`;
    }

    if (distancia < 0) {
        clearInterval(intervalo);

        if (contador) {
            contador.innerHTML = "000 : 00 : 00 : 00";
        }
    }

}, 1000);



/* LIGHTBOX - CÓDIGO DE VESTIMENTA */

const fotosVestimenta = [

  "img/carrusel1.jpeg",

  "img/carrusel2.jpeg",

  "img/carrusel3.jpeg"

];

let fotoActual = 0;

const abrirVestimenta =
  document.getElementById("abrirVestimenta");

const cerrarVestimenta =
  document.getElementById("cerrarVestimenta");

const lightboxVestimenta =
  document.getElementById("lightboxVestimenta");

const fotoVestimenta =
  document.getElementById("fotoVestimenta");

const fotoAnterior =
  document.getElementById("fotoAnterior");

const fotoSiguiente =
  document.getElementById("fotoSiguiente");

const indicadoresVestimenta =
  document.getElementById("indicadoresVestimenta");


/* CREAR INDICADORES */

fotosVestimenta.forEach((foto, indice) => {

  const punto =
    document.createElement("div");

  punto.classList.add(
    "lightbox-punto"
  );

  punto.addEventListener("click", () => {
    mostrarFoto(indice);
  });

  indicadoresVestimenta.appendChild(
    punto
  );
});


function mostrarFoto(
  indice,
  direccion = "derecha"
) {

  fotoActual = indice;

  fotoVestimenta.classList.remove(
    "foto-entrada-derecha",
    "foto-entrada-izquierda"
  );

  void fotoVestimenta.offsetWidth;

  fotoVestimenta.src =
    fotosVestimenta[fotoActual];


  if (direccion === "izquierda") {

    fotoVestimenta.classList.add(
      "foto-entrada-derecha"
    );

  } else {

    fotoVestimenta.classList.add(
      "foto-entrada-izquierda"
    );

  }

  const puntos =
    document.querySelectorAll(
      ".lightbox-punto"
    );

  puntos.forEach((punto, i) => {

    punto.classList.toggle(
      "activo",
      i === fotoActual
    );

  });
}



abrirVestimenta.addEventListener(
  "click",
  () => {

    lightboxVestimenta.classList.add(
      "activo"
    );

    mostrarFoto(
      0,
      "derecha"
    );


    document.body.style.overflow =
      "hidden";

  }
);

function cerrarLightbox() {

  lightboxVestimenta.classList.remove(
    "activo"
  );

  document.body.style.overflow =
    "";
}

cerrarVestimenta.addEventListener(
  "click",
  cerrarLightbox
);


fotoAnterior.addEventListener(
  "click",
  () => {

    fotoActual--;

    if (fotoActual < 0) {
      fotoActual =
        fotosVestimenta.length - 1;
    }

    mostrarFoto(
      fotoActual,
      "derecha"
    );

  }
);


fotoSiguiente.addEventListener(
  "click",
  () => {
    fotoActual++;
    if (
      fotoActual >=
      fotosVestimenta.length
    ) {
      fotoActual = 0;
    }
    mostrarFoto(
      fotoActual,
      "izquierda"
    );

  }
);


lightboxVestimenta.addEventListener(
  "click",
  (evento) => {

    if (
      evento.target ===
      lightboxVestimenta
    ) {
      cerrarLightbox();
    }
  }
);

document.addEventListener(
  "keydown",
  (evento) => {

    if (
      !lightboxVestimenta.classList.contains(
        "activo"
      )
    ) {
      return;
    }

    if (
      evento.key === "Escape"
    ) {

      cerrarLightbox();
    }

    if (
      evento.key === "ArrowLeft"
    ) {

      fotoAnterior.click();
    }

    if (
      evento.key === "ArrowRight"
    ) {
      fotoSiguiente.click();
    }

  }
);

let toqueInicialX = 0;

let toqueFinalX = 0;

lightboxVestimenta.addEventListener(
  "touchstart",
  (evento) => {

    toqueInicialX =
      evento.touches[0].clientX;

  },
  {
    passive: true
  }
);

lightboxVestimenta.addEventListener(
  "touchend",
  (evento) => {

    toqueFinalX =
      evento.changedTouches[0].clientX;

    const diferencia =
      toqueInicialX -
      toqueFinalX;

    if (diferencia > 50) {

      fotoSiguiente.click();
    }

    if (diferencia < -50) {

      fotoAnterior.click();
    }

  },
  {
    passive: true
  }
);
