"use strict";


let criarComponentes5 = function (){
  let $q = document.querySelector('#q5')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $button
  let array = ['A', 'B', 'C']
  $h1.innerText = 'Algoritmo 05'
  $form.setAttribute("id", "form");
  $q.append($h1, $form, $span)
  
  let $formulario = document.querySelector('#form')

  for(let item of array){
  $button = document.createElement('input')
  $button.setAttribute("type", "number");
  $button.setAttribute("placeholder", "Campo " + item);
  $formulario.append($button)
  }

  $button = document.createElement('input')
  $button.setAttribute("type", "submit");
  $button.value = 'Calcular';
  $formulario.append($button)
  
  $formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  let form = $formulario
  let A = form.querySelectorAll('input')[0].value
  let B = form.querySelectorAll('input')[1].value
  let C = form.querySelectorAll('input')[2].value

  $span.innerText = tipoTriangulo(A, B, C);
  })

  function tipoTriangulo(a, b, c) {
    if (a == b && a == c)
        return "equilátero";
    else if (a == b || a == c || c == b)
        return "isóceles";
    else if (a != b && b != c && c != a)
        return "escaleno";
    else
        return "Não é um Triangulo";
    }

}
window.componentes.push(criarComponentes5)
