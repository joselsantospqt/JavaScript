"use strict";

let criarComponentes1 = function (){
  let $q = document.querySelector('#q1')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo'
  $q.append($h1)
}

window.componentes.push(criarComponentes1)
