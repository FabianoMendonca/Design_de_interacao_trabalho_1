const reloadPage = new Event("reload");
const mainContent = document.querySelector("#main");

// função para remover o modal
function modalDismiss(modalName) {
  let modal = bootstrap.Modal.getInstance(document.querySelector(modalName));
  modal.hide();
}

// desabilita o botão de adicionar times
function disabledAddTeam() {
  let buttonadd = document
    .querySelector("#addNewTeam")
    .classList.add("disabled");
}

// submeter formulario de adicionar um novo time
function submitFormAddTeam() {
  if (localStorage.getItem("index") >= 4) {
    modalDismiss("#modalAddTeam");
    disabledAddTeam();
  } else {
    let index;
    localStorage.getItem("index") == null
      ? (index = 0)
      : (index = localStorage.getItem("index"));

    let color = document.querySelector("#colorInput").value;
    let name = document.querySelector("#nameInput").value;
    localStorage.setItem(index, JSON.stringify({ nome: name, cor: color }));
    index++;
    localStorage.setItem("index", index);
    if (index == 4) {
      disabledAddTeam();
    }
    form = document.querySelector("#formAddTeam");
    form.reset();
    modalDismiss("#modalAddTeam");
    main.dispatchEvent(reloadPage);
  }
}

// função para contruir os times
function rebuildteams(teams) {
    console.log(teams);
    for (let i = 0; i < teams.length; i++) {
      let teamElement = document.querySelector(`#time${i}`);
      teamElement.style.color = "#FFFF";
      let nameTeam = teamElement.querySelector("#nameTeam");
      let colorTeam = teamElement.querySelector("#colorTeam");
      let props = JSON.parse(teams[i]);
      nameTeam.textContent = props.nome;
      colorTeam.style = `background:${props.cor}`;
    }
  }

//Limpa o armazenamento local e recarrega a pagina   
function clearLocalStorage() {
    localStorage.clear();
    location.reload();
  }

// construir um evento para atualizar a pagina
mainContent.addEventListener(
  "reload",
  (e) => {
    let index = localStorage.getItem("index");
    let teams = [];
    if (index) {
      for (let i = 0; i < index; i++) {
        teams.push(localStorage.getItem(i));
      }
      rebuildteams(teams);
    }
  },
  false
);

// conteudo principal
main.dispatchEvent(reloadPage);
if (localStorage.getItem("index") >= 4) {
  disabledAddTeam();
}
