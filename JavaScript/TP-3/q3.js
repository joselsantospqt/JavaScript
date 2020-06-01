"use strict";

let criarComponentes3 = function (){
  let $q = document.querySelector('#q3')
  let $table = document.createElement('table')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $button = document.createElement('button')
  let $br = document.createElement('br')
  let arrayMenu = ['#', 'ALUNO', 'NOTA', 'SITUAÇÃO']
  let $tr
  let $th
  let $table_row
  let $nr_celula
  let $celula
  let situacao
  let relatorio = []
  let notas = {}
  let count = 0;
  let aprovados
  let reprovados

  $table.setAttribute("Class", 'js-tabela');
  $h1.innerText = 'Algoritmo 03'
  $q.append($h1, $span, $br, $table)

  $button.setAttribute("type", "input");
  $button.setAttribute("class", "js-adicionar");
  $button.innerText = 'Calcular';
  $span.append($button)

  $table = document.querySelector('.js-tabela');
  let $thead = document.createElement('thead')
  let $tbody = document.createElement('tbody')
  $table.append($thead, $tbody)

  $thead = document.querySelector('.js-tabela > thead');
  $tr = document.createElement('tr')
  $thead.append($tr)

  $tr = document.querySelector('.js-tabela > thead > tr ');
  
  for(let item of arrayMenu){
    $th = document.createElement('th')
    $th.setAttribute("scope", "col");
    $tr.append($th)
    $th = document.querySelectorAll('th')[count]
    $th.innerText = item;

    count++
    }

    function limpar($item){
      while($item.hasChildNodes()){
        $item.removeChild($item.firstChild)
      }
      return $item
    }

    let $adicionar = document.querySelector('.js-adicionar')
    $table = document.querySelector('.js-tabela > tbody')

    $adicionar.addEventListener('click', (e) => {
      e.preventDefault()
      
      aprovados = 0
      reprovados = 0
      limpar($table)

      function aluno(aluno, nota, situacao) {
        this.aluno = aluno;
        this.nota = nota;
        this.situacao = situacao;
    
        this.imprimir = function(){
          return `${this.aluno} / ${this.nota}`
        }
    
        this.getAluno = function(){
          return  this.aluno
        }
    
        this.getNota = function(){
          return this.nota 
        }
    
        this.getSituacao = function(){
          return this.situacao 
        }
    
      }

    for (let i = 0; i < 20; i ++){
      let nota = Math.ceil(  Math.random() * 100)
        if(nota >= 60){
        aprovados++
        situacao = "APROVADO"
        }else{
        reprovados++
        situacao = "REPROVADO"
        }
      let ns = Symbol()
      notas[ns] = nota
      relatorio.push(new aluno(i, ns, situacao))

      $table_row = $table.insertRow(-1)
      $nr_celula = $table_row.insertCell(-1)
      $nr_celula.innerText = i
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getAluno()
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getNota().toString()
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getSituacao()
    }

    $table_row = $table.insertRow(-1)
    $nr_celula = $table_row.insertCell(-1)
    $nr_celula.innerText = "RESULTADOS: "
    $celula = $table_row.insertCell(-1)
    $celula.innerText = "APROVADOS: " + aprovados + "(" + (aprovados / 20) * 100 + "%)";
    $celula = $table_row.insertCell(-1)
    $celula.innerText = "REPROVADOS: " + reprovados + "(" + (reprovados / 20) * 100 + "%)";
    });
 

}
window.componentes.push(criarComponentes3)
