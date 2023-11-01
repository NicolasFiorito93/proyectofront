const CATEGORIA = document.getElementById('categoria');
const CANTIDAD = document.getElementById('cantidad');
const VALOR = 200;

const NOMBRE = document.getElementById('nombre');
const APELLIDO = document.getElementById('apellido');
const CORREO = document.getElementById('correo');

const RESUMEN = document.getElementById('btnResumen');
const MODAL = document.getElementById('modal');
const MODIFICAR = document.getElementById('btn-modificar');
const BORRAR = document.getElementById('btn-borrar');

let persona = new Object();

function calcularTotal() {
  persona.cantidadTickets = CANTIDAD.value;
  let total = 0;
  switch (CATEGORIA.value) {
    case '0':
      total = CANTIDAD.value * VALOR;
      persona.categoria = 'Sin categoría';
      break;
    case '1':
      total = CANTIDAD.value * (VALOR * 0.2);
      persona.categoria = 'Estudiante';
      break;
    case '2':
      total = CANTIDAD.value * (VALOR * 0.5);
      persona.categoria = 'Trainee';
      break;
    case '3':
      total = CANTIDAD.value * (VALOR * 0.85);
      persona.categoria = 'Junior';
      break;
  }
  if (CANTIDAD.value < 1) {
    CANTIDAD.classList.add('is-invalid');
    document.getElementById('totalCompra').innerText = ' ';
    return false;
  } else {
    CANTIDAD.classList.remove('is-invalid');
    CANTIDAD.classList.add('is-valid');
    document.getElementById('totalCompra').innerText = total;
    document.getElementById('totalResumen').innerText = total;
    return true;
  }
}

function validarCorreo() {
  persona.correo = CORREO.value;
  let correoExReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (correoExReg.test(CORREO.value)) {
    CORREO.classList.remove('is-invalid');
    CORREO.classList.add('is-valid');
    return true;
  } else {
    CORREO.classList.add('is-invalid');
    return false;
  }
}

function validarNombre(DATO) {
  let nombreExReg = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  if (nombreExReg.test(DATO.value) && DATO.value.length >= 2) {
    DATO.classList.remove('is-invalid');
    DATO.classList.add('is-valid');
    return true;
  } else {
    DATO.classList.add('is-invalid');
    return false;
  }
}

CANTIDAD.addEventListener('input', calcularTotal);
CATEGORIA.addEventListener('input', calcularTotal);
CORREO.addEventListener('input', validarCorreo);
NOMBRE.addEventListener('input', function () {
  validarNombre(NOMBRE);
  persona.nombre = NOMBRE.value;
});
APELLIDO.addEventListener('input', function () {
  validarNombre(APELLIDO);
  persona.apellido = APELLIDO.value;
})

RESUMEN.addEventListener('click', () => {
  if (validarCorreo() && validarNombre(NOMBRE) && validarNombre(APELLIDO) && calcularTotal()) {
    document.getElementById('nombreResumen').innerText = persona.nombre + " " + persona.apellido;
    document.getElementById('correoResumen').innerText = persona.correo;
    document.getElementById('categoriaResumen').innerHTML = persona.categoria;
    document.getElementById('cantidadResumen').innerText = persona.cantidadTickets;
    MODAL.showModal();
  }
  if (persona.nombre === undefined) {
    NOMBRE.classList.add('is-invalid');
  }
  if (persona.apellido === undefined) {
    APELLIDO.classList.add('is-invalid');
  }
  if (persona.cantidadTickets === undefined) {
    CANTIDAD.classList.add('is-invalid');
  }
});

MODIFICAR.addEventListener('click', () => {
  MODAL.close();
});

BORRAR.addEventListener('click', () => {
  delete persona.nombre;
  delete persona.apellido;
  delete persona.cantidadTickets;
  delete persona.correo;
  NOMBRE.classList.remove('is-invalid');
  NOMBRE.classList.remove('is-valid');
  APELLIDO.classList.remove('is-invalid');
  APELLIDO.classList.remove('is-valid');
  CORREO.classList.remove('is-invalid');
  CORREO.classList.remove('is-valid');
  CANTIDAD.classList.remove('is-invalid');
  CANTIDAD.classList.remove('is-valid');
});