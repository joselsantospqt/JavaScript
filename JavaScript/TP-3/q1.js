"use strict";

let criarComponentes1 = function () {
  let $q = document.querySelector('#q1')
  let $form = document.createElement('form')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $label
  let $input
  let array = [{
      name: 'minimo',
      text: 'valor mínimo'
    },
    {
      name: 'maximo',
      text: 'valor máximo'
    }
  ]
  $h1.innerText = 'Algoritmo 01'
  $form.setAttribute("id", "form1");

  // let $formulario = document.querySelector('#form1')

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
    
    let A = $form.querySelectorAll('input')[0].value
    let B = $form.querySelectorAll('input')[1].value
    if (!A.trim() || !B.trim()) {
      window.alert("Preencha os Campos !")
    } else {
      $span.innerText = calcular(parseInt(A), parseInt(B));
    }
  })


  $q.append($h1, $form, $span)

  function calcular(minimo, maximo) {
    let multiplo = [];
    let qnt = maximo - minimo
    if (minimo < maximo) {
      for (let i = 0; i < qnt; i++) {
        if (i % 2 == 0 && i % 3 == 0) {
          multiplo.push(i);
        }
      }
      return "Existem " + multiplo.length + " múltiplos de 2 e 3 simultaneamente."

    }
  }

}

window.componentes.push(criarComponentes1)