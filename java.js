let encuestas = [];
let preguntasActuales = [];

function agregarPregunta() {
    let pregunta = document.getElementById("pregunta").value;
    if (pregunta) {
        preguntasActuales.push(pregunta);
        document.getElementById("pregunta").value = '';
        actualizarListaPreguntas();
    }
}

function actualizarListaPreguntas() {
    let lista = document.getElementById("listaPreguntas");
    lista.innerHTML = '';
    preguntasActuales.forEach((pregunta, index) => {
        let li = document.createElement("li");
        li.innerText = pregunta;
        lista.appendChild(li);
    });
}

function guardarEncuesta() {
    let titulo = document.getElementById("tituloEncuesta").value;
    if (titulo && preguntasActuales.length > 0) {
        encuestas.push({ titulo: titulo, preguntas: preguntasActuales, respuestas: [] });
        preguntasActuales = [];
        actualizarListaPreguntas();
        document.getElementById("tituloEncuesta").value = '';
        actualizarSelectorEncuestas();
        guardarEncuestasEnJSON();
    }
}

function actualizarSelectorEncuestas() {
    let selector = document.getElementById("seleccionarEncuesta");
    let selectorAnalisis = document.getElementById("seleccionarEncuestaAnalisis");
    selector.innerHTML = '';
    selectorAnalisis.innerHTML = '';
    encuestas.forEach((encuesta, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.innerText = encuesta.titulo;
        selector.appendChild(option);

        let optionAnalisis = document.createElement("option");
        optionAnalisis.value = index;
        optionAnalisis.innerText = encuesta.titulo;
        selectorAnalisis.appendChild(optionAnalisis);
    });
}

function cargarEncuesta() {
    let index = document.getElementById("seleccionarEncuesta").value;
    let encuesta = encuestas[index];
    let divPreguntas = document.getElementById("preguntasEncuesta");
    divPreguntas.innerHTML = '';
    encuesta.preguntas.forEach((pregunta, idx) => {
        let p = document.createElement("p");
        p.innerText = pregunta;
        let input = document.createElement("input");
        input.type = "text";
        input.id = "respuesta_" + idx;
        divPreguntas.appendChild(p);
        divPreguntas.appendChild(input);
    });
}

function enviarRespuestas() {
    let index = document.getElementById("seleccionarEncuesta").value;
    let encuesta = encuestas[index];
    let respuestas = [];
    encuesta.preguntas.forEach((pregunta, idx) => {
        let respuesta = document.getElementById("respuesta_" + idx).value;
        respuestas.push(respuesta);
    });
    encuesta.respuestas.push(respuestas);
    guardarEncuestasEnJSON();
}

function analizarEncuesta() {
    let index = document.getElementById("seleccionarEncuestaAnalisis").value;
    let encuesta = encuestas[index];
    let resultados = document.getElementById("resultadosAnalisis");
    resultados.innerHTML = '';
    encuesta.preguntas.forEach((pregunta, idx) => {
        let p = document.createElement("p");
        p.innerText = "Pregunta: " + pregunta;
        resultados.appendChild(p);
        let ul = document.createElement("ul");
        let respuestas = {};
        encuesta.respuestas.forEach((respuesta) => {
            let resp = respuesta[idx];
            if (respuestas[resp]) {
                respuestas[resp]++;
            } else {
                respuestas[resp] = 1;
            }
        });
        for (let [respuesta, count] of Object.entries(respuestas)) {
            let li = document.createElement("li");
            li.innerText = `${respuesta}: ${count} respuestas`;
            ul.appendChild(li);
        }
        resultados.appendChild(ul);
    });
}

function guardarEncuestasEnJSON() {
    localStorage.setItem('encuestas', JSON.stringify(encuestas));
}

function cargarEncuestasDeJSON() {
    let encuestasGuardadas = localStorage.getItem('encuestas');
    if (encuestasGuardadas) {
        encuestas = JSON.parse(encuestasGuardadas);
        actualizarSelectorEncuestas();
    }
}

window.onload = cargarEncuestasDeJSON;
