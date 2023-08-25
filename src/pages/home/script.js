const reloadPage = new Event("reload");
const mainContent = document.querySelector('#main');

// função para remover o modal
function modalDismiss(modalName){
    let modal = bootstrap.Modal.getInstance(document.querySelector(modalName))
    modal.hide();
}

// submeter formulario de adicionar um novo time 
function submitFormAddTeam(){
    if(localStorage.getItem('index') >= 4){
        modalDismiss('#modalAddTeam');
        let buttonadd = document.querySelector('#addNewTeam').classList.add('disabled')
    }else{
        let index;
        localStorage.getItem('index') == null 
            ? index = 0 
            : index = localStorage.getItem('index');
        index++;
        localStorage.setItem('index',index);
        let color = document.querySelector('#colorInput').value;
        let name = document.querySelector('#nameInput').value;
        localStorage.setItem(index, JSON.stringify(`${name}:${color}`) ); 
        form = document.querySelector('#formAddTeam');
        form.reset();
        modalDismiss('#modalAddTeam');
        main.dispatchEvent(reloadPage);
    }
}

// construir um evento para atualizar a pagina
mainContent.addEventListener(
    "reload",
    (e) => {
      console.log('uhum')
    },
    false,
);