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
