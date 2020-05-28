"use strict";


let criarComponentes5 = function (){
  let $q = document.querySelector('#q5')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo 5'
  $q.append($h1)
}
window.componentes.push(criarComponentes5)
