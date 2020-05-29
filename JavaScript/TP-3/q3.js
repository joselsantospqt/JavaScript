"use strict";

let criarComponentes3 = function (){
  let $q = document.querySelector('#q3')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo 3'
  $q.append($h1)
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

for (let i = 0; i < 10; i ++){
  let nota = Math.ceil(  Math.random() * 100)
  let ns = Symbol()
  notas[ns] = nota

  alunos.push(new relatorio(i, ns))
}

console.log(notas[alunos[0].nota]);