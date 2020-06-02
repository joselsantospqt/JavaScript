"use strict";

let criarComponentes3 = function (){
  let $q = document.querySelector('#q3')
  let $table = document.createElement('table')
  let $h1 = document.createElement('h1')
  let $span = document.createElement('span')
  let $input = document.createElement('input')
  let $thead = document.createElement('thead')
  let $tbody = document.createElement('tbody')
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
  let aprovados
  let reprovados

  $table.setAttribute("Class", 'js-tabela');
  $h1.innerText = 'Algoritmo 03'
  $q.append($h1, $span, $br, $table)

  $input.setAttribute("type", "button");
  $input.setAttribute("class", "js-adicionar");
  $input.value = 'Calcular';
  $span.append($input)

  $table.append($thead, $tbody)

  $tr = document.createElement('tr')
  $thead.append($tr)

  
  for(let item of arrayMenu){
    $th = document.createElement('th')
    $th.setAttribute("scope", "col");
    $tr.append($th)
    $th.innerText = item;

    }

    function limpar($item){
      while($item.hasChildNodes()){
        $item.removeChild($item.firstChild)
      }
      return $item
    }


    $input.addEventListener('click', (e) => {
      e.preventDefault()
      
      aprovados = 0
      reprovados = 0
      limpar($tbody)

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

      $table_row = $tbody.insertRow(-1)
      $nr_celula = $table_row.insertCell(-1)
      $nr_celula.innerText = i
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getAluno()
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getNota().toString()
      $celula = $table_row.insertCell(-1)
      $celula.innerText = relatorio[i].getSituacao()
    }

    $table_row = $tbody.insertRow(-1)
    $nr_celula = $table_row.insertCell(-1)
    $nr_celula.innerText = "RESULTADOS: "
    $celula = $table_row.insertCell(-1)
    $celula.innerText = "APROVADOS: " + aprovados + "(" + (aprovados / 20) * 100 + "%)";
    $celula = $table_row.insertCell(-1)
    $celula.innerText = "REPROVADOS: " + reprovados + "(" + (reprovados / 20) * 100 + "%)";
    });
 

}
window.componentes.push(criarComponentes3)
