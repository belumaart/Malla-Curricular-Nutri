const estructura = {
  "Primer Año": {
    "I Semestre": [
      "Curso Introductorio",
      "Bases Biológicas de la nutrición humana",
      "Química Alimentaria",
      "Fundamentos de la nutrición humana",
      "Metodología de las practicas articuladoras"
    ],
    "II Semestre": [
      "Bioquímica nutricional",
      "Normativa alimentaria",
      "Seguridad alimentaria nutricional y soberanía alimentaria",
      "Administración aplicada al ejercicio de la profesión",
      "Práctica articuladora I"
    ]
  },
  "Segundo Año": {
    "III Semestre": [
      "Diagnóstico y evaluación del estado nutricional",
      "Nutrición y alimentación en el ciclo de la vida",
      "Salud pública",
      "Bioestadística y métodos de investigación",
      "Práctica articuladora II"
    ],
    "IV Semestre": [
      "Producción e industrialización de alimentos",
      "Transformaciones físico- química de los alimentos",
      "Epidemiologia nutricional",
      "Educación en alimentación y nutrición Fundamentos y praxis",
      "Práctica articuladora III"
    ]
  },
  "Tercer Año": {
    "V Semestre": [
      "Ética de la alimentación",
      "Nutrición poblacional",
      "Diseño de alimentos",
      "Nutrición clínica I",
      "Práctica articuladora IV"
    ],
    "VI Semestre": [
      "Nutrición Clínica II",
      "Gestión de servicios de alimentación colectiva",
      "Práctica articuladora V"
    ]
  },
  "Cuarto Año": {
    "VII Semestre": [
      "Práctica profesional"
    ]
  }
};

let aprobadas = JSON.parse(localStorage.getItem("materias_aprobadas") || "[]");

function guardarEstado() {
  localStorage.setItem("materias_aprobadas", JSON.stringify(aprobadas));
}

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  // Primer grupo: Primer y Segundo Año pegados
  const grupo1 = document.createElement("div");
  grupo1.className = "anios-grupo";
  ["Primer Año", "Segundo Año"].forEach(anio => {
    grupo1.appendChild(crearAnio(anio));
  });
  contenedor.appendChild(grupo1);

  // Segundo grupo: Tercer y Cuarto Año pegados
  const grupo2 = document.createElement("div");
  grupo2.className = "anios-grupo";
  ["Tercer Año", "Cuarto Año"].forEach(anio => {
    grupo2.appendChild(crearAnio(anio));
  });
  contenedor.appendChild(grupo2);
}

function crearAnio(anio) {
  const divAnio = document.createElement("div");
  divAnio.className = "anio";

  const h2 = document.createElement("h2");
  h2.textContent = anio;
  divAnio.appendChild(h2);

  const divSemestres = document.createElement("div");
  divSemestres.className = "semestres";

  const semestres = estructura[anio];
  for (const [semestre, materias] of Object.entries(semestres)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const h3 = document.createElement("h3");
    h3.textContent = semestre;
    divSemestre.appendChild(h3);

    const contRamos = document.createElement("div");
    contRamos.className = "ramos";

    materias.forEach(nombre => {
      const id = nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, "");

      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.textContent = nombre;

      if (aprobadas.includes(id)) {
        divRamo.classList.add("aprobado");
      }

      divRamo.addEventListener("click", () => {
        if (aprobadas.includes(id)) {
          aprobadas = aprobadas.filter(x => x !== id);
        } else {
          aprobadas.push(id);
        }
        guardarEstado();
        crearMalla();
      });

      contRamos.appendChild(divRamo);
    });

    divSemestre.appendChild(contRamos);
    divSemestres.appendChild(divSemestre);
  }

  divAnio.appendChild(divSemestres);
  return divAnio;
}

crearMalla();
