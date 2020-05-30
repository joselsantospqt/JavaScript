let $links = document.querySelectorAll('.js-link')
let $conteudo = document.querySelector('.js-conteudo')

function limpar($el) {
  while ($el.hasChildNodes()) {
    $el.removeChild($el.firstChild)
  }
  return $el
}

function navegacao(pagina) {
  limpar($conteudo)
  let funcao = paginas[pagina]
  if(!funcao){
    naoEncontrada($conteudo, pagina)
  } else {
    funcao($conteudo)
  }
}

for (let $link of $links) {
  $link.addEventListener('click', (e) => {
    navegacao(e.target.dataset.pagina)
  })
}

let paginas = {}
paginas['ola'] = function ($el) {
  let $h1 = document.createElement('h1')
  $h1.innerText = 'Ola, como vai você'
  $el.append($h1)
  let $form = document.createElement('form')
  let $input = document.createElement('input')
  $form.append($input)
  $el.append($form)

  let $link = document.createElement('span')
  $link.innerText = 'tudo bem'
  $link.addEventListener('click', function () {
    navegacao('tudo bem')
  })
  $el.append($link)

}

paginas['tudo bem'] = function ($el) {
  let $h1 = document.createElement('h2')
  $h1.innerText = 'Tudo bem'
  $el.append($h1)

}

paginas['como vai'] = function ($el) {
  let $h1 = document.createElement('h3')
  $h1.innerText = 'Como vai voce'
  $el.append($h1)

}

function naoEncontrada($el, pagina) {
  let $h1 = document.createElement('h1')
  $h1.innerText = `Pagina nao encontrada: ${pagina}`
  $el.append($h1)
}