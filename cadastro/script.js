// seção de chamada dos campos de input, de seus respectivos erros de verificação e do botão de Sign Up
const errors = Array.from(document.querySelectorAll(".error"));
const signUpBtn = document.querySelector("#signup button");
const requeridos = Array.from(document.querySelectorAll(".required"));
const genders = Array.from(document.querySelectorAll(".gender"));

// objeto que define os padrões de validação de cada input
const padroes = {
  email: /\w+\@\w+/,
  password: /\w{6,}/,
  username: /.\w/,
  day: /\d{1,2}/,
  month: /.\w/,
  year: /\d{4}/,
  termsUse: /\w/,
};

// objeto que define a mensagem de erro a ser exibida quando o respectivo campo de input não é
// preenchido
const erroVazio = {
  email: "You need to enter your email.",
  password: "You need to enter a password.",
  username: "Enter a name for your profile.",
  day: "Enter a valid day of the month.",
  month: "Select your birth month.",
  year: "Enter a valid year.",
  termsUse: "Please accept the terms and conditions to continue.",
};

// objeto que define a mensagem de erro a ser exibida quando o respectivo campo de input não é
// validado de acordo com o padrão citado anteriormente
const erroValidacao = {
  email: "This email is invalid. Make sure it's written like example@email.com",
  password: "Your password is too short.",
  username: "Enter a name for your profile.",
  day: "Enter a valid day of the month.",
  month: "",
  year: "Enter a valid year.",
  termsUse: "Please accept the terms and conditions to continue.",
};

// função que verifica se os campos de input estão vazios ou se são válidos
// se todos os campos estiverem devidamente preenchidos, a propridade de
// display das mensagens de erro permanecerão como 'none'
function verificarCampo(nomeCampo, padrao, erroVazio, erroValidacao) {
  const campo = document.getElementById(`${nomeCampo}`);
  let erro = selecionarErro(`${nomeCampo}`);
  let errorMessage = erro.lastChild;

  if (campo.value === "" || !campo.checked) {
    errorMessage.textContent = erroVazio;
    mostrarErro(campo, erro);
  } else if (campo.value !== "" && !padrao.test(campo.value)) {
    errorMessage.textContent = erroValidacao;
    mostrarErro(campo, erro);
  } else {
    ocultarErro(campo, erro);
  }
}

// função que retorna a div de erro referente ao nome da classe do respectivo
// campo de input
function selecionarErro(att) {
  return document.getElementsByClassName(`error ${att}`)[0];
}

// função que muda propriedade de display da div de erro, referente ao nome da
// classe do respectivo campo de input para 'flex'
function mostrarErro(nomeCampo, erro) {
  erro.style.display = "flex";
  nomeCampo.style.boxShadow = "inset 0 0 0 1px #e91429";
}

// função que muda propriedade de display da div de erro, referente ao nome da
// classe do respectivo campo de input para 'none'
function ocultarErro(nomeCampo, erro) {
  erro.style.display = "none";
  nomeCampo.style.boxShadow = "inset 0 0 0 1px black";
}

// função exclusiva para validar o campo gender
function validateGender() {
  const erro = selecionarErro("gender");

  if (genders.find((e) => e.checked)) {
    erro.style.display = "none";
  } else {
    erro.style.display = "flex";
  }
}

// trecho de código que adiciona os eventos declarados em events para as divs
// da classe .required. A cada evento, busca-se validar o respectivo campo ou,
// mostrar a devida frase de erro.
requeridos.forEach((element) => {
  let events = ["change", "input", "focusout"];
  events.forEach((event) => {
    element.addEventListener(event, () => {
      let nomeCampo = element.id;

      verificarCampo(
        nomeCampo,
        padroes[`${nomeCampo}`],
        erroVazio[`${nomeCampo}`],
        erroValidacao[`${nomeCampo}`]
      );
    });
  });
});

// adição de eventos de validação dos campos de gênero
genders.forEach((e) => {
  e.addEventListener("change", validateGender);
});

signUpBtn.addEventListener("click", () => {
  requeridos.forEach((element) => {
    let nomeCampo = element.id;

    verificarCampo(
      nomeCampo,
      padroes[`${nomeCampo}`],
      erroVazio[`${nomeCampo}`],
      erroValidacao[`${nomeCampo}`]
    );

    validateGender();
  });
});
