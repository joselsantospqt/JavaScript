"use strict";

let criarComponentes1 = function (){  
let $q = document.querySelector('#q1')
let $form = document.createElement('form')
let $h1 = document.createElement('h1')
let $span = document.createElement('span')
let $label 
let $button
let array = [
  {name: 'minimo', text: 'valor mínimo'},
  {name: 'maximo', text: 'valor máximo'}
]
$h1.innerText = 'Algoritmo 01'
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
let A = form.querySelectorAll('input')[0].value
let B = form.querySelectorAll('input')[1].value
$span = document.querySelector('span')
if(!A.trim() || !B.trim()){
  window.alert("Preencha os Campos !")
}
else{
  $span.innerText = calcular(parseInt(A), parseInt(B));
}
})


function calcular(minimo, maximo){
    let multiplo = [];
    let qnt = maximo - minimo 
    if(minimo < maximo){
      for (let i = 0; i < qnt; i++ ) {
          if (i % 2 == 0 && i % 3 == 0) {
              multiplo.push(i);
          }
        }
        return "Existem " + multiplo.length + " múltiplos de 2 e 3 simultaneamente."
      
    }
}

}

window.componentes.push(criarComponentes1)
