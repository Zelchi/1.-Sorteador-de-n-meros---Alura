var desabilitarReiniciar = true;

function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value, 10);
    const min = parseInt(document.getElementById('de').value, 10);
    const max = parseInt(document.getElementById('ate').value, 10) + 1;

    if (isNaN(quantidade) || isNaN(min) || isNaN(max)) {
        document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Erro: Insira números válidos.</label>`;
        desabilitarReiniciar = false;
        alterarBotao();
        return;
    }

    if (quantidade <= 0 || min < 0 || max <= min) {
        document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Erro: Verifique a quantidade e os limites.</label>`;
        desabilitarReiniciar = false;
        alterarBotao();
        return;
    }

    const quantidadePossivel = max - min;
    if (quantidade > quantidadePossivel) {
        document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Erro: A quantidade de números não pode exceder o intervalo possível (${quantidadePossivel}).</label>`;
        desabilitarReiniciar = false;
        alterarBotao();
        return;
    }

    let numeros = [];

    function obterNúmeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function validarEntradas() {
        if (quantidade > 100) return `Erro: A quantidade máxima de números é 30.`;
        if (max > 1000) return `Erro: O valor máximo não pode ser maior que 1000.`;
        return null;
    }

    function gerarResultado() {
        const erro = validarEntradas();
        if (erro) {
            desabilitarReiniciar = false;
            return erro;
        }

        const numerosGerados = new Set();
        while (numerosGerados.size < quantidade) {
            numerosGerados.add(obterNúmeroAleatorio(min, max));
        }

        numeros = Array.from(numerosGerados);
        desabilitarReiniciar = true;
        return `Números sorteados: ${numeros.join(', ')}.`;
    }

    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">${gerarResultado()}</label>`;
    alterarBotao();
}

function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>`;
    desabilitarReiniciar = false;
    alterarBotao();
}

function alterarBotao() {
    const botao = document.getElementById('btn-reiniciar');
    if (desabilitarReiniciar) {
        botao.classList.remove('container__botao__desabilitado');
        botao.classList.add('container__botao__habilitado');
    } else {
        botao.classList.remove('container__botao__habilitado');
        botao.classList.add('container__botao__desabilitado');
    }
}