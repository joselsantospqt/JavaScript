"use strict";


let criarComponentes5 = function (){
  let $q = document.querySelector('#q5')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $input
  let array = ['A', 'B', 'C']
  $h1.innerText = 'Algoritmo 05'
  $form.setAttribute("id", "form5");
  $q.append($h1, $form, $span)
  
  for(let item of array){
  $input = document.createElement('input')
  $input.setAttribute("type", "number");
  $input.setAttribute("placeholder", "Campo " + item);
  $form.append($input)
  }

  $input = document.createElement('input')
  $input.setAttribute("type", "submit");
  $input.value = 'Calcular';
  $form.append($input)
  
  $form.addEventListener('submit', (e) => {
  e.preventDefault()
  let buttons = $form.querySelectorAll('input')
  let A = buttons[0].value
  let B = buttons[1].value
  let C = buttons[2].value
  if(!A.trim() || !B.trim() || !C.trim()){
    window.alert("Preencha os Campos !")
  }
  else{
    $span.innerText = tipoTriangulo(parseInt(A), parseInt(B), parseInt(C));
  }
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
