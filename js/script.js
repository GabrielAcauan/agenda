
const inp = document.querySelector('.nova_tarefa');
const btn = document.querySelector('.btn-add-tarefa');
const list = document.querySelector('.tarefas');



function criaLi(){
    const li = document.createElement('li');
    return li;
}

inp.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inp.value) return;
        criaTarefa(inp.value);
    }
});

function limpaInput(){
    inp.value = '';
    inp.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    list.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btn.addEventListener('click', function(){
    if(!inp.value) return;
    criaTarefa(inp.value);
});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas(){
    const liTarefas = list.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    
    const tarefasJSON = JSON.stringify(listaDeTarefas); //converte array em arquivo de texto json
    localStorage.setItem('tarefas', tarefasJSON);
}

function adionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas'); //coverte arquivo json de volta para array
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adicionarTarefasSalvas();