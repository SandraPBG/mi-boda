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





const fotosVestimenta = [
  "img/carrusel1.jpeg",
  "img/carrusel2.jpeg",
  "img/carrusel3.jpeg"
];

let fotoActual = 0;


/* ELEMENTOS */

const boton = document.getElementById("abrirVestimenta");
const lightbox = document.getElementById("lightboxVestimenta");
const cerrar = document.getElementById("cerrarVestimenta");
const imagen = document.getElementById("fotoVestimenta");
const anterior = document.getElementById("fotoAnterior");
const siguiente = document.getElementById("fotoSiguiente");
const indicadores = document.getElementById("indicadoresVestimenta");


/* CREAR INDICADORES */

fotosVestimenta.forEach((foto, indice) => {

  const punto = document.createElement("div");

  punto.className = "lightbox-punto";

  punto.addEventListener("click", () => {
    mostrarFoto(indice);
  });

  indicadores.appendChild(punto);

});


/* MOSTRAR FOTO */

function mostrarFoto(indice) {

  fotoActual = indice;

  imagen.src = fotosVestimenta[fotoActual];

  const puntos =
    document.querySelectorAll(".lightbox-punto");

  puntos.forEach((punto, i) => {

    punto.classList.toggle(
      "activo",
      i === fotoActual
    );

  });

}


/* ABRIR */

boton.addEventListener("click", () => {

  lightbox.classList.add("activo");

  mostrarFoto(0);

  document.body.style.overflow = "hidden";

});


/* CERRAR */

cerrar.addEventListener("click", () => {

  lightbox.classList.remove("activo");

  document.body.style.overflow = "";

});


/* ANTERIOR */

anterior.addEventListener("click", () => {

  fotoActual--;

  if (fotoActual < 0) {
    fotoActual = fotosVestimenta.length - 1;
  }

  mostrarFoto(fotoActual);

});


/* SIGUIENTE */

siguiente.addEventListener("click", () => {

  fotoActual++;

  if (fotoActual >= fotosVestimenta.length) {
    fotoActual = 0;
  }

  mostrarFoto(fotoActual);

});


/* CERRAR TOCANDO EL FONDO */

lightbox.addEventListener("click", (evento) => {

  if (evento.target === lightbox) {

    lightbox.classList.remove("activo");

    document.body.style.overflow = "";

  }

});


/* TECLADO */

document.addEventListener("keydown", (evento) => {

  if (!lightbox.classList.contains("activo")) {
    return;
  }

  if (evento.key === "Escape") {
    cerrar.click();
  }

  if (evento.key === "ArrowLeft") {
    anterior.click();
  }

  if (evento.key === "ArrowRight") {
    siguiente.click();
  }

});


/* DESLIZAR EN CELULAR */

let inicioX = 0;

lightbox.addEventListener("touchstart", (evento) => {

  inicioX = evento.touches[0].clientX;

});


lightbox.addEventListener("touchend", (evento) => {

  const finalX =
    evento.changedTouches[0].clientX;

  const diferencia = inicioX - finalX;


  if (diferencia > 50) {
    siguiente.click();
  }

  if (diferencia < -50) {
    anterior.click();
  }

});
