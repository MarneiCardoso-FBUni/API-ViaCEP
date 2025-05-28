// Carrega o formulário
// const formularioCEP = document.getElementById('formularioCEP');
const formularioCEP = document.querySelector('#formularioCEP');
    // console.log(formularioCEP);  // LOG

// Mensagem de erro
const mensagemErro = "CEP inválido, por favor informe um CEP válido.";

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

    // Verifica se o CEP possui 8 dígitos
    if (cep.length != 8) {
        limparTodosCampos();
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

    // Faz a solicitação HTTP para a API ViaCEP
    fetch(url)
        // Se tiver sucesso, converte em JSON
        .then(response => response.json())

        // Exibe os dados na tela
        .then(dados => {
            // console.log(dados);  // LOG
            
            // Verifica se o CEP foi encontrado
            if (!dados.erro) {
                formularioCEP.logradouro.value = dados.logradouro;
                formularioCEP.bairro.value = dados.bairro;
                formularioCEP.localidade.value = dados.localidade;
                formularioCEP.estado.value = dados.estado;
                formularioCEP.regiao.value = dados.regiao;
            
            } else {
                limparTodosCampos();
                mostrarMensagem(mensagemErro);
                colocarFoco(formularioCEP.cep);
            }
        }
    );
    
    // Limpa o campo de CEP
    limparCEP();

    // Coloca o foco no campo Número
    colocarFoco(formularioCEP.numero);
}

// ===== Functions auxiliares ===== //
function colocarFoco(campo) {
    campo.focus();
}

function limparCEP() {
    formularioCEP.cep.value = '';
}

function limparTodosCampos() {
    formularioCEP.reset();
}

function mostrarMensagem(mensagem) {
    alert(mensagem);
}
