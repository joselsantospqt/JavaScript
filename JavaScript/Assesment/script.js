let $form = document.querySelector('.js_form');
let $retorno = document.querySelector('.js_msg');
let $select = document.querySelector('.js_combo_moedas');
let $input = document.querySelector('.js_quantidade');
let $table = $form.querySelector('.table');
let $tbody = $table.querySelector('tbody');
let date_now = new Date().toString();
let date_select;
let coin = [];
let historico = []

// INICIA COMBO MOEDAS
getMoedas()

// INICIA COMBO CONTEÚDO TABELA
carregaHistoricoTabela();

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    date_select = $form.querySelector('input[type=date]').value
    if (!date_select.trim()) {
        window.alert("preencha o campo !")
    } else {
        filtrar();
    }
})


async function filtrar() {
    let apiDataSelecionado;
    let apiDataAtual;
    let valorDataSelecionada;
    let valorCotacao;
    let valorDataAtual;
    let valorHoje

    try {
        apiDataSelecionado = await getValorDataSelecionada(date_select, $select.value);
        valorDataSelecionada = apiDataSelecionado.rates["BRL"];

        apiDataAtual = await getValorDataHoje($select.value);
        valorDataAtual = apiDataAtual.rates["BRL"];

        valorCotacao = vPercentual(valorDataSelecionada, valorDataAtual)
        valorHoje = valorDataAtual.toFixed(2) * $input.value;
        let $tr = criarEl('tr', null, $tbody);
        criarEl('td', $input.value, $tr, {
            className: 'text-center'
        });
        criarEl('td', $select.value, $tr, {
            className: 'text-center'
        });
        criarEl('td', formatDateCampo(date_select), $tr, {
            className: 'text-center'
        });
        criarEl('td', valorDataSelecionada.toFixed(2), $tr, {
            className: 'text-center'
        });
        criarEl('td', valorCotacao.toFixed(2) + ' %', $tr, {
            className: 'text-center'
        });
        criarEl('td', valorHoje.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }), $tr, {
            className: 'text-center'
        });
    
        criarButton($tr);
    
        historico.push(new registro($input.value, $select.value, formatDateCampo(date_select), valorDataSelecionada.toFixed(2), valorCotacao.toFixed(2), valorHoje.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })))
    
        let serializado = JSON.stringify(historico)
        localStorage.setItem(`Historico`, serializado);
        console.log('Salvo com sucesso');
    }
    catch(ex){
        window.alert('ERRO:' + ex)
    }
   

}

async function getValorDataSelecionada(data, moeda) {

    let url = 'https://api.exchangeratesapi.io/' + data + '?base=' + moeda
    var data = await getPromiseExchangeRatesAPI(url);
    return await data.json();
}

async function getValorDataHoje(moeda) {
    date_now = formatDateAPI(date_now);
    let url = 'https://api.exchangeratesapi.io/' + date_now + '?base=' + moeda
    var data = await getPromiseExchangeRatesAPI(url);
    return await data.json();
}

async function getMoedas() {
    let cache = localStorage.getItem(`Moedas`);
    if (cache === null || !!cache.trim()) {
        let url = 'https://gist.githubusercontent.com/joseluisq/59adf057a8e77f625e44e8328767a2a5/raw/e26aa3a0a540a88049a69b9a50d8010004deb34d/currencies.json'
        var data = await getPromiseExchangeRatesAPI(url);
        data.json().then((d) => {
            for (let key in d) {
                coin.push(key);
            }
            let serializado = JSON.stringify(coin)
            localStorage.setItem(`Moedas`, serializado);
            console.log('Carregou com sucesso');
            carregaComboMoeda();
        })
    } else {
        cache = JSON.parse(cache)
        for (let key of cache) {
            coin.push(key);
        }
        carregaComboMoeda()
    }

}

function carregaComboMoeda() {

    for (let key of coin) {
        let li = document.createElement('option');
        li.textContent = key;
        li.value = key;
        $select.append(li);
    }

}

function carregaHistoricoTabela() {

    let cache = localStorage.getItem(`Historico`);
    if (cache != null || !cache.trim()) {
        cache = JSON.parse(cache)
        for (let items of cache) {
            let $tr = criarEl('tr', null, $tbody);
            for (let item in items) {
                criarEl('td', `${items[item]}`, $tr, {
                    className: 'text-center'
                });
            }
            criarButton($tr);
        }
    }
}

function getPromiseExchangeRatesAPI(url) {
    return fetch(url);
}

function formatDateAPI(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateCampo(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

function vPercentual(n1, n2) {
    if (n1 >= n2) {
        return ((n1 - n2) / n1) * 100

    } else {
        return ((n2 - n1) / n1) * 100
    }
}

function criarEl(tipo, texto, $pai, extra) {
    let $el = document.createElement(tipo);
    if (texto) {
        $el.innerText = texto
    }
    if ($pai) {
        $pai.append($el)
    }

    for (let chave in extra) {
        $el[chave] = extra[chave]
    }
    return $el
}

function criarButton($tr) {
    let $td = criarEl('td', '', $tr);
    let $buttons = criarEl('button', 'Excluir', $td, {
        className: 'btn btn-danger btn-block .js_botao'
    });

    $buttons.addEventListener('click', (e) => {
        e.preventDefault();
        let $td = e.target.parentElement;
        apagar($td.parentElement);
        atualizaTabela();
    })
}

function apagar(value) {
    while (value.hasChildNodes()) {
        value.removeChild(value.firstChild);
    }
    return value.remove();

}

function atualizaTabela() {
    let $tr = $tbody.querySelectorAll('tr')
    // LIMPAR ARRAY
    historico = [];

    for (let item of $tr) {
        historico.push(new registro(
            item.children[0].textContent,
            item.children[1].textContent,
            item.children[2].textContent,
            item.children[3].textContent,
            item.children[4].textContent,
            item.children[5].textContent
        ));
    }

    // APAGA O LOCALSTORAGE
    localStorage.removeItem('Historico');
    // RECRIO O LOCAL STRORAGE
    let serializado = JSON.stringify(historico)
    localStorage.setItem(`Historico`, serializado);
    console.log('Atualizado com sucesso');
    // APAGO A TABELA
    apagar($tbody);
    // REINICIO A TABELA
    $tbody = criarEl('tbody', '', $table);
    carregaHistoricoTabela();

}

function registro(quantidade, moeda, data_Compra, valor_Compra, porcentagem_hoje, valor_Hoje) {
    this.quantidade = quantidade;
    this.moeda = moeda;
    this.data_Compra = data_Compra;
    this.valor_Compra = valor_Compra;
    this.porcentagem_hoje = porcentagem_hoje;
    this.valor_Hoje = valor_Hoje;
}