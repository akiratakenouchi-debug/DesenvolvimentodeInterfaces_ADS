// ===== AULA 3: Página web | DOM, eventos, formulário e mensagens =====
// Aplicação web completa (acumula Aula 1 e Aula 2)

const NOTA_APROVACAO = 7;
const NOTA_RECUPERACAO = 5;

// ---------- ELEMENTOS DO DOM ----------
const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const camposNotas = [
  document.getElementById("nota1"),
  document.getElementById("nota2"),
  document.getElementById("nota3")
];
const btnLimpar = document.getElementById("btnLimpar");
const btnLimparLista = document.getElementById("btnLimparLista");
const caixaMensagem = document.getElementById("mensagem");
const tabela = document.getElementById("tabela");
const corpoTabela = document.getElementById("corpoTabela");
const textoVazio = document.getElementById("vazio");

const contadores = {
  Aprovado: document.getElementById("totalAprovados"),
  "Recuperação": document.getElementById("totalRecuperacao"),
  Reprovado: document.getElementById("totalReprovados"),
  total: document.getElementById("totalGeral")
};

// Lista de alunos cadastrados (fica na memória da página)
const alunos = [];

// ---------- LÓGICA (Aulas 1 e 2) ----------
function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

function classificarResultado(media) {
  if (media >= NOTA_APROVACAO) {
    return "Aprovado";
  } else if (media >= NOTA_RECUPERACAO) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

function notaValida(nota) {
  return !isNaN(nota) && nota >= 0 && nota <= 10;
}

// Devolve a classe CSS de cada situação
function classeDaSituacao(situacao) {
  if (situacao === "Aprovado") return "aprovado";
  if (situacao === "Recuperação") return "recuperacao";
  return "reprovado";
}

// ---------- MENSAGENS ----------
function mostrarMensagem(texto, classe) {
  caixaMensagem.textContent = texto;
  caixaMensagem.className = "mensagem " + classe;
  caixaMensagem.style.display = "block";
}

function esconderMensagem() {
  caixaMensagem.style.display = "none";
}

// ---------- ATUALIZAÇÃO DA TELA ----------
function atualizarTela() {
  // Tabela: recria as linhas a partir da lista
  corpoTabela.innerHTML = "";

  for (const aluno of alunos) {
    const linha = document.createElement("tr");
    const classe = classeDaSituacao(aluno.situacao);

    linha.innerHTML =
      `<td></td>` +
      `<td>${aluno.notas.join(" / ")}</td>` +
      `<td>${aluno.media.toFixed(2)}</td>` +
      `<td class="tag ${classe}">${aluno.situacao}</td>`;
    // textContent evita que o nome digitado seja interpretado como HTML
    linha.firstChild.textContent = aluno.nome;

    corpoTabela.appendChild(linha);
  }

  tabela.hidden = alunos.length === 0;
  textoVazio.hidden = alunos.length > 0;

  // Resumo: conta cada situação
  const contagem = { Aprovado: 0, "Recuperação": 0, Reprovado: 0 };
  for (const aluno of alunos) {
    contagem[aluno.situacao]++;
  }
  contadores.Aprovado.textContent = contagem.Aprovado;
  contadores["Recuperação"].textContent = contagem["Recuperação"];
  contadores.Reprovado.textContent = contagem.Reprovado;
  contadores.total.textContent = alunos.length;
}

function limparCampos() {
  campoNome.value = "";
  camposNotas.forEach(function (campo) {
    campo.value = "";
  });
  campoNome.focus();
}

// ---------- EVENTOS ----------
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // não recarrega a página

  const nome = campoNome.value.trim();
  if (nome === "") {
    mostrarMensagem("Informe o nome do aluno.", "erro");
    campoNome.focus();
    return;
  }

  const notas = [];
  for (let i = 0; i < camposNotas.length; i++) {
    const valor = camposNotas[i].value === "" ? NaN : Number(camposNotas[i].value);

    if (!notaValida(valor)) {
      mostrarMensagem(`A nota ${i + 1} é inválida. Use um valor de 0 a 10.`, "erro");
      camposNotas[i].focus();
      return;
    }
    notas.push(valor);
  }

  const media = calcularMedia(notas);
  const situacao = classificarResultado(media);

  alunos.push({ nome, notas, media, situacao });
  atualizarTela();

  mostrarMensagem(
    `${nome}: média ${media.toFixed(2)} - ${situacao}.`,
    classeDaSituacao(situacao)
  );
  limparCampos();
});

btnLimpar.addEventListener("click", function () {
  limparCampos();
  esconderMensagem();
});

btnLimparLista.addEventListener("click", function () {
  alunos.length = 0;
  atualizarTela();
  mostrarMensagem("Lista de alunos apagada.", "erro");
});

// Estado inicial
atualizarTela();
