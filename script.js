/* ============================================================
   COLÉGIO TÉCNICO KNOW — script.js  (v2)
   1. Sistema de Pontos
   2. Estatísticas animadas + gráfico de formação
   3. Quiz Vocacional
   4. Raspadinha (3 tentativas, loot table por tier)
   5. Formulário de Leads + Painel Admin
   6. Sistema de Feedback
   ============================================================ */


/* ════════════════════════════════════════════════════════════
   1. SISTEMA DE PONTOS
   ════════════════════════════════════════════════════════════
   Ações e pontos:
     quiz_completo   → +50
     cadastro        → +100
     feedback_enviado→ +30
     visit_stats     → +10 (1x por sessão)
     visit_cursos    → +10 (1x por sessão)
     raspadinha      → +20
   Tiers:
     Bronze   0–99
     Prata   100–199  → +15% chance Ouro na raspadinha
     Ouro    200–299  → +30% chance Diamante
     Diamante 300+    → garantia de Ouro ou melhor
   ════════════════════════════════════════════════════════════ */

var POINTS_KEY = "knowPoints";
var POINTS_ACTIONS_KEY = "knowPointsActions"; /* ações já realizadas nesta sessão */

var PONTOS_CONFIG = {
    quiz_completo:    50,
    cadastro:         100,
    feedback_enviado: 30,
    visit_stats:      10,
    visit_cursos:     10,
    raspadinha:       20
};

var sessionActions = {};

function carregarPontos() {
    return parseInt(localStorage.getItem(POINTS_KEY) || "0", 10);
}

function salvarPontos(pts) {
    localStorage.setItem(POINTS_KEY, String(pts));
}

function getTier(pts) {
    if (pts >= 300) { return "diamante"; }
    if (pts >= 200) { return "ouro"; }
    if (pts >= 100) { return "prata"; }
    return "bronze";
}

function getTierLabel(tier) {
    return { bronze: "Bronze", prata: "Prata", ouro: "Ouro", diamante: "Diamante" }[tier] || "Bronze";
}

function adicionarPontos(acao, forcarRepetir) {
    /* Ações únicas por sessão (visitas) */
    if (!forcarRepetir && (acao === "visit_stats" || acao === "visit_cursos")) {
        if (sessionActions[acao]) { return; }
        sessionActions[acao] = true;
    }

    var ganho = PONTOS_CONFIG[acao] || 0;
    if (ganho <= 0) { return; }

    var antes  = carregarPontos();
    var depois = antes + ganho;
    salvarPontos(depois);

    atualizarBarraPontos(depois);
    mostrarToastPontos("+" + ganho + " pts — " + descricaoAcao(acao));

    /* Verifica mudança de tier */
    var tierAntes  = getTier(antes);
    var tierDepois = getTier(depois);
    if (tierAntes !== tierDepois) {
        mostrarToastPontos("🎉 Novo tier: " + getTierLabel(tierDepois) + "!");
    }
}

function descricaoAcao(acao) {
    return {
        quiz_completo:    "Quiz concluído",
        cadastro:         "Cadastro realizado",
        feedback_enviado: "Feedback enviado",
        visit_stats:      "Seção de estatísticas",
        visit_cursos:     "Seção de cursos",
        raspadinha:       "Raspadinha jogada"
    }[acao] || acao;
}

function atualizarBarraPontos(pts) {
    if (pts === undefined) { pts = carregarPontos(); }

    var MAX_VIS = 400;
    var pct     = Math.min((pts / MAX_VIS) * 100, 100);

    var elFill  = document.getElementById("points-fill");
    var elVal   = document.getElementById("points-value");
    var elBadge = document.getElementById("points-tier-badge");
    var elPanel = document.getElementById("panel-points-total");

    if (elFill)  { elFill.style.width = pct + "%"; }
    if (elVal)   { elVal.textContent  = pts + " pts"; }
    if (elPanel) { elPanel.textContent = pts + " pts"; }

    var tier = getTier(pts);
    if (elBadge) {
        elBadge.textContent  = getTierLabel(tier);
        elBadge.className    = "points-tier-badge tier-" + tier;
    }

    /* Destaca tier ativo no painel */
    document.querySelectorAll(".ptl-item").forEach(function (el) {
        el.classList.remove("active");
    });
    var tierEl = document.querySelector("." + tier + "-item");
    if (tierEl) { tierEl.classList.add("active"); }

    /* Info do tier na raspadinha */
    atualizarInfoTierRaspadinha(tier, pts);
}

var toastTimer = null;

function mostrarToastPontos(msg) {
    var el = document.getElementById("points-toast");
    if (!el) { return; }

    clearTimeout(toastTimer);
    el.textContent = msg;
    el.classList.remove("hide");

    toastTimer = setTimeout(function () {
        el.classList.add("hide");
    }, 2800);
}

/* ── Intersection Observer para pontos de visita ── */
function iniciarObserverVisitas() {
    if (!window.IntersectionObserver) { return; }

    var opts = { threshold: 0.3 };

    new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { adicionarPontos("visit_stats"); }
        });
    }, opts).observe(document.getElementById("stats") || document.body);

    new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { adicionarPontos("visit_cursos"); }
        });
    }, opts).observe(document.getElementById("cursos") || document.body);
}


/* ════════════════════════════════════════════════════════════
   2. ESTATÍSTICAS ANIMADAS
   ════════════════════════════════════════════════════════════ */

var graduationData = [
    { ano: "2019", inf: 78, enf: 82, adm: 74 },
    { ano: "2020", inf: 71, enf: 80, adm: 69 },
    { ano: "2021", inf: 83, enf: 85, adm: 78 },
    { ano: "2022", inf: 87, enf: 88, adm: 82 },
    { ano: "2023", inf: 91, enf: 90, adm: 86 },
    { ano: "2024", inf: 93, enf: 92, adm: 89 }
];

function construirGrafico() {
    var container = document.getElementById("graduation-chart");
    if (!container) { return; }

    container.innerHTML = "";

    graduationData.forEach(function (d) {
        var grupo = document.createElement("div");
        grupo.className = "chart-year-group";

        var barras = document.createElement("div");
        barras.className = "chart-bars";

        function criarBarra(pct, cor, label) {
            var b = document.createElement("div");
            b.className  = "chart-bar";
            b.style.background = cor;
            b.dataset.pct      = pct;
            b.dataset.tip      = label + ": " + pct + "%";
            b.style.height     = "0px";
            barras.appendChild(b);
        }

        criarBarra(d.inf, "var(--primary)",       "Informática");
        criarBarra(d.enf, "var(--scratch-gold)",  "Enfermagem");
        criarBarra(d.adm, "var(--success)",        "Administração");

        var label = document.createElement("div");
        label.className   = "chart-year-label";
        label.textContent = d.ano;

        grupo.appendChild(barras);
        grupo.appendChild(label);
        container.appendChild(grupo);
    });
}

function animarEstatisticas() {
    /* Contadores numéricos */
    document.querySelectorAll(".stat-big-val").forEach(function (el) {
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || "";
        var duration = 1400;
        var start    = performance.now();

        function passo(agora) {
            var t   = Math.min((agora - start) / duration, 1);
            var val = Math.round(t * t * target); /* ease in */
            el.textContent = val + suffix;
            if (t < 1) { requestAnimationFrame(passo); }
            else       { el.textContent = target + suffix; }
        }
        requestAnimationFrame(passo);
    });

    /* Rings SVG */
    document.querySelectorAll(".ring-fill").forEach(function (el) {
        var pct    = parseFloat(el.dataset.pct);
        var circum = 213.6;
        var offset = circum - (pct / 100) * circum;
        el.style.strokeDashoffset = offset;

        /* contador textual do ring */
        var wrap  = el.closest(".stat-ring-wrap");
        var valEl = wrap ? wrap.querySelector(".stat-ring-val") : null;
        if (!valEl) { return; }

        var suffix  = valEl.dataset.suffix || "%";
        var target  = parseInt(valEl.dataset.target, 10);
        var duration= 1400;
        var start   = performance.now();

        function passo(agora) {
            var t   = Math.min((agora - start) / duration, 1);
            var val = Math.round(t * t * target);
            valEl.textContent = val + suffix;
            if (t < 1) { requestAnimationFrame(passo); }
            else       { valEl.textContent = target + suffix; }
        }
        requestAnimationFrame(passo);
    });

    /* Barras do gráfico */
    document.querySelectorAll(".chart-bar").forEach(function (b) {
        var pct    = parseFloat(b.dataset.pct);
        var maxH   = 120;
        var altura = (pct / 100) * maxH;
        b.style.transition = "height 1.2s cubic-bezier(.34,1.2,.64,1)";
        b.style.height     = altura + "px";
    });
}

function iniciarObserverStats() {
    if (!window.IntersectionObserver) {
        animarEstatisticas();
        return;
    }

    var obs = new IntersectionObserver(function (entries, ob) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                animarEstatisticas();
                ob.disconnect();
            }
        });
    }, { threshold: 0.2 });

    var statsEl = document.getElementById("stats-grid");
    if (statsEl) { obs.observe(statsEl); }
}


/* ════════════════════════════════════════════════════════════
   3. QUIZ VOCACIONAL
   ════════════════════════════════════════════════════════════ */

var quizData = [
    { pergunta: "O que mais te atrai?",                     a: "Resolver problemas com lógica",     b: "Ajudar pessoas",               c: "Organizar projetos"          },
    { pergunta: "Qual atividade você curte mais?",          a: "Programar ou mexer no PC",          b: "Trabalhar em equipe",          c: "Planejar tarefas ou liderar" },
    { pergunta: "Qual seu estilo de trabalho?",             a: "Autônomo e criativo",               b: "Colaborativo e humano",        c: "Focado e estratégico"        },
    { pergunta: "Onde você se imagina atuando?",            a: "Empresa de tecnologia",             b: "Hospital ou Unidade de Saúde", c: "Escritório ou empresa"       },
    { pergunta: "Qual ferramenta acha mais interessante?",  a: "Algoritmos e códigos",              b: "Procedimentos de saúde",       c: "Gestão de projetos"          },
    { pergunta: "Você prefere aprender com:",               a: "Desafios técnicos",                 b: "Atendimento a pessoas",        c: "Planejamento e organização"  },
    { pergunta: "O que você valoriza em uma carreira?",     a: "Inovação",                          b: "Cuidado",                      c: "Estratégia"                  },
    { pergunta: "No trabalho você gosta de:",               a: "Automatizar processos",             b: "Apoiar o próximo",             c: "Tomar decisões"              },
    { pergunta: "Seu horário ideal é:",                     a: "Flexível e digital",                b: "Rotina com turnos",            c: "Agenda estruturada"          },
    { pergunta: "Em um projeto você gosta de:",             a: "Criar soluções novas",              b: "Trabalhar com pessoas",        c: "Organizar resultados"        },
    { pergunta: "Você se vê mais como:",                    a: "Programador",                       b: "Profissional da saúde",        c: "Líder de equipe"             },
    { pergunta: "Qual habilidade gostaria de desenvolver?", a: "Lógica e programação",              b: "Cuidados e empatia",           c: "Gestão e planejamento"       },
    { pergunta: "Você se interessa mais por:",              a: "Robótica e sistemas",               b: "Enfermagem e biossegurança",   c: "Administração e finanças"    },
    { pergunta: "Seu trabalho perfeito inclui:",            a: "Tecnologia de ponta",               b: "Contato humano",               c: "Resultados organizados"      },
    { pergunta: "O que você considera mais importante?",    a: "Criatividade técnica",              b: "Bem-estar do outro",           c: "Eficiência administrativa"   }
];

var TOTAL_QUIZ = 6;

var elQuizStart    = document.getElementById("quiz-start");
var elQuizQuestion = document.getElementById("quiz-question");
var elQuizResult   = document.getElementById("quiz-result");
var elStartBtn     = document.getElementById("start-quiz");
var elRestartBtn   = document.getElementById("restart-quiz");
var elQuizForm     = document.getElementById("quiz-form");
var elCounter      = document.getElementById("quiz-counter");
var elProgressFill = document.getElementById("quiz-progress-fill");
var elQuestionTitle= document.getElementById("question-title");
var elAnswerA      = document.getElementById("answer-a");
var elAnswerB      = document.getElementById("answer-b");
var elAnswerC      = document.getElementById("answer-c");
var elResultIcon   = document.getElementById("result-icon");
var elResultTitle  = document.getElementById("result-title");
var elResultText   = document.getElementById("result-text");

var perguntaAtual         = 0;
var pontuacaoQuiz         = { a: 0, b: 0, c: 0 };
var perguntasSelecionadas = [];
var quizPontosJaGanhos    = false;

function iniciarQuiz() {
    perguntaAtual   = 0;
    pontuacaoQuiz   = { a: 0, b: 0, c: 0 };

    perguntasSelecionadas = [...quizData]
        .sort(function () { return Math.random() - 0.5; })
        .slice(0, TOTAL_QUIZ);

    elQuizStart.classList.add("hide");
    elQuizResult.classList.add("hide");
    elQuizQuestion.classList.remove("hide");

    mostrarPergunta();
}

function mostrarPergunta() {
    var p = perguntasSelecionadas[perguntaAtual];

    elCounter.textContent = "Pergunta " + (perguntaAtual + 1) + " de " + TOTAL_QUIZ;
    elProgressFill.style.width = ((perguntaAtual / TOTAL_QUIZ) * 100) + "%";

    elQuestionTitle.textContent = p.pergunta;
    elAnswerA.textContent = p.a;
    elAnswerB.textContent = p.b;
    elAnswerC.textContent = p.c;

    elQuizForm.reset();
}

function mostrarResultado() {
    var curso, descricao, icone;

    if (pontuacaoQuiz.a >= pontuacaoQuiz.b && pontuacaoQuiz.a >= pontuacaoQuiz.c) {
        curso     = "Técnico em Informática";
        descricao = "Você tem perfil voltado para tecnologia, lógica e inovação. Adora criar soluções e resolver desafios com código.";
        icone     = "💻";
    } else if (pontuacaoQuiz.b >= pontuacaoQuiz.a && pontuacaoQuiz.b >= pontuacaoQuiz.c) {
        curso     = "Técnico em Enfermagem";
        descricao = "Você tem perfil humano, empático e voltado ao cuidado. Sua vocação é ajudar pessoas e fazer diferença na saúde.";
        icone     = "🩺";
    } else {
        curso     = "Técnico em Administração";
        descricao = "Você tem perfil estratégico, organizado e com potencial de liderança. Sabe gerenciar recursos e conduzir equipes.";
        icone     = "📊";
    }

    localStorage.setItem("resultadoQuiz", curso);

    var selectCurso = document.getElementById("lead-curso");
    if (selectCurso) { selectCurso.value = curso; }

    elProgressFill.style.width = "100%";
    elQuizQuestion.classList.add("hide");
    elQuizResult.classList.remove("hide");

    elResultIcon.textContent  = icone;
    elResultTitle.textContent = "Curso recomendado: " + curso;
    elResultText.textContent  = descricao + " Clique em \"Fazer Matrícula\" e comece sua jornada no Colégio Técnico KNOW!";

    /* Pontos apenas 1x por sessão */
    if (!quizPontosJaGanhos) {
        quizPontosJaGanhos = true;
        adicionarPontos("quiz_completo");
    }
}

elQuizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var resposta = document.querySelector('input[name="answer"]:checked');
    if (!resposta) {
        alert("Selecione uma alternativa antes de continuar.");
        return;
    }

    pontuacaoQuiz[resposta.value]++;
    perguntaAtual++;

    if (perguntaAtual >= TOTAL_QUIZ) {
        mostrarResultado();
    } else {
        mostrarPergunta();
    }
});

elStartBtn.addEventListener("click",   iniciarQuiz);
elRestartBtn.addEventListener("click", iniciarQuiz);


/* ════════════════════════════════════════════════════════════
   4. RASPADINHA DE MARKETING
   ════════════════════════════════════════════════════════════
   Loot table com pesos por tier:
   Bronze:   pool padrão
   Prata:    +15% probabilidade para prêmios Ouro
   Ouro:     +30% probabilidade para prêmios Diamante
   Diamante: apenas prêmios Ouro e Diamante
   ════════════════════════════════════════════════════════════ */

var todosPremios = [
    { nome: "Camiseta personalizada KNOW",             nivel: "ouro",     peso: 10 },
    { nome: "Kit de materiais exclusivos KNOW",        nivel: "prata",    peso: 15 },
    { nome: "Livro técnico + Caneca KNOW",             nivel: "ouro",     peso: 10 },
    { nome: "15% de desconto na matrícula",            nivel: "diamante", peso: 4  },
    { nome: "Entrada VIP no Evento de Tecnologia",     nivel: "prata",    peso: 12 },
    { nome: "Fone de ouvido Bluetooth KNOW",           nivel: "ouro",     peso: 8  },
    { nome: "Caderno inteligente KNOW",                nivel: "bronze",   peso: 20 },
    { nome: "Power bank exclusivo KNOW",               nivel: "ouro",     peso: 8  },
    { nome: "10% de desconto na matrícula",            nivel: "diamante", peso: 5  },
    { nome: "Pen drive 64 GB personalizado",           nivel: "prata",    peso: 12 },
    { nome: "Caneca exclusiva KNOW",                   nivel: "bronze",   peso: 20 },
    { nome: "Adesivos e pin KNOW",                     nivel: "bronze",   peso: 20 }
];

var SCRATCH_KEY    = "knowScratchData";
var MAX_TENTATIVAS = 3;

var elScratchBtn       = document.getElementById("scratch-btn");
var elScratchCover     = document.getElementById("scratch-cover");
var elScratchReveal    = document.getElementById("scratch-reveal");
var elPrizeLevel       = document.getElementById("prize-level");
var elPrizeName        = document.getElementById("prize-name");
var elScratchMsg       = document.getElementById("scratch-msg");
var elScratchMatricula = document.getElementById("scratch-matricula");
var elScratchFooter    = document.getElementById("scratch-footer");

var elBtnFicar  = null;
var elBtnTentar = null;

function criarBotoesDecisao() {
    if (document.getElementById("btn-ficar")) { return; }

    elBtnFicar  = document.createElement("button");
    elBtnFicar.id          = "btn-ficar";
    elBtnFicar.className   = "btn btn-primary";
    elBtnFicar.textContent = "✔ Ficar com este prêmio";

    elBtnTentar = document.createElement("button");
    elBtnTentar.id          = "btn-tentar";
    elBtnTentar.className   = "btn btn-secondary";
    elBtnTentar.textContent = "🎲 Tentar novamente";

    elScratchFooter.appendChild(elBtnFicar);
    elScratchFooter.appendChild(elBtnTentar);

    elBtnFicar.addEventListener("click",  finalizarComPremio);
    elBtnTentar.addEventListener("click", tentarNovamente);
}

function carregarEstadoScratch() {
    try {
        var dados = JSON.parse(localStorage.getItem(SCRATCH_KEY));
        if (!dados) { return null; }
        if (new Date(dados.date).toDateString() !== new Date().toDateString()) { return null; }
        return dados;
    } catch (e) {
        return null;
    }
}

function salvarEstadoScratch(estado) {
    localStorage.setItem(SCRATCH_KEY, JSON.stringify(estado));
}

function cadastrouHoje() {
    try {
        var leads = JSON.parse(localStorage.getItem("knowLeads")) || [];
        return leads.length > 0;
    } catch (e) {
        return false;
    }
}

function premioBadge(nivel) {
    return { ouro: "Prêmio Ouro", prata: "Prêmio Prata", diamante: "Prêmio Diamante", bronze: "Prêmio Bronze" }[nivel] || nivel;
}

/* ── Sorteia prêmio levando em conta o tier do jogador ── */
function sortearPremio() {
    var pts  = carregarPontos();
    var tier = getTier(pts);

    /* Copia e ajusta pesos conforme tier */
    var pool = todosPremios.map(function (p) {
        var peso = p.peso;
        if (tier === "prata") {
            if (p.nivel === "ouro")     { peso = Math.round(peso * 1.15); }
        } else if (tier === "ouro") {
            if (p.nivel === "diamante") { peso = Math.round(peso * 1.30); }
            if (p.nivel === "ouro")     { peso = Math.round(peso * 1.20); }
        } else if (tier === "diamante") {
            /* Apenas Ouro e Diamante */
            if (p.nivel === "bronze" || p.nivel === "prata") { peso = 0; }
            else { peso = Math.round(peso * 1.5); }
        }
        return { premio: p, peso: peso };
    }).filter(function (x) { return x.peso > 0; });

    var total = pool.reduce(function (s, x) { return s + x.peso; }, 0);
    var roll  = Math.random() * total;
    var acum  = 0;

    for (var i = 0; i < pool.length; i++) {
        acum += pool[i].peso;
        if (roll <= acum) { return pool[i].premio; }
    }
    return pool[pool.length - 1].premio;
}

function revelarPremio(premio) {
    elScratchCover.classList.add("hide");
    elScratchReveal.classList.remove("hide");
    elPrizeLevel.textContent = premioBadge(premio.nivel);
    elPrizeLevel.className   = "prize-level " + premio.nivel;
    elPrizeName.textContent  = premio.nome;
}

function finalizarComPremio() {
    var estado = carregarEstadoScratch();
    if (!estado) { return; }

    estado.finalizado = true;
    salvarEstadoScratch(estado);

    if (elBtnFicar)  { elBtnFicar.classList.add("hide"); }
    if (elBtnTentar) { elBtnTentar.classList.add("hide"); }
    elScratchBtn.classList.add("hide");

    elScratchMsg.textContent = "🎉 Parabéns! Apresente esta tela na secretaria para resgatar seu prêmio.";
    elScratchMsg.classList.remove("hide");

    if (estado.premioAtual.nivel === "diamante") {
        elScratchMatricula.classList.remove("hide");
    }
}

function tentarNovamente() {
    var estado = carregarEstadoScratch();
    if (!estado) { return; }

    if (estado.tentativasUsadas >= MAX_TENTATIVAS) {
        finalizarComPremio();
        return;
    }

    var novoPremio = sortearPremio();
    estado.premioAtual      = novoPremio;
    estado.tentativasUsadas = estado.tentativasUsadas + 1;
    salvarEstadoScratch(estado);

    revelarPremio(novoPremio);
    atualizarBotoesDecisao(estado);
}

function atualizarBotoesDecisao(estado) {
    if (!elBtnFicar || !elBtnTentar) { return; }

    var restantes = MAX_TENTATIVAS - estado.tentativasUsadas;

    elBtnFicar.classList.remove("hide");

    if (restantes > 0 && !estado.finalizado) {
        elBtnTentar.classList.remove("hide");
        elBtnTentar.textContent = "🎲 Tentar novamente (" + restantes + " restante" + (restantes > 1 ? "s" : "") + ")";
        elScratchMsg.textContent = "⚠️ Atenção: tentar novamente descarta este prêmio!";
        elScratchMsg.classList.remove("hide");
    } else {
        elBtnTentar.classList.add("hide");
        elScratchMsg.textContent = "Última tentativa! Escolha ficar com este prêmio.";
        elScratchMsg.classList.remove("hide");
    }
}

function atualizarInfoTierRaspadinha(tier, pts) {
    var el = document.getElementById("scratch-tier-info");
    if (!el) { return; }

    var msgs = {
        bronze:   "🥉 Nível Bronze — pool padrão de prêmios.",
        prata:    "🥈 Nível Prata — +15% de chance em prêmios Ouro!",
        ouro:     "🥇 Nível Ouro — +30% de chance em prêmios Diamante!",
        diamante: "💎 Nível Diamante — apenas prêmios Ouro e Diamante garantidos!"
    };

    el.textContent = msgs[tier] || msgs.bronze;
}

function raspar() {
    if (!cadastrouHoje()) {
        elScratchMsg.textContent = "📋 Faça seu cadastro abaixo para liberar a raspadinha!";
        elScratchMsg.classList.remove("hide");
        elScratchBtn.disabled = true;
        return;
    }

    var estado = carregarEstadoScratch();

    if (estado && estado.finalizado) {
        revelarPremio(estado.premioAtual);
        elScratchBtn.classList.add("hide");
        elScratchMsg.textContent = "🎉 Prêmio garantido! Apresente na secretaria.";
        elScratchMsg.classList.remove("hide");
        if (estado.premioAtual.nivel === "diamante") { elScratchMatricula.classList.remove("hide"); }
        return;
    }

    if (estado && !estado.finalizado) {
        criarBotoesDecisao();
        revelarPremio(estado.premioAtual);
        elScratchBtn.classList.add("hide");
        atualizarBotoesDecisao(estado);
        return;
    }

    /* Primeira raspagem do dia */
    adicionarPontos("raspadinha");

    var premioInicial = sortearPremio();
    var novoEstado = {
        date:             new Date().toISOString(),
        premioAtual:      premioInicial,
        tentativasUsadas: 1,
        finalizado:       false
    };
    salvarEstadoScratch(novoEstado);

    criarBotoesDecisao();
    revelarPremio(premioInicial);
    elScratchBtn.classList.add("hide");
    atualizarBotoesDecisao(novoEstado);
}

elScratchCover.addEventListener("click", raspar);
elScratchBtn.addEventListener("click",   raspar);

(function iniciarRaspadinha() {
    var estado = carregarEstadoScratch();

    if (!estado) {
        if (!cadastrouHoje()) {
            elScratchMsg.textContent = "📋 Cadastre-se abaixo para liberar a raspadinha!";
            elScratchMsg.classList.remove("hide");
            elScratchBtn.disabled = true;
        }
        return;
    }

    if (estado.finalizado) {
        revelarPremio(estado.premioAtual);
        elScratchBtn.classList.add("hide");
        elScratchMsg.textContent = "🎉 Prêmio garantido! Apresente na secretaria.";
        elScratchMsg.classList.remove("hide");
        if (estado.premioAtual.nivel === "diamante") { elScratchMatricula.classList.remove("hide"); }
        return;
    }

    criarBotoesDecisao();
    revelarPremio(estado.premioAtual);
    elScratchBtn.classList.add("hide");
    atualizarBotoesDecisao(estado);
})();


/* ════════════════════════════════════════════════════════════
   5. FORMULÁRIO DE LEADS + PAINEL ADMIN
   ════════════════════════════════════════════════════════════ */

var LEADS_KEY = "knowLeads";

var elLeadForm    = document.getElementById("lead-form");
var elFeedback    = document.getElementById("form-feedback");
var elInputNome   = document.getElementById("lead-nome");
var elInputIdade  = document.getElementById("lead-idade");
var elInputEmail  = document.getElementById("lead-email");
var elSelectCurso = document.getElementById("lead-curso");

var elErroNome  = document.getElementById("erro-nome");
var elErroIdade = document.getElementById("erro-idade");
var elErroEmail = document.getElementById("erro-email");
var elErroCurso = document.getElementById("erro-curso");

var elAdminTable = document.getElementById("admin-table");
var elAdminTbody = document.getElementById("admin-tbody");
var elAdminEmpty = document.getElementById("admin-empty");
var elLeadCount  = document.getElementById("lead-count");
var elClearLeads = document.getElementById("clear-leads");

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function limparErros() {
    elErroNome.textContent  = "";
    elErroIdade.textContent = "";
    elErroEmail.textContent = "";
    elErroCurso.textContent = "";
    elFeedback.textContent  = "";
    elFeedback.className    = "form-feedback";

    [elInputNome, elInputIdade, elInputEmail, elSelectCurso].forEach(function (el) {
        el.classList.remove("invalid");
    });
}

function marcarInvalido(campo, msg, elErro) {
    campo.classList.add("invalid");
    elErro.textContent = msg;
}

function validarFormulario() {
    var valido = true;
    var nome   = elInputNome.value.trim();
    var idade  = parseInt(elInputIdade.value, 10);
    var email  = elInputEmail.value.trim();
    var curso  = elSelectCurso.value;

    if (nome.length < 3) {
        marcarInvalido(elInputNome, "Informe o nome completo (mínimo 3 caracteres).", elErroNome);
        valido = false;
    }
    if (!elInputIdade.value || isNaN(idade) || idade < 14 || idade > 99) {
        marcarInvalido(elInputIdade, "Informe uma idade válida (14 a 99 anos).", elErroIdade);
        valido = false;
    }
    if (!emailValido(email)) {
        marcarInvalido(elInputEmail, "Informe um e-mail válido (ex: nome@dominio.com).", elErroEmail);
        valido = false;
    }
    if (!curso) {
        marcarInvalido(elSelectCurso, "Selecione um curso de interesse.", elErroCurso);
        valido = false;
    }

    return valido;
}

[elInputNome, elInputIdade, elInputEmail, elSelectCurso].forEach(function (el) {
    el.addEventListener("input", function () {
        el.classList.remove("invalid");
        var sufixo = el.id.replace("lead-", "");
        var elErro = document.getElementById("erro-" + sufixo);
        if (elErro) { elErro.textContent = ""; }
        elFeedback.textContent = "";
    });
});

function carregarLeads() {
    try { return JSON.parse(localStorage.getItem(LEADS_KEY)) || []; }
    catch (err) { return []; }
}

function persistirLeads(leads) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

function adicionarLead(lead) {
    var leads = carregarLeads();
    leads.push(lead);
    persistirLeads(leads);
    renderizarTabela();
}

function removerLead(id) {
    var leads = carregarLeads().filter(function (l) { return l.id !== id; });
    persistirLeads(leads);
    renderizarTabela();
}

function limparTodosLeads() {
    if (!confirm("Deseja apagar todos os cadastros? Esta ação não pode ser desfeita.")) { return; }
    localStorage.removeItem(LEADS_KEY);
    renderizarTabela();
}

elLeadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    limparErros();
    if (!validarFormulario()) { return; }

    var lead = {
        id:    Date.now(),
        nome:  elInputNome.value.trim(),
        idade: parseInt(elInputIdade.value, 10),
        email: elInputEmail.value.trim(),
        curso: elSelectCurso.value,
        data:  new Date().toLocaleDateString("pt-BR")
    };

    adicionarLead(lead);
    adicionarPontos("cadastro");

    elFeedback.textContent = "✅ Cadastro realizado! Sua raspadinha foi liberada — suba até Quiz & Raspadinha para jogar!";
    elFeedback.className   = "form-feedback feedback-success";
    elLeadForm.reset();

    liberarRaspadinhaPorCadastro();
});

function liberarRaspadinhaPorCadastro() {
    if (elScratchBtn.disabled && !carregarEstadoScratch()) {
        elScratchBtn.disabled = false;
        elScratchMsg.textContent = "🎉 Raspadinha liberada! Você tem " + MAX_TENTATIVAS + " tentativas hoje.";
        elScratchMsg.classList.remove("hide");
    }
}

elClearLeads.addEventListener("click", limparTodosLeads);

function escapar(str) {
    return String(str)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderizarTabela() {
    var leads = carregarLeads();

    elLeadCount.textContent = leads.length === 1 ? "1 cadastro" : leads.length + " cadastros";

    if (leads.length === 0) {
        elAdminEmpty.classList.remove("hide");
        elAdminTable.classList.add("hide");
        return;
    }

    elAdminEmpty.classList.add("hide");
    elAdminTable.classList.remove("hide");
    elAdminTbody.innerHTML = "";

    var invertidos = leads.slice().reverse();

    invertidos.forEach(function (lead, i) {
        var tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + (leads.length - i) + "</td>" +
            "<td>" + escapar(lead.nome)  + "</td>" +
            "<td>" + lead.idade          + "</td>" +
            "<td>" + escapar(lead.email) + "</td>" +
            "<td>" + escapar(lead.curso) + "</td>" +
            "<td>" + lead.data           + "</td>" +
            "<td><button class='btn-remove' data-id='" + lead.id + "' title='Remover'>✕</button></td>";
        elAdminTbody.appendChild(tr);
    });

    elAdminTbody.querySelectorAll(".btn-remove").forEach(function (btn) {
        btn.addEventListener("click", function () { removerLead(Number(btn.dataset.id)); });
    });
}


/* ════════════════════════════════════════════════════════════
   6. SISTEMA DE FEEDBACK
   ════════════════════════════════════════════════════════════ */

var FEEDBACKS_KEY = "knowFeedbacks";

var elFbForm     = document.getElementById("feedback-form");
var elFbNome     = document.getElementById("fb-nome");
var elFbTipo     = document.getElementById("fb-tipo");
var elFbNota     = document.getElementById("fb-nota");
var elFbTexto    = document.getElementById("fb-texto");
var elFbMsg      = document.getElementById("fb-feedback-msg");

var elErroFbNome  = document.getElementById("erro-fb-nome");
var elErroFbTipo  = document.getElementById("erro-fb-tipo");
var elErroFbNota  = document.getElementById("erro-fb-nota");
var elErroFbTexto = document.getElementById("erro-fb-texto");

var elFbMural    = document.getElementById("feedback-mural");
var elFbEmpty    = document.getElementById("fb-empty");
var elFbAvg      = document.getElementById("fb-avg-stars");
var elFbCount    = document.getElementById("fb-count");

var notaSelecionada = 0;

/* Star rating interativo */
var starBtns = document.querySelectorAll(".star-btn");

starBtns.forEach(function (btn) {
    btn.addEventListener("mouseenter", function () {
        var val = parseInt(btn.dataset.val, 10);
        starBtns.forEach(function (b) {
            b.classList.toggle("hover", parseInt(b.dataset.val, 10) <= val);
        });
    });

    btn.addEventListener("mouseleave", function () {
        starBtns.forEach(function (b) {
            b.classList.remove("hover");
            b.classList.toggle("active", parseInt(b.dataset.val, 10) <= notaSelecionada);
        });
    });

    btn.addEventListener("click", function () {
        notaSelecionada = parseInt(btn.dataset.val, 10);
        elFbNota.value  = notaSelecionada;
        starBtns.forEach(function (b) {
            b.classList.toggle("active", parseInt(b.dataset.val, 10) <= notaSelecionada);
        });
        if (elErroFbNota) { elErroFbNota.textContent = ""; }
    });
});

function carregarFeedbacks() {
    try { return JSON.parse(localStorage.getItem(FEEDBACKS_KEY)) || []; }
    catch (e) { return []; }
}

function persistirFeedbacks(fbs) {
    localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(fbs));
}

function validarFeedback() {
    var valido = true;

    if (elErroFbNome)  { elErroFbNome.textContent  = ""; }
    if (elErroFbTipo)  { elErroFbTipo.textContent  = ""; }
    if (elErroFbNota)  { elErroFbNota.textContent  = ""; }
    if (elErroFbTexto) { elErroFbTexto.textContent = ""; }

    [elFbNome, elFbTipo, elFbTexto].forEach(function (el) {
        if (el) { el.classList.remove("invalid"); }
    });

    if (!elFbNome.value.trim() || elFbNome.value.trim().length < 2) {
        elFbNome.classList.add("invalid");
        if (elErroFbNome) { elErroFbNome.textContent = "Informe seu nome (mínimo 2 caracteres)."; }
        valido = false;
    }
    if (!elFbTipo.value) {
        elFbTipo.classList.add("invalid");
        if (elErroFbTipo) { elErroFbTipo.textContent = "Selecione seu perfil."; }
        valido = false;
    }
    if (!notaSelecionada) {
        if (elErroFbNota) { elErroFbNota.textContent = "Selecione uma avaliação de 1 a 5 estrelas."; }
        valido = false;
    }
    if (!elFbTexto.value.trim() || elFbTexto.value.trim().length < 10) {
        elFbTexto.classList.add("invalid");
        if (elErroFbTexto) { elErroFbTexto.textContent = "Escreva pelo menos 10 caracteres."; }
        valido = false;
    }

    return valido;
}

elFbForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFeedback()) { return; }

    var fb = {
        id:    Date.now(),
        nome:  elFbNome.value.trim(),
        tipo:  elFbTipo.value,
        nota:  notaSelecionada,
        texto: elFbTexto.value.trim(),
        data:  new Date().toLocaleDateString("pt-BR")
    };

    var fbs = carregarFeedbacks();
    fbs.push(fb);
    persistirFeedbacks(fbs);

    renderizarFeedbacks();
    adicionarPontos("feedback_enviado");

    elFbMsg.textContent = "✅ Obrigado pelo seu depoimento!";
    elFbMsg.className   = "form-feedback feedback-success";

    elFbForm.reset();
    notaSelecionada = 0;
    starBtns.forEach(function (b) { b.classList.remove("active"); });
});

function starsHTML(nota) {
    var s = "";
    for (var i = 1; i <= 5; i++) {
        s += i <= nota ? "★" : "☆";
    }
    return s;
}

function renderizarFeedbacks() {
    var fbs = carregarFeedbacks();

    if (fbs.length === 0) {
        if (elFbEmpty) { elFbEmpty.classList.remove("hide"); }
        return;
    }

    if (elFbEmpty) { elFbEmpty.classList.add("hide"); }

    /* Média */
    var soma = fbs.reduce(function (s, f) { return s + f.nota; }, 0);
    var media = (soma / fbs.length).toFixed(1);

    if (elFbAvg)   { elFbAvg.textContent   = "★ " + media; }
    if (elFbCount) { elFbCount.textContent = fbs.length + " avaliação" + (fbs.length !== 1 ? "ões" : ""); }

    /* Mural — mais recentes primeiro */
    elFbMural.innerHTML = "";

    fbs.slice().reverse().forEach(function (fb) {
        var card = document.createElement("div");
        card.className = "fb-card";
        card.innerHTML =
            "<div class='fb-card-header'>" +
                "<div>" +
                    "<span class='fb-card-author'>" + escapar(fb.nome) + "</span>" +
                    " <span class='fb-card-tipo'>" + escapar(fb.tipo) + "</span>" +
                "</div>" +
                "<span class='fb-card-stars'>" + starsHTML(fb.nota) + "</span>" +
            "</div>" +
            "<p class='fb-card-text'>" + escapar(fb.texto) + "</p>" +
            "<span class='fb-card-date'>" + fb.data + "</span>";
        elFbMural.appendChild(card);
    });
}


/* ════════════════════════════════════════════════════════════
   INICIALIZAÇÃO GLOBAL
   ════════════════════════════════════════════════════════════ */

renderizarTabela();
renderizarFeedbacks();
construirGrafico();
iniciarObserverStats();
iniciarObserverVisitas();
atualizarBarraPontos();

(function preencherCursoSalvo() {
    var cursoSalvo = localStorage.getItem("resultadoQuiz");
    if (cursoSalvo && elSelectCurso) { elSelectCurso.value = cursoSalvo; }
})();