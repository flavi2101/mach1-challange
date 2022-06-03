const menu = document.querySelector("[data-menu]");
const nome = document.querySelector("[data-user = name]");
const email = document.querySelector("[data-user = email]");
const cpf = document.querySelector("[data-user = cpf]");
const curso = document.querySelector("[data-user = course]");
const btnCadastro = document.querySelector("[data-btn_cadastrar]");
const tableBody = document.getElementById("table-users");
var usuarios ={};
var dataBase = [];

menu.addEventListener("click", menuHandler);
nome.addEventListener("input", (e) => dataHandler(e, nome.dataset));
email.addEventListener("input", (e) => dataHandler(e, email.dataset));
cpf.addEventListener("input", (e) => dataHandler(e, cpf.dataset));
curso.addEventListener("input", (e) => dataHandler(e, curso.dataset));
btnCadastro.addEventListener("click", cadastroHandler);
tableBody.addEventListener("click", deleteRegister);

window.localStorage.clear()

function menuHandler() {
  let menuItem = document.querySelector("menu");
  let showMenu =
    window.getComputedStyle(menuItem).getPropertyValue("display") == "flex"
      ? "none"
      : "flex";
  menuItem.style.display = showMenu;
}

function dataHandler(event, data) {
  usuarios[data.user] = event.target.value;

  // window.localStorage.setItem('usuarios', JSON.stringify(dataBase));
}

function validation(field) {
  var props = Object.keys(field);
  var validName, validEmail, validCfp, validCurso;
  props.forEach((key) => {
    switch (key) {
      case "name":
        validName = isValidText(field.name);
        break;
      case "email":
        validEmail = isValidEmail(field.email);
        break;
      case "cpf":
        validCfp = isValidCpf(field.cpf);
        break;
      case "course":
        validCurso = isValidText(field.course);
        break;
    }
  });
  return validCfp && validCurso && validEmail && validName;
}

function isValidText(value) {
  var regex = /^[a-zA-Z ]{2,30}$/;
  var teste = regex.test(value);
  showError(value, teste);
  return teste;
}

function isValidEmail(email) {
  var regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var teste = regex.test(String(email).toLowerCase());
  showError(email, teste);
  return teste;
}

function isValidCpf(cpf) {
  var regex =
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  var teste = regex.test(Number(cpf));
  showError(cpf, teste);
  return teste;
}

function showError(value, teste) {
  if (teste == false) {
    return window.alert(`${value} is invalid`);
  }
}

function cadastroHandler(e) {
  e.preventDefault();
  var allFields = Object.keys(usuarios).length;

  if (allFields != 4) {
    window.alert("Não é permitido campo em branco");
  } else if (validation(usuarios) == true) {
    dataBase.push(usuarios)
    let dataUser = document.createElement("tr");
    dataUser.innerHTML = `
    <td>${usuarios.name}</td>
    <td>${usuarios.email}</td>
    <td>${usuarios.cpf}</td>
    <td>${usuarios.course}</td>
    <td><img data-delete src="./src/img/content_img/close-red.svg" alt="close" width="15" height="15"></td>`;

    nome.value = "";
    email.value = "";
    cpf.value = "";
    curso.value = "";
    usuarios = {};
    window.localStorage.setItem('user', JSON.stringify(dataBase));

    return tableBody.appendChild(dataUser);
  }
}

function deleteRegister(e) {
  var item = e.srcElement.nodeName == "IMG" ? true : false;
  if (item && window.confirm("deletar item?")) {
    let user = e.srcElement.parentElement.parentElement;
    user.remove();
    return window.alert("item excluido com sucesso");
  }
}
