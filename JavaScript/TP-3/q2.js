"use strict";


let criarComponentes2 = function (){
  let $q = document.querySelector('#q4')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $label 
  let $button
  let array = [
    {name: 'fatorial', text: 'Valor fatorial'}
  ]
  $h1.innerText = 'Algoritmo 02'
  $form.setAttribute("id", "form");
  $q.append($h1, $form, $span)
  
  let $formulario = document.querySelector('#form')

  for(let item of array){
  $label = document.createElement('label')
  $button = document.createElement('input')
  $button.setAttribute("type", "number");
  $button.setAttribute("name", item.name);
  $label.setAttribute("for", item.name);
  $label.innerText = item.text;
  $formulario.append($label, $button)
  }

  $button = document.createElement('input')
  $button.setAttribute("type", "submit");
  $button.value = 'Calcular';
  $formulario.append($button)
  
  $formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  let form = $formulario
  let fatorial = parseInt(form.querySelectorAll('input')[0].value)

  $span.innerText = calcular(fatorial);
  })

  function calcular(fatorial) {
    let inicio = Math.floor(new Date().getTime())
  
    let resultado = 1
    for(let i = 1; i <= fatorial; i++){
      resultado *= i
    }
  
    let fim = Math.floor(new Date().getTime())
    let total = fim - inicio
    return  fatorial + '! = ' + total + ' em segundos, ' + 'resultado: ' + resultado
  }
}
window.componentes.push(criarComponentes2)
