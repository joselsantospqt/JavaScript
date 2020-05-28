"use strict";


let criarComponentes3 = function (){
  let $q = document.querySelector('#q3')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo 3'
  $q.append($h1)
}
window.componentes.push(criarComponentes3)
