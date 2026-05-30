const quizData = [
    { pergunta: 'O que mais te atrai?', a: 'Resolver problemas com lógica', b: 'Ajudar pessoas', c: 'Organizar projetos' },
    { pergunta: 'Qual atividade você curte mais?', a: 'Programar ou mexer no PC', b: 'Trabalhar em equipe', c: 'Planejar tarefas ou liderar' },
    { pergunta: 'Qual seu estilo de trabalho?', a: 'Autônomo e criativo', b: 'Colaborativo e humano', c: 'Focado e estratégico' },
    { pergunta: 'Onde você se imagina atuando?', a: 'Empresa de tecnologia', b: 'Hospital ou Unidade de Saúde', c: 'Escritório ou empresa' },
    { pergunta: 'Qual ferramenta você acha mais interessante?', a: 'Algoritmos e códigos', b: 'Procedimentos de saúde', c: 'Gestão de projetos' },
    { pergunta: 'Você prefere aprender com:', a: 'Desafios técnicos', b: 'Atendimento a pessoas', c: 'Planejamento e organização' },
    { pergunta: 'O que você valoriza em uma carreira?', a: 'Inovação', b: 'Cuidado', c: 'Estratégia' },
    { pergunta: 'No trabalho, você gosta de:', a: 'Automatizar processos', b: 'Apoiar o próximo', c: 'Tomar decisões' },
    { pergunta: 'Seu horário ideal é:', a: 'Flexível e digital', b: 'Rotina com turnos', c: 'Agenda estruturada' },
    { pergunta: 'Em um projeto, você gosta de:', a: 'Criar soluções novas', b: 'Trabalhar com pessoas', c: 'Organizar resultados' },
    { pergunta: 'Você se vê mais como:', a: 'Programador', b: 'Profissional de saúde', c: 'Líder de equipe' },
    { pergunta: 'Qual habilidade você gostaria de desenvolver?', a: 'Lógica e programação', b: 'Cuidados e empatia', c: 'Gestão e planejamento' },
    { pergunta: 'Você se interessa por:', a: 'Robótica e sistemas', b: 'Enfermagem e biossegurança', c: 'Administração e finanças' },
    { pergunta: 'Seu trabalho perfeito inclui:', a: 'Tecnologia de ponta', b: 'Contato humano', c: 'Resultados organizados' },
    { pergunta: 'O que você acha mais importante?', a: 'Criatividade técnica', b: 'Bem-estar do outro', c: 'Eficiência administrativa' }
];

const prizes = [
    'Camiseta institucional KNOW',
    'Caneta personalizada do colégio',
    '10% de desconto na matrícula',
    'Entrada gratuita em evento escolar',
    'Kit digital de estudos',
    'Voucher para workshop exclusivo'
];

const quizStart = document.getElementById('quiz-start');
const startQuizButton = document.getElementById('start-quiz');
const quizQuestion = document.getElementById('quiz-question');
const quizForm = document.getElementById('quiz-form');
const quizCounter = document.getElementById('quiz-counter');
const questionTitle = document.getElementById('question-title');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const answerC = document.getElementById('answer-c');
const quizResult = document.getElementById('quiz-result');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const restartQuizButton = document.getElementById('restart-quiz');
const scratchButton = document.getElementById('scratch-button');
const scratchResult = document.getElementById('scratch-result');
const scratchPrize = document.getElementById('scratch-prize');
const scratchMessage = document.getElementById('scratch-message');
const leadForm = document.getElementById('lead-form');
const leadName = document.getElementById('lead-name');
const leadAge = document.getElementById('lead-age');
const leadEmail = document.getElementById('lead-email');
const leadCourse = document.getElementById('lead-course');
const leadFeedback = document.getElementById('lead-feedback');
const leadTableBody = document.querySelector('#lead-table tbody');

let currentQuestionIndex = 0;
let quizScores = { a: 0, b: 0, c: 0 };
let selectedQuestions = [];

function getRandomQuestions(count) {
    const copy = [...quizData];
    const chosen = [];
    while (chosen.length < count && copy.length) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        chosen.push(copy.splice(randomIndex, 1)[0]);
    }
    return chosen;
}

function showElement(element) {
    element.classList.remove('hide');
}

function hideElement(element) {
    element.classList.add('hide');
}

function startQuiz() {
    currentQuestionIndex = 0;
    quizScores = { a: 0, b: 0, c: 0 };
    selectedQuestions = getRandomQuestions(6);
    showElement(quizQuestion);
    hideElement(quizStart);
    hideElement(quizResult);
    showQuestion();
}

function showQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    quizCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${selectedQuestions.length}`;
    questionTitle.textContent = currentQuestion.pergunta;
    answerA.textContent = currentQuestion.a;
    answerB.textContent = currentQuestion.b;
    answerC.textContent = currentQuestion.c;
    quizForm.reset();
}

function calculateQuizResult() {
    const highestScore = Math.max(quizScores.a, quizScores.b, quizScores.c);
    if (quizScores.a === highestScore && quizScores.a > quizScores.b && quizScores.a > quizScores.c) {
        return {
            career: 'Tecnologia / Informática',
            recommendation: 'O curso ideal para você é Informática, com foco em desenvolvimento, redes e inovação digital.'
        };
    }
    if (quizScores.b === highestScore && quizScores.b > quizScores.a && quizScores.b > quizScores.c) {
        return {
            career: 'Saúde / Enfermagem',
            recommendation: 'O curso ideal para você é Enfermagem, com foco em cuidado humano e atuação em saúde.'
        };
    }
    return {
        career: 'Gestão / Administração',
        recommendation: 'O curso ideal para você é Administração, com foco em organização, liderança e resultados.'
    };
}

function saveQuizResult(result) {
    const history = JSON.parse(localStorage.getItem('knowQuizHistory') || '[]');
    history.push({ date: new Date().toLocaleDateString(), result });
    localStorage.setItem('knowQuizHistory', JSON.stringify(history));
}

function showQuizResult() {
    const result = calculateQuizResult();
    resultTitle.textContent = `Perfil recomendado: ${result.career}`;
    resultText.textContent = `${result.recommendation} Parabéns! Inscreva-se e transforme seu futuro agora mesmo.`;
    hideElement(quizQuestion);
    showElement(quizResult);
    saveQuizResult(result);
}

function handleQuizSubmit(event) {
    event.preventDefault();
    const selectedAnswer = quizForm.answer.value;
    if (!selectedAnswer) {
        alert('Por favor, selecione uma alternativa antes de continuar.');
        return;
    }
    quizScores[selectedAnswer] += 1;
    currentQuestionIndex += 1;
    if (currentQuestionIndex >= selectedQuestions.length) {
        showQuizResult();
        return;
    }
    showQuestion();
}

function handleScratch() {
    const today = new Date().toISOString().split('T')[0];
    const lastScratch = localStorage.getItem('knowScratchDate');
    if (lastScratch === today) {
        scratchPrize.textContent = 'Você já participou hoje.';
        scratchMessage.textContent = 'Volte amanhã para tentar de novo.';
        showElement(scratchResult);
        scratchButton.disabled = true;
        return;
    }

    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    localStorage.setItem('knowScratchDate', today);
    scratchPrize.textContent = `Prêmio: ${prize}`;
    scratchMessage.textContent = 'Parabéns! Entre em contato e garanta sua vantagem na matrícula.';
    showElement(scratchResult);
    scratchButton.disabled = true;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getStoredLeads() {
    return JSON.parse(localStorage.getItem('knowLeads') || '[]');
}

function saveLeads(leads) {
    localStorage.setItem('knowLeads', JSON.stringify(leads));
}

function renderLeadTable() {
    const leads = getStoredLeads();
    leadTableBody.innerHTML = '';
    if (leads.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">Nenhum lead cadastrado ainda.</td>';
        leadTableBody.appendChild(row);
        return;
    }
    leads.forEach((lead) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.age}</td>
            <td>${lead.email}</td>
            <td>${lead.course}</td>
        `;
        leadTableBody.appendChild(row);
    });
}

function handleLeadSubmit(event) {
    event.preventDefault();
    const name = leadName.value.trim();
    const age = leadAge.value.trim();
    const email = leadEmail.value.trim();
    const course = leadCourse.value;

    if (!name || !age || !email || !course) {
        leadFeedback.textContent = 'Por favor, preencha todos os campos.';
        leadFeedback.className = 'feedback feedback-error';
        return;
    }

    if (!validateEmail(email)) {
        leadFeedback.textContent = 'Insira um e-mail com formato válido.';
        leadFeedback.className = 'feedback feedback-error';
        return;
    }

    const leads = getStoredLeads();
    leads.push({ name, age, email, course });
    saveLeads(leads);
    renderLeadTable();
    leadForm.reset();
    leadFeedback.textContent = 'Lead registrada com sucesso! Confira no painel abaixo.';
    leadFeedback.className = 'feedback feedback-success';
}

function initializeScratchButton() {
    const today = new Date().toISOString().split('T')[0];
    const lastScratch = localStorage.getItem('knowScratchDate');
    if (lastScratch === today) {
        scratchButton.disabled = true;
    }
}

startQuizButton.addEventListener('click', startQuiz);
quizForm.addEventListener('submit', handleQuizSubmit);
restartQuizButton.addEventListener('click', startQuiz);
scratchButton.addEventListener('click', handleScratch);
leadForm.addEventListener('submit', handleLeadSubmit);

renderLeadTable();
initializeScratchButton();