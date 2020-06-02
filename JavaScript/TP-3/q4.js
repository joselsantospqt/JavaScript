"use strict";


let criarComponentes4 = function (){
  let $q = document.querySelector('#q4')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $label 
  let $input
  let array = [
    {name: 'quantidade', text: 'Quantidade de números'},
    {name: 'minimo', text: 'valor mínimo'},
    {name: 'maximo', text: 'valor máximo'},
  ]
  $h1.innerText = 'Algoritmo 04'
  $form.setAttribute("id", "form4");
  $q.append($h1, $form, $span)
  

  for(let item of array){
  $label = document.createElement('label')
  $input = document.createElement('input')
  $input.setAttribute("type", "number");
  $input.setAttribute("name", item.name);
  $label.setAttribute("for", item.name);
  $label.innerText = item.text;
  $form.append($label, $input)
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
    $span.innerText = calcular(parseInt(A), parseInt(B), parseInt(C));
  }
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
