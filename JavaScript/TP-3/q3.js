"use strict";

let criarComponentes3 = function (){
  let $q = document.querySelector('#q3')
  let $table = document.createElement('table')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let arrayMenu = ['#', 'nr', 'nota']
  let $tr
  let $th
  let alunos = []
  let notas = {}

  $table.setAttribute("Class", 'js-tabela');
  $h1.innerText = 'Algoritmo 03'
  $q.append($h1, $table, $span)

  $table = document.querySelector('.js-tabela');
  let $thead = document.createElement('thead')
  let $tbody = document.createElement('tbody')
  $table.append($thead, $tbody)

  $thead = document.querySelector('.js-tabela > thead');
  $tr = document.createElement('tr')
  $thead.append($tr)

  $tr = document.querySelector('.js-tabela > thead > tr ');
  let count = 0;
  
  for(let item of arrayMenu){
    $th = document.createElement('th')
    $th.setAttribute("scope", "col");
    $tr.append($th)
    $th = document.querySelectorAll('th')[count]
    $th.innerText = item;

    count++
    }

}
window.componentes.push(criarComponentes3)


function relatorio(aluno, nota) {
  this.aluno = aluno;
  this.nota = nota;

  this.imprimir = function(){
    return `${this.aluno} / ${this.nota}`
  }

  this.getAluno = function(){
    return  this.aluno
  }

  this.getNota = function(){
    return this.nota 
  }

}

let alunos = []
let notas = {}

for (let i = 0; i < 20; i ++){
  let nota = Math.ceil(  Math.random() * 100)
  let ns = Symbol()
  notas[ns] = nota

  alunos.push(new relatorio(i, ns))
}

console.log(notas[alunos[0].nota]);