"use strict";

let criarComponentes1 = function (){
  let $q = document.querySelector('#q1')
  let $h1 = document.createElement('h1')
  $h1.innerText = 'exemplo'
  $q.append($h1)
}

window.componentes.push(criarComponentes1)


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
  let nota = Math.floor(  Math.random() * 100)
  let ns = Symbol()
  notas[ns] = nota

  alunos.push(new relatorio(i, ns))
}

console.log(notas[alunos[0].nota]);