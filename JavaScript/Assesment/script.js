let $form = document.querySelector('.js_form');
let $select = document.querySelector('.js_combo_moedas');
let $input = document.querySelector('.js_quantidade');
let $date_select = document.querySelector('.js_dateTime');
let $table = $form.querySelector('.table');
let $tbody = $table.querySelector('tbody');
let $input_limpar = document.querySelector('.js_limpar');
let $div_relatorio = document.querySelector('.relatorio');
let $div_riquezas = document.querySelector('.riquezas');
let date_now = new Date().toString();
let coin = [];
let historico = carregaCacheLocalStorage();

// INICIA COMBO MOEDAS
getMoedas().then(
    function () {
        // INICIA CARGA DE FUNCIONALIDADES
        carregaFuncoesIniciais();
    }
);

function carregaFuncoesIniciais() {
    carregaHistoricoTabela();
    atualizaRelatorioERiquezas();
}

function atualizaRelatorioERiquezas(){
    criarRelatorio();
    calculaRiquezas();
}


$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let vlQnt = $input.value;
    let vlMoeda = $select.value;
    let vlData = $date_select.value;

    if (!vlQnt.trim() && !vlMoeda.trim() && !vlData.trim()) {
        $input.classList.add('is-invalid');
        $select.classList.add('is-invalid');
        $date_select.classList.add('is-invalid');
    } else {
        if (!vlQnt.trim()) {
            window.alert('Preencha o campo: ' + $input.name + ' !');
            $input.classList.add('is-invalid');
            $input.focus();
        } else {
            $input.classList.remove('is-invalid');
            if (!vlMoeda.trim()) {
                window.alert('Preencha o campo: ' + $select.name + ' !');
                $select.classList.add('is-invalid');
                $select.focus();
            } else {
                $select.classList.remove('is-invalid');
                if (!vlData.trim()) {
                    window.alert('Preencha o campo: ' + $date_select.name + ' !');
                    $date_select.classList.add('is-invalid');
                    $date_select.focus();
                } else {
                    $date_select.classList.remove('is-invalid');
                    filtrar()
                    $input_limpar.classList.remove('d-none');
                }
            }
        }
    }
});

$input_limpar.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('Historico');
    while ($tbody.hasChildNodes()) {
        $tbody.removeChild($tbody.firstChild);
    }
    atualizaRelatorioERiquezas();
    $input_limpar.classList.add('d-none');
});

async function filtrar() {
    let apiDataSelecionado;
    let apiDataAtual;
    let valorDataSelecionada;
    let valorCotacao;
    let valorDataAtual;
    let valorHoje

    try {
        apiDataSelecionado = await getValorDataSelecionada(new Date($date_select.value.split("-")), $select.value);
        valorDataSelecionada = apiDataSelecionado.rates["BRL"];

        apiDataAtual = await getValorDataHoje($select.value);
        valorDataAtual = apiDataAtual.rates["BRL"];

        valorCotacao = vPercentual(valorDataSelecionada, valorDataAtual)
        valorHoje = valorDataAtual * $input.value;
        let $tr = criarEl('tr', null, $tbody);
        let simbolo = coin.find(m => m[0] == $select.value);
        let valor = "" + $input.value;
        if (!!simbolo)
            valor = simbolo[1] + " " + valor;
        criarEl('td', valor, $tr, {
            className: 'text-center'
        });
        criarEl('td', $select.value, $tr, {
            className: 'text-center'
        });
        criarEl('td', formatDateCampo(new Date($date_select.value.split("-"))), $tr, {
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

        historico.push(new registro($input.value, $select.value, formatDateCampo(new Date($date_select.value.split("-"))), valorDataSelecionada.toFixed(2), valorCotacao.toFixed(2), valorHoje, valorDataAtual))

        historico.sort((x, y) => x.data_Compra - y.data_Compra)

        let serializado = JSON.stringify(historico)
        localStorage.setItem(`Historico`, serializado);
        console.log('Salvo com sucesso');

        atualizaRelatorioERiquezas();

        // $input.value = '';
        // $date_select.value = '';
        // $select.value = '';

    } catch (ex) {
        window.alert('ERRO: ' + ex)
    }


}

async function getValorDataSelecionada(data, moeda) {

    let url = 'https://api.exchangeratesapi.io/' + formatDateAPI(data) + '?base=' + moeda
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
        let url = 'https://raw.githubusercontent.com/joselsantospqt/JavaScript202/master/JavaScript/moeda.json'
        let data = await getPromiseExchangeRatesAPI(url);
        await data.json().then((d) => {
            for (let key in d) {
                coin.push([d[key].code, d[key].symbol]);
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

function getPromiseExchangeRatesAPI(url) {
    return fetch(url);
}

function carregaComboMoeda() {

    for (let key of coin) {
        let li = document.createElement('option');
        li.textContent = key[0];
        li.value = key[0];
        $select.append(li);
    }

}

function carregaHistoricoTabela() {
    let cache = carregaCacheLocalStorage();
    for (let items of cache) {
        let $tr = criarEl('tr', null, $tbody);
        let camposAUsar = [
            "quantidade",
            "moeda",
            "data_Compra",
            "valor_Compra",
            "porcentagem_hoje",
            "valor_Hoje"
        ];
        for (let item of camposAUsar) {
            let valor = items[item];
            if (item == "valor_Hoje") {
                valor = valor.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                });
            } else if (item == "porcentagem_hoje") {
                valor = "% " + valor;
            } else if (item == "quantidade") {
                let simbolo = coin.find(m => m[0] == items["moeda"]);
                if (!!simbolo)
                    valor = simbolo[1] + " " + valor;
            }
            criarEl('td', `${valor}`, $tr, {
                className: 'text-center'
            });
        }
        criarButton($tr);
    }
    if (cache.length)
        $input_limpar.classList.remove('d-none');
}

function carregaCacheLocalStorage() {
    let cache = localStorage.getItem("Historico") || "[]";
    return JSON.parse(cache);
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
        $el.innerText = texto;
    }
    if ($pai) {
        $pai.append($el);
    }

    for (let chave in extra) {
        $el[chave] = extra[chave]
    }
    return $el
}

function criarRelatorio() {
    if ($div_relatorio) {
        $div_relatorio.innerHTML = "";
        let cache = carregaCacheLocalStorage().slice();
        let moedasAgrupadas = groupBy(cache, "moeda");
        for (let moedaSigla in moedasAgrupadas) {
            let $card = document.createElement('div');
            let $card_body = document.createElement('div');
            let $moeda = document.createElement('p');
            let $cota = document.createElement('p');
            let $somatorio = document.createElement('p');
            $card.setAttribute("class", 'card col-3 m-3');
            $card_body.setAttribute("class", 'card-body');
            let somatorioMoedasMesmaSigla = 0;
            for (let moeda of moedasAgrupadas[moedaSigla]) {
                $moeda.innerText = moeda.moeda;
                $cota.innerText = moeda.cotacao.toFixed(2);
                somatorioMoedasMesmaSigla += moeda.valor_Hoje;
            }
            $somatorio.innerText = somatorioMoedasMesmaSigla.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });
            $card_body.append($moeda, $cota, $somatorio);
            $card.append($card_body);
            $div_relatorio.append($card);
        }
        if(!cache.length){
            let $card = document.createElement('div');
            $card.setAttribute("class", 'card col');
            $card.innerText = "Não há moedas!";
            $div_relatorio.append($card);
        }
    }
}


function calculaRiquezas() {
    if ($div_riquezas) {
        $div_riquezas.innerHTML = "";
        let moedas = carregaCacheLocalStorage();
        let $card = document.createElement('div');
        let $card_body = document.createElement('div');
        let $somatorio = document.createElement('h1');
        $card.setAttribute("class", 'card col');
        $card_body.setAttribute("class", 'card-body');
        let somatorioTodaMoedas = 0;
        for (let moeda of moedas) {
            somatorioTodaMoedas += moeda.valor_Hoje;
        }
        $somatorio.innerText = somatorioTodaMoedas.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
        $card_body.append($somatorio);
        $card.append($card_body);
        $div_riquezas.append($card);
    }
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
        atualizaRelatorioERiquezas();
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
            item.children[0].textContent.match(/[\d\.\,]+/)[0],
            item.children[1].textContent,
            item.children[2].textContent,
            item.children[3].textContent,
            item.children[4].textContent.match(/[\d\.\,]+/),
            item.children[5].textContent.match(/[\d\.\,]+/)
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

function groupBy(array, key) {
    return array.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function registro(quantidade, moeda, data_Compra, valor_Compra, porcentagem_hoje, valor_Hoje, valor_cotacao) {
    this.quantidade = quantidade;
    this.moeda = moeda;
    this.data_Compra = data_Compra;
    this.valor_Compra = valor_Compra;
    this.porcentagem_hoje = porcentagem_hoje;
    this.valor_Hoje = valor_Hoje;
    this.cotacao = valor_cotacao;
}