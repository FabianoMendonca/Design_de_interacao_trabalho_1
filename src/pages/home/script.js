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
        
        let color = document.querySelector('#colorInput').value;
        let name = document.querySelector('#nameInput').value;
        localStorage.setItem(index, JSON.stringify({ "nome" : name,
                                                     "cor" : color}) ); 
        index++;
        localStorage.setItem('index',index);
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
    //   console.log('uhum')
        let index = localStorage.getItem('index');
        let teams = []
        if(index){
            for (let i=0; i<index;i++){
                teams.push(localStorage.getItem(i))
            }
            rebuildteams(teams);
        }
    },
    false,
);

// função para contruir os times
function rebuildteams(teams){
    console.log(teams)
    for(let i=0; i<teams.length; i++){
        let teamElement = document.querySelector(`#time${i}`)
        teamElement.style.color = '#FFFF'
        let nameTeam = teamElement.querySelector('#nameTeam')
        let colorTeam = teamElement.querySelector('#colorTeam')
        let props = JSON.parse(teams[i])
        nameTeam.textContent = props.nome;
        colorTeam.style = `background:${props.cor}`

    }

}

function clearLocalStorage(){
    localStorage.clear();
    main.dispatchEvent(reloadPage);
}