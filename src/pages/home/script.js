
main = document.querySelector('.main')

function reloadContent () {
    try {
        let teams = localStorage.getItem('teams')
        
    } catch (e) {
        
    }
}

function submitFormAddTeam(){
    if(localStorage.getItem('index') >= 4){
        let modal = bootstrap.Modal.getInstance(document.querySelector('#modalAddTeam'))
        modal.hide();
        let buttonadd = document.querySelector('#addNewTeam').classList.add('disabled')
    }else{
        let index;
        localStorage.getItem('index') == null 
            ? index = 0 
            : index = localStorage.getItem('index');
        let color = document.querySelector('#colorInput').value;
        let name = document.querySelector('#nameInput').value;
        localStorage.setItem(index, JSON.stringify(`${name}:${color}`) ) 
        index++;
        localStorage.setItem('index',index);   
    }
}