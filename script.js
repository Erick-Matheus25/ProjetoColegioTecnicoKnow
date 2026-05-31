const quizData = [
{
pergunta: "O que mais te atrai?",
a: "Resolver problemas com lógica",
b: "Ajudar pessoas",
c: "Organizar projetos"
},
{
pergunta: "Qual atividade você curte mais?",
a: "Programar ou mexer no PC",
b: "Trabalhar em equipe",
c: "Planejar tarefas ou liderar"
},
{
pergunta: "Qual seu estilo de trabalho?",
a: "Autônomo e criativo",
b: "Colaborativo e humano",
c: "Focado e estratégico"
},
{
pergunta: "Onde você se imagina atuando?",
a: "Empresa de tecnologia",
b: "Hospital ou Unidade de Saúde",
c: "Escritório ou empresa"
},
{
pergunta: "Qual ferramenta você acha mais interessante?",
a: "Algoritmos e códigos",
b: "Procedimentos de saúde",
c: "Gestão de projetos"
},
{
pergunta: "Você prefere aprender com:",
a: "Desafios técnicos",
b: "Atendimento a pessoas",
c: "Planejamento e organização"
},
{
pergunta: "O que você valoriza em uma carreira?",
a: "Inovação",
b: "Cuidado",
c: "Estratégia"
},
{
pergunta: "No trabalho você gosta de:",
a: "Automatizar processos",
b: "Apoiar o próximo",
c: "Tomar decisões"
},
{
pergunta: "Seu horário ideal é:",
a: "Flexível e digital",
b: "Rotina com turnos",
c: "Agenda estruturada"
},
{
pergunta: "Em um projeto você gosta de:",
a: "Criar soluções novas",
b: "Trabalhar com pessoas",
c: "Organizar resultados"
},
{
pergunta: "Você se vê mais como:",
a: "Programador",
b: "Profissional da saúde",
c: "Líder de equipe"
},
{
pergunta: "Qual habilidade gostaria de desenvolver?",
a: "Lógica e programação",
b: "Cuidados e empatia",
c: "Gestão e planejamento"
},
{
pergunta: "Você se interessa mais por:",
a: "Robótica e sistemas",
b: "Enfermagem e biossegurança",
c: "Administração e finanças"
},
{
pergunta: "Seu trabalho perfeito inclui:",
a: "Tecnologia de ponta",
b: "Contato humano",
c: "Resultados organizados"
},
{
pergunta: "O que você considera mais importante?",
a: "Criatividade técnica",
b: "Bem-estar do outro",
c: "Eficiência administrativa"
}
];

const quizStart = document.getElementById("quiz-start");
const startQuizButton = document.getElementById("start-quiz");

const quizQuestion = document.getElementById("quiz-question");
const quizForm = document.getElementById("quiz-form");

const quizCounter = document.getElementById("quiz-counter");
const questionTitle = document.getElementById("question-title");

const answerA = document.getElementById("answer-a");
const answerB = document.getElementById("answer-b");
const answerC = document.getElementById("answer-c");

const quizResult = document.getElementById("quiz-result");

const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

const restartQuizButton = document.getElementById("restart-quiz");

let perguntaAtual = 0;

let pontuacao = {
a: 0,
b: 0,
c: 0
};

let perguntasSelecionadas = [];

function iniciarQuiz() {

perguntaAtual = 0;

pontuacao = {
a: 0,
b: 0,
c: 0
};

perguntasSelecionadas = [...quizData]
.sort(() => Math.random() - 0.5)
.slice(0, 6);

quizStart.classList.add("hide");
quizResult.classList.add("hide");
quizQuestion.classList.remove("hide");

mostrarPergunta();
}

function mostrarPergunta() {

const pergunta = perguntasSelecionadas[perguntaAtual];

quizCounter.textContent =
`Pergunta ${perguntaAtual + 1} de ${perguntasSelecionadas.length}`;

questionTitle.textContent = pergunta.pergunta;

answerA.textContent = pergunta.a;
answerB.textContent = pergunta.b;
answerC.textContent = pergunta.c;

quizForm.reset();
}

function mostrarResultado() {

let curso = "";
let descricao = "";

if (
pontuacao.a >= pontuacao.b &&
pontuacao.a >= pontuacao.c
) {

curso = "Técnico em Informática";

descricao =
"Você possui perfil voltado para tecnologia, inovação e resolução de problemas.";

}
else if (
pontuacao.b >= pontuacao.a &&
pontuacao.b >= pontuacao.c
) {

curso = "Técnico em Enfermagem";

descricao =
"Você possui perfil humano, colaborativo e focado no cuidado das pessoas.";

}
else {

curso = "Técnico em Administração";

descricao =
"Você possui perfil estratégico, organizado e com potencial para liderança.";

}

localStorage.setItem("resultadoQuiz", curso);

quizQuestion.classList.add("hide");
quizResult.classList.remove("hide");

resultTitle.textContent =
`Curso Recomendado: ${curso}`;

resultText.textContent =
`${descricao} Faça sua matrícula e comece sua carreira profissional no Colégio Técnico KNOW.`;
}

quizForm.addEventListener("submit", function(event){

event.preventDefault();

const respostaSelecionada =
document.querySelector('input[name="answer"]:checked');

if(!respostaSelecionada){

alert("Selecione uma alternativa.");
return;

}

pontuacao[respostaSelecionada.value]++;

perguntaAtual++;

if(perguntaAtual >= perguntasSelecionadas.length){

mostrarResultado();

}else{

mostrarPergunta();

}

});

startQuizButton.addEventListener(
"click",
iniciarQuiz
);

restartQuizButton.addEventListener(
"click",
iniciarQuiz
);