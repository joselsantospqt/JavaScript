"use strict";


let criarComponentes4 = function (){
  let $q = document.querySelector('#q4')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $label 
  let $button
  let array = [
    {name: 'quantidade', text: 'Quantidade de números'},
    {name: 'minimo', text: 'valor mínimo'},
    {name: 'maximo', text: 'valor máximo'},
  ]
  $h1.innerText = 'Algoritmo 04'
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
  let A = parseInt(form.querySelectorAll('input')[0].value)
  let B = parseInt(form.querySelectorAll('input')[1].value)
  let C = parseInt(form.querySelectorAll('input')[2].value)

  $span.innerText = calcular(A,B,C);
  })

  function calcular(quantidade,minimo,maximo) {
    let numeros = []
    let inicio = 0;
    let total = maximo - minimo

    while(inicio < quantidade){
      let aleatorio = Math.floor(Math.random() * total)
      if(aleatorio >= minimo && aleatorio <= maximo){
        if(numeros.includes(aleatorio) === false){
          numeros.push(aleatorio)
          inicio++;
        }
      }
    }
    numeros.sort((x, y ) => x - y )
    return 'Quantidade de números: ' + numeros.length + ' Lista de Números: ' + numeros
  }

}
window.componentes.push(criarComponentes4)
