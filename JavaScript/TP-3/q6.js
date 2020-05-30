"use strict";


let criarComponentes6 = function (){
 
  let $q = document.querySelector('#q6')
  let $ul = document.createElement('ul')
  let $content = document.createElement('div')
  let $span = document.createElement('span')
  let $li
  let $links
  let $lista
  let count = 0;
  let arrayMenu = ['cadastro', 'login', 'logado']
  let OBJ = []
  let paginas = {}
  $content.setAttribute("Class", 'js-conteudo');
  $q.append($ul,$content)
  $content = document.querySelector('.js-conteudo')
  $lista = document.querySelector('ul')

  for(let item of arrayMenu){
    $li = document.createElement('li')
    $li.setAttribute("data-link", item);
    $lista.append($li)
    $li = document.querySelectorAll('li')[count]
    $li.innerText = item
    
    count ++
  }
  
  $links = document.querySelectorAll('li')

  function limpar($el){
    while($el.hasChildNodes()){
      $el.removeChild($el.firstChild)
    }
    return $el
  }

  function navegacao(link){
    limpar($content)
    let funcao = paginas[link]
    if(!funcao){
      navegacao('login')
    }else {
      funcao($content)
    }
  }
  
  for(let $link of $links){
    $link.addEventListener('click', (e) => {
      navegacao(e.target.dataset.link)
    })
  }
  
  paginas['cadastro'] = function($el){
    let $form = document.createElement('form')
    let $h1 = document.createElement('h1')
    $h1.innerText = 'Página de Cadastro'
    $form.setAttribute("id", "form");
    $el.append($h1, $form)
    
    let $formulario = document.querySelector('#form')
    let $button = document.createElement('input')
    let $nome = document.createElement('input')
    let $senha = document.createElement('input');
    $nome.setAttribute("type", "text");
    $nome.setAttribute("placeholder", "Digite um Nome");
    $senha.setAttribute("type", "number");
    $senha.setAttribute("placeholder", "Digite uma Senha");
    $button.setAttribute("type", "submit");
    $button.value = 'Cadastrar';
    $formulario.append($nome, $senha, $button)

    $formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let form = $formulario
    let usuario = form.querySelectorAll('input')[0].value
    let password = form.querySelectorAll('input')[1].value
    let user = {nome: usuario, senha: password}
    setStorageUser(user)
    })
  }

  paginas['login'] = function($el){
    let $form = document.createElement('form')
    let $h1 = document.createElement('h1')
    $h1.innerText = 'Página de Login'
    $form.setAttribute("id", "form");
    $el.append($h1, $form)
    
    let $formulario = document.querySelector('#form')
    let $button = document.createElement('input')
    let $nome = document.createElement('input')
    let $senha = document.createElement('input');
    $nome.setAttribute("type", "text");
    $nome.setAttribute("placeholder", "Digite seu Nome");
    $senha.setAttribute("type", "number");
    $senha.setAttribute("placeholder", "Digite sua Senha");
    $button.setAttribute("type", "submit");
    $button.value = 'Logar';
    $formulario.append($nome, $senha, $button)

    $formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let form = $formulario
    let usuario = form.querySelectorAll('input')[0].value
    let password = form.querySelectorAll('input')[1].value
    let user = {nome: usuario, senha: password}
    getStorageUser(user)
    })
  }

  paginas['logado'] = function ($el) {
    let $h1 = document.createElement('h3')
    let $button = document.createElement('input')
    $h1.innerText = 'Logado com sucesso'
    $button.setAttribute("type", "button");
    $button.setAttribute("class", "js-deslogar");
    $button.value = 'Deslogar';
    $el.append($h1, $button)

    $button = document.querySelector('.js-deslogar')
    $button.addEventListener('click', (e) => {
      e.preventDefault()
      navegacao('login')
      })
  
  }
  
 
function setStorageUser(user){
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
  $span.innerText = 'Cadastrado com Sucesso !'
  $content.append($span)
  }


}

function getStorageUser(user){
let serializado_obtido = localStorage.getItem(`chave`)
let obj_obtido = JSON.parse(serializado_obtido)
let autenticado = false;
  for(let item of obj_obtido){
    if(user.nome === item.nome && user.senha === item.senha)
     autenticado = true;
  }

  if(!autenticado){
    window.alert("Usuário não encontrado");
  }else{
    navegacao('logado')
  }


}

}
window.componentes.push(criarComponentes6)
