"use strict";


let criarComponentes2 = function () {
  let $q = document.querySelector('#q2')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $label
  let $input
  let array = [{
    name: 'fatorial',
    text: 'Valor fatorial'
  }]
  $h1.innerText = 'Algoritmo 02'
  $form.setAttribute("id", "form2");
  $q.append($h1, $form, $span)


  for (let item of array) {
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
    let fatorial = $form.querySelector('input').value
    if (!fatorial.trim()) {
      window.alert("Preencha os Campos !")
    } else {
      $span.innerText = calcular(parseInt(fatorial));
    }

  })

  function calcular(fatorial) {
    let inicio = new Date();

    let resultado = 1
    for (let i = 1; i <= fatorial; i++) {
      resultado *= i
    }
    let fim = new Date();
    let total = fim - inicio;
    return fatorial + '! = ' + total + ' em segundos, ' + 'resultado: ' + resultado
  }
}
window.componentes.push(criarComponentes2)