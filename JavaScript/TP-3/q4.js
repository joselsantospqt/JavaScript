"use strict";


let criarComponentes4 = function (){
  let $q = document.querySelector('#q4')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo 4'
  $q.append($h1)
}
window.componentes.push(criarComponentes4)
