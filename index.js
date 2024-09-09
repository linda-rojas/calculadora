const buttonSuma = document.querySelector("#button-suma");
const buttonResta = document.querySelector("#button-resta");
const buttonMultiplicacion = document.querySelector("#button-multiplicacion");
const buttonDivision = document.querySelector("#button-division");

const formOperation = document.querySelector("#form-operation");
const input1 = document.querySelector("#input-1");
const input2 = document.querySelector("#input-2");
const btnResultado = document.querySelector("#btn-result");
const paragraphResult = document.querySelector("#paragraph-result");
const processOperation = document.querySelector(".processOperation");
const divButtonClosed = document.querySelector("#div-button-closed");

const Operation = {
  Sumar: "Sumar",
  Restar: "Restar",
  Multiplicar: "Multiplicar",
  Dividir: "Dividir",
};

const TabActive = {
  ...Operation,
  None: "None",
};

const CSS_CLASS_INACTIVE = "inactive";
const EMPTY_STRING = "";
const EVENT_CLICK = "click";

let tabActive = TabActive.None;

buttonSuma.addEventListener(EVENT_CLICK, buttonSumar);
buttonResta.addEventListener(EVENT_CLICK, buttonRestar);
buttonMultiplicacion.addEventListener(EVENT_CLICK, buttonMultiplicar);
buttonDivision.addEventListener(EVENT_CLICK, buttonDividir);
divButtonClosed.addEventListener(EVENT_CLICK, closetForm);

function updateLogicTabs(newTabActive) {
  paragraphResult.innerHTML = EMPTY_STRING;
  const isFormInactive =
    processOperation.classList.contains(CSS_CLASS_INACTIVE);
  // Esta oculto el formulario y se muestra
  if (isFormInactive) {
    processOperation.classList.remove(CSS_CLASS_INACTIVE);
    tabActive = newTabActive;
  }

  // Se esta mostrando el formulario y se oculta
  if (!isFormInactive && tabActive === newTabActive) {
    processOperation.classList.add(CSS_CLASS_INACTIVE);
    tabActive = TabActive.None;
  }

  // Se esta mostrando el formulario y solo se cambia el tab, no se oculta ni se muestra el formulario
  if (!isFormInactive && tabActive !== newTabActive) {
    tabActive = newTabActive;
  }
}

function closetForm() {
  formOperation.reset();
  processOperation.classList.add(CSS_CLASS_INACTIVE);
  tabActive = TabActive.None;
}

function getTotalByOperation(operation) {
  const [valueOne, valueTwo] = getInputValues();
  if (operation === Operation.Sumar) {
    return valueOne + valueTwo;
  }

  if (operation === Operation.Restar) {
    return valueOne - valueTwo;
  }

  if (operation === Operation.Multiplicar) {
    return valueOne * valueTwo;
  }

  if (operation === Operation.Dividir) {
    return valueOne / valueTwo;
  }

  throw new Error("Operation invalid, verify !!");
}

function getInputValues() {
  let valueOne = +input1.value;
  valueOne = isNaN(valueOne) ? 0 : valueOne;
  let valueTwo = +input2.value;
  valueTwo = isNaN(valueTwo) ? 0 : valueTwo;
  return [valueOne, valueTwo];
}

function buttonSumar() {
  updateLogicTabs(TabActive.Sumar);
  formOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    const suma = getTotalByOperation(TabActive.Sumar);
    paragraphResult.innerHTML = "El resultado de la suma es: " + suma;
  });
}

function buttonRestar() {
  updateLogicTabs(TabActive.Restar);
  formOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    const resta = getTotalByOperation(TabActive.Restar);
    paragraphResult.innerHTML = "El resultado de la resta es: " + resta;
  });
}

function buttonMultiplicar() {
  updateLogicTabs(TabActive.Multiplicar);
  formOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    const multiplicacion = getTotalByOperation(TabActive.Multiplicar);
    paragraphResult.innerHTML =
      "El resultado de la multiplicacion es: " + multiplicacion;
  });
}

function buttonDividir() {
  updateLogicTabs(TabActive.Dividir);
  formOperation.addEventListener("submit", (e) => {
    e.preventDefault();
    const division = getTotalByOperation(TabActive.Dividir);
    paragraphResult.innerHTML = "El resultado de la division es: " + division;
  });
}
