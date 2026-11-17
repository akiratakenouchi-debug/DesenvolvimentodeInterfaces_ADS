// ===== AULA 2: Console | funções, condicionais, validação e repetição =====
// Tema: classificador de resultados

const NOTA_APROVACAO = 7;
const NOTA_RECUPERACAO = 5;

// ---------- FUNÇÕES ----------

// Repetição (for): soma as notas e divide pela quantidade
function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

// Condicionais (if / else if / else): classifica a média
function classificarResultado(media) {
  if (media >= NOTA_APROVACAO) {
    return "Aprovado";
  } else if (media >= NOTA_RECUPERACAO) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

// Validação: nota precisa ser número entre 0 e 10
function notaValida(nota) {
  return typeof nota === "number" && !isNaN(nota) && nota >= 0 && nota <= 10;
}

// Validação de uma lista inteira (repetição + condicional)
function validarNotas(notas) {
  if (!Array.isArray(notas) || notas.length === 0) {
    return "nenhuma nota informada";
  }
  for (let i = 0; i < notas.length; i++) {
    if (!notaValida(notas[i])) {
      return `a nota ${i + 1} é inválida (${notas[i]})`;
    }
  }
  return null; // null = tudo certo
}

// Processa um aluno e devolve o resultado (ou o erro)
function processarAluno(nome, notas) {
  const erro = validarNotas(notas);
  if (erro) {
    return { nome, erro };
  }
  const media = calcularMedia(notas);
  return { nome, notas, media, situacao: classificarResultado(media) };
}

// ---------- DADOS DE TESTE ----------

const turma = [
  { nome: "Ana",   notas: [8, 9, 7.5] },
  { nome: "Bruno", notas: [6, 5, 5.5] },
  { nome: "Carla", notas: [3, 4, 2] },
  { nome: "Diego", notas: [8, 15, 7] },  // inválido
  { nome: "Elisa", notas: [10, 7, 9] }
];

// ---------- EXECUÇÃO ----------

const contagem = { Aprovado: 0, "Recuperação": 0, Reprovado: 0 };
let invalidos = 0;

// Repetição (for...of): percorre toda a turma
for (const aluno of turma) {
  const r = processarAluno(aluno.nome, aluno.notas);

  if (r.erro) {
    console.log(`❌ ${r.nome}: ${r.erro}`);
    invalidos++;
  } else {
    console.log(`${r.nome} | notas: ${r.notas.join(", ")} | média: ${r.media.toFixed(2)} | ${r.situacao}`);
    contagem[r.situacao]++;
  }
}

// Classificador de resultados: resumo final
console.log("========== RESUMO ==========");
console.log(`Aprovados: ${contagem.Aprovado}`);
console.log(`Recuperação: ${contagem["Recuperação"]}`);
console.log(`Reprovados: ${contagem.Reprovado}`);
console.log(`Registros inválidos: ${invalidos}`);
