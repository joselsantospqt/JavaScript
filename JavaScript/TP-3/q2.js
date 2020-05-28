"use strict";


let criarComponentes2 = function (){
  let $q = document.querySelector('#q2')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo 2'
  $q.append($h1)
}
window.componentes.push(criarComponentes2)
