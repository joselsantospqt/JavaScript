let $form = document.querySelector('.js_form');
let $select = document.querySelector('.js_combo_moedas');
let $input = document.querySelector('.js_quantidade');
let $table = $form.querySelector('.table');
let $tbody = $table.querySelector('tbody');
let $date_select = document.querySelector('.js_dateTime');
let $input_limpar = document.querySelector('.js_limpar');
let $div_relatorio = document.querySelector('.relatorio');
let date_now = new Date().toString();
let coin = [];
let historico = []

// INICIA COMBO MOEDAS
getMoedas()

// INICIA COMBO CONTEÚDO TABELA
carregaHistoricoTabela();

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
})

$input_limpar.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('Historico');
    while ($tbody.hasChildNodes()) {
        $tbody.removeChild($tbody.firstChild);
    }
    while ($div_relatorio.hasChildNodes()) {
        $div_relatorio.removeChild($div_relatorio.firstChild);
    }
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
        apiDataSelecionado = await getValorDataSelecionada($date_select.value, $select.value);
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
        criarEl('td', formatDateCampo($date_select.value), $tr, {
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

        historico.push(new registro($input.value, $select.value, formatDateCampo($date_select.value), valorDataSelecionada.toFixed(2), valorCotacao.toFixed(2), valorHoje.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })))

        let serializado = JSON.stringify(historico)
        localStorage.setItem(`Historico`, serializado);
        console.log('Salvo com sucesso');

        criarRelatorio($select.value, valorCotacao.toFixed(2), valorHoje.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }), $div_relatorio);

        $input.value = '';
        $date_select.value = '';
        $select.value = '';

    } catch (ex) {
        window.alert('ERRO: ' + ex)
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
    if (cache != null) {
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
        $input_limpar.classList.remove('d-none');
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

function criarRelatorio(moeda, cota, somatorio, $pai) {
    let $card = document.createElement('div');
    let $card_body = document.createElement('div');
    let $moeda = document.createElement('p');
    let $cota = document.createElement('p');
    let $somatorio = document.createElement('p');
    $card.setAttribute("class", 'card col m-3');
    $card_body.setAttribute("class", 'card-body');
    if ($pai) {
        $moeda.innerText = moeda;
        $cota.innerText = cota;
        $somatorio.innerText = somatorio;
        $card_body.append($moeda, $cota, $somatorio);
        $card.append($card_body);
        $pai.append($card);
    }
    return $card
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