"use strict";


let criarComponentes6 = function (){
  let OBJ = []
  let $q = document.querySelector('#q6')
  let $form = document.createElement('form')
  let $button = document.createElement('input')
  $form.setAttribute("id", "formulario6");
  $form.setAttribute("name", "cadastro");
  $button.setAttribute("type", "submit");
  $q.append($form)
  
  let $formulario = document.querySelector('#formulario6')
  let $nome = document.createElement('input')
  let $senha = document.createElement('input');
  $nome.value = 'exemplo 6'
  $nome.setAttribute("type", "text");
  $senha.value = 1111111
  $senha.setAttribute("type", "number");
  $formulario.append($nome, $senha, $button)
  // $formulario.append($senha)
  // $formulario.append($button)

  

  
document.addEventListener('click', (e) => {
  e.preventDefault()
  let form = document.querySelector('form');
  let usuario = form.querySelector('input').firstChild.value
  let password = form.querySelector('input').lastChild.value
  let user = {nome: usuario, senha: password}



adicionarItemNaLista(user)
})

function adicionarItemNaLista(user){
  user.nome = user.nome.trim()
  if(!user.nome){
    // se nome vazio, não adicionar
    return
  }
  else{
    
    OBJ.push(user)
  // guardando em "disco"
  let serializado = JSON.stringify(OBJ)
  localStorage.setItem(`chave`, serializado)
  
  }


}

function getStorage(){
let serializado_obtido = localStorage.getItem( key, `chave`)
let obj_obtido = JSON.parse(serializado_obtido)
console.log(obj_obtido.user[0].nome)
}

}
window.componentes.push(criarComponentes6)
