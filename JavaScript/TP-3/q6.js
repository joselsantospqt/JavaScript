"use strict";


let criarComponentes6 = function (){
 
  let $q = document.querySelector('#q6')
  let $ul = document.createElement('ul')
  let $content = document.createElement('div')
  let $span = document.createElement('span')
  let $h1 = document.createElement('h1')
  let $li
  let $links
  let $lista
  let count = 0;
  let arrayMenu = ['cadastro', 'login', 'logado']
  let OBJ = []
  let paginas = {}
  $content.setAttribute("Class", 'js-conteudo');
  $h1.innerText = 'Algoritmo 06'
  $q.append($h1, $ul,$content)
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
    $form.setAttribute("id", "form6");
    $el.append($h1, $form)
    
    let $input = document.createElement('input')
    let $nome = document.createElement('input')
    let $senha = document.createElement('input');
    $nome.setAttribute("type", "text");
    $nome.setAttribute("placeholder", "Digite um Nome");
    $senha.setAttribute("type", "number");
    $senha.setAttribute("placeholder", "Digite uma Senha");
    $input.setAttribute("type", "submit");
    $input.value = 'Cadastrar';
    $form.append($nome, $senha, $input)

    $form.addEventListener('submit', (e) => {
    e.preventDefault()
    let form = $form
    let usuario = form.querySelectorAll('input')[0].value
    let password = form.querySelectorAll('input')[1].value

      if(!usuario.trim() || !password.trim()){
        window.alert("Preencha os Campos !")
      }
      else{
        let user = {nome: usuario, senha: password}
        setStorageUser(user)
      }
    })
  }

  paginas['login'] = function($el){
    let $form = document.createElement('form')
    let $h1 = document.createElement('h1')
    $h1.innerText = 'Página de Login'
    $form.setAttribute("id", "form6");
    $el.append($h1, $form)
    
    let $input = document.createElement('input')
    let $nome = document.createElement('input')
    let $senha = document.createElement('input');
    $nome.setAttribute("type", "text");
    $nome.setAttribute("placeholder", "Digite seu Nome");
    $senha.setAttribute("type", "number");
    $senha.setAttribute("placeholder", "Digite sua Senha");
    $input.setAttribute("type", "submit");
    $input.value = 'Logar';
    $form.append($nome, $senha, $input)

    $form.addEventListener('submit', (e) => {
    e.preventDefault()
    let form = $form
    let usuario = form.querySelectorAll('input')[0].value
    let password = form.querySelectorAll('input')[1].value

    if(!usuario.trim() || !password.trim()){
      window.alert("Preencha os Campos !")
    }
    else{
      let user = {nome: usuario, senha: password}
      getStorageUser(user)
    }
    })
  }

  paginas['logado'] = function ($el) {
    let $h1 = document.createElement('h1')
    let $input = document.createElement('input')
    $h1.innerText = 'Logado com sucesso'
    $input.setAttribute("type", "button");
    $input.setAttribute("class", "js-deslogar");
    $input.value = 'Deslogar';
    $el.append($h1, $input)

    $input = document.querySelector('.js-deslogar')
    $input.addEventListener('click', (e) => {
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
    window.alert("Os dados não conferem");
  }else{
    navegacao('logado')
  }


}

}
window.componentes.push(criarComponentes6)
