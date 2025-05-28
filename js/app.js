// Carrega o formulário do CEP
const formularioCEP = document.querySelector('#formularioCEP');
// console.log(formularioCEP);  // LOG

// Carrega o formulário do Endereço
const formularioEndereco = document.querySelector("#formularioEndereco");

// Mensagem de erro
const mensagemErro = "Por favor informe um CEP válido.";

// Toast (para mostrar as mensagens)
const toast = document.querySelector('.toast');

// Ao carregar a página, coloca o foco do cursor no campo CEP
window.onload = () => {
    colocarFoco(formularioCEP.cep);
};

// Cria um evento de submit/envio do formulário
formularioCEP.addEventListener('submit', (evento) => {
    // Previne o comportamento padrão do submit (envio do form)
    evento.preventDefault();

    // Obtém o CEP informado pelo usuário
    const cep = formularioCEP.cep.value;
    // console.log(formularioCEP.cep.value);  // LOG

    // Verifica se o CEP não possui 8 dígitos
    if (cep.length != 8) {
        mostrarMensagem(mensagemErro);
        colocarFoco(formularioCEP.cep);
        return; // Early return (retorno antecipado)
    }

    // Chama a function para buscar o CEP na API ViaCEP
    buscarCEP(cep);
});

function buscarCEP(cep) {
    // URL da API ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Faz a requisição HTTP GET para a API ViaCEP
    fetch(url)
        // Se tiver sucesso, converte em JSON
        .then(response => response.json())

        // e exibe os dados na tela
        .then(dados => {
            // console.log(dados);  // LOG

            // Verifica se o CEP foi encontrado
            if (!dados.erro) {
                preencherEndereco(dados);
                limparCEP();    // Limpa o campo de CEP
                colocarFoco(formularioEndereco.numero); // Coloca o foco no campo Número

            } else {
                mostrarMensagem(mensagemErro);
                colocarFoco(formularioCEP.cep);
            }
        })
        // Se der erro na requisição
        .catch(() => {
            mostrarMensagem("Erro na requisição da API.");
        });
}

// Preenche o endereço recebido da API ViaCEP
function preencherEndereco(dados) {
    // Campos somente leitura (disabled)
    formularioEndereco.logradouro.value = dados.logradouro;
    formularioEndereco.bairro.value = dados.bairro;
    formularioEndereco.localidade.value = dados.localidade;
    formularioEndereco.estado.value = dados.estado;
    formularioEndereco.regiao.value = dados.regiao;
}

document.querySelector("#btnEndereco").addEventListener("click", () => {
    // Envia o formulário de en
    if (!formularioEndereco.logradouro.value != "") {
        mostrarMensagem("Preencha o CEP");
        colocarFoco(formularioCEP.cep);
        
    } else if (!formularioEndereco.numero.value != "") {
        mostrarMensagem("Preencha o Número");
        colocarFoco(formularioEndereco.numero);
        
    } else {
        // Simula o envio do Endereço para o Server
        mostrarMensagem("Endereço cadastrado com sucesso!");
        formularioEndereco.reset();
    }
});

// ===== Functions auxiliares ===== //
function colocarFoco(campo) {
    campo.focus();
}

function limparCEP() {
    formularioCEP.cep.value = "";
}

function mostrarMensagem(mensagem, duracao = 3000) {
    toast.textContent = mensagem;
    toast.classList.add('show');

    // Remove o toast após N segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, duracao); // 1 segundo == 1000 milis
}
