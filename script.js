/* ============================================================
   COLÉGIO TÉCNICO KNOW — script.js  (v3 — raspadinha canvas)
   ============================================================ */

/* ── Imagem da raspadinha (base64 inline) ── */
window.RASPADINHA_IMG_SRC = "data:image/png;base64,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";

/* ════════════════════════════════════════════════════════════
   1. SISTEMA DE PONTOS
   ════════════════════════════════════════════════════════════ */

var POINTS_KEY         = "knowPoints";
var POINTS_ACTIONS_KEY = "knowPointsActions";

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
    return parseInt(sessionStorage.getItem(POINTS_KEY) || "0", 10);
}

function salvarPontos(pts) {
    sessionStorage.setItem(POINTS_KEY, String(pts));
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

    document.querySelectorAll(".ptl-item").forEach(function (el) {
        el.classList.remove("active");
    });
    var tierEl = document.querySelector("." + tier + "-item");
    if (tierEl) { tierEl.classList.add("active"); }

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
            b.className        = "chart-bar";
            b.style.background = cor;
            b.dataset.pct      = pct;
            b.dataset.tip      = label + ": " + pct + "%";
            b.style.height     = "0px";
            barras.appendChild(b);
        }

        criarBarra(d.inf, "var(--primary)",      "Informática");
        criarBarra(d.enf, "var(--scratch-gold)", "Enfermagem");
        criarBarra(d.adm, "var(--success)",       "Administração");

        var label = document.createElement("div");
        label.className   = "chart-year-label";
        label.textContent = d.ano;

        grupo.appendChild(barras);
        grupo.appendChild(label);
        container.appendChild(grupo);
    });
}

function animarEstatisticas() {
    document.querySelectorAll(".stat-big-val").forEach(function (el) {
        var target   = parseInt(el.dataset.target, 10);
        var suffix   = el.dataset.suffix || "";
        var duration = 1400;
        var start    = performance.now();

        function passo(agora) {
            var t   = Math.min((agora - start) / duration, 1);
            var val = Math.round(t * t * target);
            el.textContent = val + suffix;
            if (t < 1) { requestAnimationFrame(passo); }
            else       { el.textContent = target + suffix; }
        }
        requestAnimationFrame(passo);
    });

    document.querySelectorAll(".ring-fill").forEach(function (el) {
        var pct    = parseFloat(el.dataset.pct);
        var circum = 213.6;
        var offset = circum - (pct / 100) * circum;
        el.style.strokeDashoffset = offset;

        var wrap  = el.closest(".stat-ring-wrap");
        var valEl = wrap ? wrap.querySelector(".stat-ring-val") : null;
        if (!valEl) { return; }

        var suffix   = valEl.dataset.suffix || "%";
        var target   = parseInt(valEl.dataset.target, 10);
        var duration = 1400;
        var start    = performance.now();

        function passo(agora) {
            var t   = Math.min((agora - start) / duration, 1);
            var val = Math.round(t * t * target);
            valEl.textContent = val + suffix;
            if (t < 1) { requestAnimationFrame(passo); }
            else       { valEl.textContent = target + suffix; }
        }
        requestAnimationFrame(passo);
    });

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
    perguntaAtual  = 0;
    pontuacaoQuiz  = { a: 0, b: 0, c: 0 };

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
   4. RASPADINHA COM CANVAS — sistema match-3
   ════════════════════════════════════════════════════════════
   LÓGICA:
   • 8 bolinhas recebem símbolos INDIVIDUAIS e ALEATÓRIOS
   • Cada símbolo representa um item de premiação diferente
   • O usuário GANHA se 3 ou mais bolinhas exibirem o MESMO símbolo
   • O prêmio ganho corresponde ao símbolo que mais aparece
   • Caso contrário: NÃO GANHOU — mensagem de "não foi dessa vez"
   • Probabilidade base de vitória ~40 %; sobe com tier do jogador
   • Cada bolinha pode exibir qualquer um dos símbolos disponíveis,
     tornando o visual sempre variado e imprevisível
   ════════════════════════════════════════════════════════════ */

/* ── Catálogo de símbolos / prêmios ── */
var SIMBOLOS = [
    { id: "caderno",    icone: "📓", cor: "#d4975a", nivel: "bronze",   nome: "Caderno inteligente KNOW"            },
    { id: "caneca",     icone: "☕", cor: "#c3b9d9", nivel: "prata",    nome: "Kit Caneca + Livro técnico KNOW"     },
    { id: "kit",        icone: "🎒", cor: "#c3b9d9", nivel: "prata",    nome: "Kit de materiais exclusivos KNOW"    },
    { id: "fone",       icone: "🎧", cor: "#f2c94c", nivel: "ouro",     nome: "Fone de ouvido Bluetooth KNOW"       },
    { id: "camiseta",   icone: "👕", cor: "#f2c94c", nivel: "ouro",     nome: "Camiseta personalizada KNOW"         },
    { id: "powerbank",  icone: "🔋", cor: "#f2c94c", nivel: "ouro",     nome: "Power bank exclusivo KNOW"           },
    { id: "vip",        icone: "🎟️", cor: "#a78bfa", nivel: "diamante", nome: "Entrada VIP no Evento de Tecnologia" },
    { id: "desconto",   icone: "🏷️", cor: "#a78bfa", nivel: "diamante", nome: "15% de desconto na matrícula"        },
];

/*
 * Pesos de sorteio por tier — quantas vezes cada símbolo pode
 * entrar no pool para preencher as 8 bolinhas.
 * Símbolos de tier superior aparecem com menor frequência no pool,
 * mas o tier do jogador aumenta as chances de vitória geral.
 */
var PESOS_SIMBOLO = {
    bronze:   { bronze: 5, prata: 3, ouro: 2, diamante: 1 },
    prata:    { bronze: 3, prata: 4, ouro: 3, diamante: 1 },
    ouro:     { bronze: 2, prata: 3, ouro: 4, diamante: 2 },
    diamante: { bronze: 0, prata: 1, ouro: 4, diamante: 3 },
};

/*
 * Probabilidade base de vitória por tier.
 * O sorteio das bolinhas é manipulado para atingir essa taxa:
 * se o dado de vitória cair, forcamos pelo menos 3 iguais.
 */
var CHANCE_VITORIA = {
    bronze:   0.38,
    prata:    0.48,
    ouro:     0.58,
    diamante: 0.70,
};

var SCRATCH_KEY    = "knowScratchData";
var MAX_TENTATIVAS = 3;

var elScratchMsg       = document.getElementById("scratch-msg");
var elScratchMatricula = document.getElementById("scratch-matricula");
var elScratchFooter    = document.getElementById("scratch-footer");
var elScratchBtn       = document.getElementById("scratch-btn");

var elBtnFicar  = null;
var elBtnTentar = null;

/*
 * Spots da raspadinha — 8 círculos em coordenadas relativas.
 * r é fração da LARGURA do canvas (imagem ~1.75:1 paisagem).
 */
var SPOTS_REL = [
    { cx: 0.455, cy: 0.525, r: 0.055 },
    { cx: 0.570, cy: 0.525, r: 0.055 },
    { cx: 0.685, cy: 0.525, r: 0.055 },
    { cx: 0.800, cy: 0.525, r: 0.055 },
    { cx: 0.455, cy: 0.785, r: 0.055 },
    { cx: 0.570, cy: 0.785, r: 0.055 },
    { cx: 0.685, cy: 0.785, r: 0.055 },
    { cx: 0.800, cy: 0.785, r: 0.055 },
];

var scratchCanvasInitialized = false;
var spotsState = SPOTS_REL.map(function () { return { scratched: false, pct: 0 }; });

/* ── Utilitários de símbolos ── */

/* Sorteia um símbolo do pool levando em conta os pesos de tier */
function sortearSimbolo(tier, pesosOverride) {
    var pesos = pesosOverride || PESOS_SIMBOLO[tier] || PESOS_SIMBOLO.bronze;
    var pool  = [];
    SIMBOLOS.forEach(function (s) {
        var w = pesos[s.nivel] || 0;
        for (var i = 0; i < w; i++) { pool.push(s); }
    });
    if (!pool.length) { return SIMBOLOS[0]; }
    return pool[Math.floor(Math.random() * pool.length)];
}

/*
 * Gera o array de 8 símbolos para as bolinhas.
 * Decide ANTES se o jogador vai ganhar ou não (baseado no tier),
 * e monta o array de forma a garantir o resultado:
 *   vitória  → injeta 3 cópias do símbolo vencedor em posições aleatórias
 *   derrota  → garante que nenhum símbolo repita 3+ vezes
 */
function gerarBolinhas(tier) {
    var ganhou  = Math.random() < (CHANCE_VITORIA[tier] || 0.38);
    var pesos   = PESOS_SIMBOLO[tier] || PESOS_SIMBOLO.bronze;
    var total   = SPOTS_REL.length;   // 8
    var bolinhas = [];

    if (ganhou) {
        /* escolhe símbolo vencedor (peso normal) */
        var vencedor = sortearSimbolo(tier);
        var qtd      = 3 + Math.floor(Math.random() * (total - 3 + 1)); // 3-8 iguais

        /* injeta os vencedores */
        for (var i = 0; i < qtd; i++) { bolinhas.push(vencedor); }

        /* preenche o restante com símbolos DIFERENTES do vencedor */
        while (bolinhas.length < total) {
            var s = sortearSimbolo(tier);
            if (s.id !== vencedor.id) { bolinhas.push(s); }
        }
    } else {
        /* monta sem repetir 3+ iguais */
        var tentativas = 0;
        while (bolinhas.length < total && tentativas < 200) {
            tentativas++;
            var s = sortearSimbolo(tier);
            /* conta quantas vezes esse símbolo já está no array */
            var cnt = bolinhas.filter(function (b) { return b.id === s.id; }).length;
            if (cnt < 2) { bolinhas.push(s); }
        }
        /* fallback: completa com qualquer símbolo se travar */
        while (bolinhas.length < total) {
            bolinhas.push(SIMBOLOS[bolinhas.length % SIMBOLOS.length]);
        }
    }

    /* embaralha as posições */
    for (var j = bolinhas.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var tmp = bolinhas[j]; bolinhas[j] = bolinhas[k]; bolinhas[k] = tmp;
    }

    return { bolinhas: bolinhas, ganhou: ganhou };
}

/*
 * Analisa o array de bolinhas reveladas e retorna o resultado:
 * { ganhou, simboloVencedor, qtd }
 */
function analisarResultado(bolinhas) {
    var contagem = {};
    bolinhas.forEach(function (b) {
        contagem[b.id] = (contagem[b.id] || 0) + 1;
    });

    var melhorId  = null;
    var melhorQtd = 0;
    Object.keys(contagem).forEach(function (id) {
        if (contagem[id] > melhorQtd) {
            melhorQtd = contagem[id];
            melhorId  = id;
        }
    });

    var ganhou          = melhorQtd >= 3;
    var simboloVencedor = ganhou ? SIMBOLOS.find(function (s) { return s.id === melhorId; }) : null;

    return { ganhou: ganhou, simboloVencedor: simboloVencedor, qtd: melhorQtd };
}

/* ── UI helpers ── */

function criarBotoesDecisao() {
    if (document.getElementById("btn-ficar")) { return; }

    elBtnFicar = document.createElement("button");
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
        var dados = JSON.parse(sessionStorage.getItem(SCRATCH_KEY));
        if (!dados) { return null; }
        return dados;
    } catch (e) { return null; }
}

function salvarEstadoScratch(estado) {
    sessionStorage.setItem(SCRATCH_KEY, JSON.stringify(estado));
}

function cadastrouHoje() {
    try {
        var leads = JSON.parse(localStorage.getItem("knowLeads")) || [];
        return leads.length > 0;
    } catch (e) { return false; }
}

function mostrarResultadoReveal(resultado) {
    var elRev = document.getElementById("scratch-reveal-result");
    if (!elRev) {
        elRev           = document.createElement("div");
        elRev.id        = "scratch-reveal-result";
        elRev.className = "scratch-reveal";
        var area = document.getElementById("scratch-area");
        if (area && area.parentNode) {
            area.parentNode.insertBefore(elRev, area.nextSibling);
        }
    }
    elRev.classList.remove("hide");

    if (resultado.ganhou && resultado.simboloVencedor) {
        var s     = resultado.simboloVencedor;
        var badge = { bronze: "Prêmio Bronze", prata: "Prêmio Prata", ouro: "Prêmio Ouro", diamante: "Prêmio Diamante" }[s.nivel] || s.nivel;
        elRev.innerHTML =
            '<div class="prize-level ' + s.nivel + '">' + badge + '</div>' +
            '<p class="prize-name">' + resultado.qtd + '× ' + s.icone + ' — ' + s.nome + '</p>' +
            '<small class="prize-info">Apresente esta tela na secretaria para resgatar.</small>';
    } else {
        elRev.innerHTML =
            '<div class="prize-level bronze" style="background:rgba(100,80,80,.18);color:#e06060;border-color:rgba(224,96,96,.35)">Não foi dessa vez</div>' +
            '<p class="prize-name" style="color:var(--text-muted)">Nenhuma combinação de 3 iguais 😔</p>' +
            '<small class="prize-info">Tente novamente ou cadastre-se para nova chance amanhã!</small>';
    }
}

function finalizarComPremio() {
    var estado = carregarEstadoScratch();
    if (!estado) { return; }

    estado.finalizado = true;
    salvarEstadoScratch(estado);
    window._scratchDone = true;

    if (elBtnFicar)  { elBtnFicar.classList.add("hide"); }
    if (elBtnTentar) { elBtnTentar.classList.add("hide"); }
    elScratchBtn.classList.add("hide");

    var res = estado.resultado;
    if (res && res.ganhou) {
        elScratchMsg.textContent = "🎉 Parabéns! Apresente esta tela na secretaria para resgatar seu prêmio.";
        if (res.simboloVencedor && res.simboloVencedor.nivel === "diamante") {
            elScratchMatricula.classList.remove("hide");
        }
    } else {
        elScratchMsg.textContent = "😔 Não foi dessa vez. Obrigado por participar!";
    }
    elScratchMsg.classList.remove("hide");

    if (typeof window._scratchCanvasRevealAll === "function") {
        window._scratchCanvasRevealAll();
    }
}

function tentarNovamente() {
    var estado = carregarEstadoScratch();
    if (!estado) { return; }

    if (estado.tentativasUsadas >= MAX_TENTATIVAS) {
        finalizarComPremio();
        return;
    }

    var tier   = getTier(carregarPontos());
    var gerado = gerarBolinhas(tier);
    var res    = analisarResultado(gerado.bolinhas);

    estado.bolinhas         = gerado.bolinhas;
    estado.resultado        = res;
    estado.tentativasUsadas = estado.tentativasUsadas + 1;
    salvarEstadoScratch(estado);

    window._scratchBolinhas = gerado.bolinhas;
    window._scratchRevealed = false;

    spotsState.forEach(function (s) { s.pct = 0; s.scratched = false; });
    if (typeof window._scratchCanvasReset === "function") {
        window._scratchCanvasReset();
    }

    var elRev = document.getElementById("scratch-reveal-result");
    if (elRev) { elRev.classList.add("hide"); }

    atualizarBotoesDecisao(estado);
}

function atualizarBotoesDecisao(estado) {
    if (!elBtnFicar || !elBtnTentar) { return; }

    var restantes = MAX_TENTATIVAS - estado.tentativasUsadas;

    elBtnFicar.classList.remove("hide");

    if (restantes > 0 && !estado.finalizado) {
        elBtnTentar.classList.remove("hide");
        elBtnTentar.textContent  = "🎲 Tentar novamente (" + restantes + " restante" + (restantes > 1 ? "s" : "") + ")";
        elScratchMsg.textContent = "⚠️ Tentar novamente descarta o resultado atual!";
        elScratchMsg.classList.remove("hide");
    } else {
        elBtnTentar.classList.add("hide");
        elScratchMsg.textContent = "Última tentativa — escolha ficar com o resultado.";
        elScratchMsg.classList.remove("hide");
    }
}

function atualizarInfoTierRaspadinha(tier) {
    var el = document.getElementById("scratch-tier-info");
    if (!el) { return; }

    var chances = Math.round((CHANCE_VITORIA[tier] || 0.38) * 100);
    var msgs = {
        bronze:   "🥉 Nível Bronze — " + chances + "% de chance de ganhar.",
        prata:    "🥈 Nível Prata — " + chances + "% de chance · prêmios Ouro mais frequentes!",
        ouro:     "🥇 Nível Ouro — " + chances + "% de chance · prêmios Diamante disponíveis!",
        diamante: "💎 Nível Diamante — " + chances + "% de chance · apenas Ouro e Diamante!",
    };
    el.textContent = msgs[tier] || msgs.bronze;
}

/* ════════════════════════════════════════════════════════════
   Canvas Scratch Engine (match-3)

   • canvas base  → imagem de fundo + conteúdo de cada bolinha
   • canvas overlay → tampas roxas raspadoras (destination-out)

   Cada bolinha exibe seu próprio símbolo (window._scratchBolinhas[i]),
   não mais o símbolo único do prêmio sorteado.
   ════════════════════════════════════════════════════════════ */
function iniciarScratchCanvas() {
    if (scratchCanvasInitialized) { return; }
    scratchCanvasInitialized = true;

    var wrapper = document.getElementById("scratch-area");
    if (!wrapper) { return; }

    wrapper.innerHTML       = "";
    wrapper.style.position  = "relative";
    wrapper.style.padding   = "0";
    wrapper.style.border    = "none";
    wrapper.style.background= "none";
    wrapper.style.minHeight = "unset";
    wrapper.style.borderRadius = "1.25rem";
    wrapper.style.overflow  = "hidden";

    var canvas  = document.createElement("canvas");
    canvas.id   = "scratch-canvas";
    canvas.style.cssText = "display:block;width:100%;border-radius:1.25rem;";
    wrapper.appendChild(canvas);

    var overlay = document.createElement("canvas");
    overlay.id  = "scratch-overlay";
    overlay.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border-radius:1.25rem;cursor:crosshair;touch-action:none;";
    wrapper.appendChild(overlay);

    var imgLoaded = false;
    var bgImage   = new Image();
    bgImage.onload = function () { imgLoaded = true; resize(); };
    bgImage.src    = window.RASPADINHA_IMG_SRC || "";

    function getSpotsPx() {
        return SPOTS_REL.map(function (s) {
            return {
                cx: Math.round(s.cx * canvas.width),
                cy: Math.round(s.cy * canvas.height),
                r:  Math.round(s.r  * canvas.width),
            };
        });
    }

    /* desenha imagem + conteúdo das bolinhas já raspadas */
    function drawBase() {
        var ctx      = canvas.getContext("2d");
        var bolinhas = window._scratchBolinhas || [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (imgLoaded) {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "#e8e0c8";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        var spots = getSpotsPx();
        spots.forEach(function (sp, i) {
            if (!spotsState[i].scratched) { return; }

            var sim = bolinhas[i] || SIMBOLOS[0];

            /* fundo colorido da bolinha */
            ctx.save();
            ctx.beginPath();
            ctx.arc(sp.cx, sp.cy, sp.r - 1, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = sim.cor;
            ctx.fillRect(sp.cx - sp.r, sp.cy - sp.r, sp.r * 2, sp.r * 2);

            /* ícone emoji centralizado */
            ctx.font         = (sp.r * 0.85) + "px serif";
            ctx.textAlign    = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(sim.icone, sp.cx, sp.cy);
            ctx.restore();
        });
    }

    /* tampas roxas para slots não raspados */
    function drawOverlay() {
        var ov    = overlay.getContext("2d");
        var spots = getSpotsPx();
        ov.clearRect(0, 0, overlay.width, overlay.height);

        spots.forEach(function (sp, i) {
            if (spotsState[i].pct >= 60) { return; }

            ov.save();
            ov.beginPath();
            ov.arc(sp.cx, sp.cy, sp.r, 0, Math.PI * 2);

            var grad = ov.createRadialGradient(
                sp.cx - sp.r * 0.25, sp.cy - sp.r * 0.25, sp.r * 0.05,
                sp.cx, sp.cy, sp.r
            );
            grad.addColorStop(0, "#3a2a80");
            grad.addColorStop(1, "#1a0e50");

            ov.fillStyle   = grad;
            ov.fill();
            ov.strokeStyle = "rgba(200,190,230,0.65)";
            ov.lineWidth   = Math.max(1.5, sp.r * 0.045);
            ov.stroke();
            ov.restore();
        });
    }

    function resize() {
        var w = wrapper.clientWidth || 600;
        var h = Math.round(w * (600 / 1050));
        canvas.width  = w; canvas.height  = h;
        overlay.width = w; overlay.height = h;
        drawBase();
        drawOverlay();
    }

    function getPosOnOverlay(e) {
        var rect = overlay.getBoundingClientRect();
        var sx   = overlay.width  / rect.width;
        var sy   = overlay.height / rect.height;
        var cx   = e.touches ? e.touches[0].clientX : e.clientX;
        var cy   = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: (cx - rect.left) * sx, y: (cy - rect.top) * sy };
    }

    function hitSpot(x, y) {
        var spots = getSpotsPx();
        for (var i = 0; i < spots.length; i++) {
            var s  = spots[i];
            var dx = x - s.cx, dy = y - s.cy;
            if (Math.sqrt(dx * dx + dy * dy) < s.r) { return i; }
        }
        return -1;
    }

    var activeSpot = -1;
    var isDrawing  = false;

    function scratchAt(x, y) {
        if (activeSpot < 0) { return; }

        var ov    = overlay.getContext("2d");
        var spots = getSpotsPx();
        var sp    = spots[activeSpot];

        ov.save();
        ov.beginPath();
        ov.arc(sp.cx, sp.cy, sp.r, 0, Math.PI * 2);
        ov.clip();
        ov.globalCompositeOperation = "destination-out";
        ov.beginPath();
        ov.arc(x, y, sp.r * 0.32, 0, Math.PI * 2);
        ov.fill();
        ov.restore();

        var imgData = ov.getImageData(sp.cx - sp.r, sp.cy - sp.r, sp.r * 2, sp.r * 2);
        var total   = imgData.data.length / 4;
        var transp  = 0;
        for (var p = 3; p < imgData.data.length; p += 4) {
            if (imgData.data[p] < 50) { transp++; }
        }
        spotsState[activeSpot].pct = (transp / total) * 100;

        if (spotsState[activeSpot].pct >= 60 && !spotsState[activeSpot].scratched) {
            spotsState[activeSpot].scratched = true;
            drawBase();
            checkAllScratched();
        }
    }

    function checkAllScratched() {
        var done = spotsState.filter(function (s) { return s.scratched; }).length;
        if (done >= 4 && !window._scratchRevealed) {
            window._scratchRevealed = true;
            onScratchComplete();
        }
    }

    function onStart(e) {
        if (window._scratchDone) { return; }
        e.preventDefault();
        var pos = getPosOnOverlay(e);
        var idx = hitSpot(pos.x, pos.y);
        if (idx < 0) { return; }
        activeSpot = idx;
        isDrawing  = true;
        scratchAt(pos.x, pos.y);
    }

    function onMove(e) {
        if (!isDrawing || window._scratchDone) { return; }
        e.preventDefault();
        var pos = getPosOnOverlay(e);
        var idx = hitSpot(pos.x, pos.y);
        if (idx >= 0) { activeSpot = idx; }
        scratchAt(pos.x, pos.y);
    }

    function onEnd() { isDrawing = false; activeSpot = -1; }

    overlay.addEventListener("mousedown",  onStart, { passive: false });
    overlay.addEventListener("mousemove",  onMove,  { passive: false });
    overlay.addEventListener("mouseup",    onEnd);
    overlay.addEventListener("touchstart", onStart, { passive: false });
    overlay.addEventListener("touchmove",  onMove,  { passive: false });
    overlay.addEventListener("touchend",   onEnd);
    window.addEventListener("resize", resize);

    window._scratchCanvasRevealAll = function () {
        spotsState.forEach(function (s) { s.pct = 100; s.scratched = true; });
        overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
        drawBase();
    };

    window._scratchCanvasReset = function () {
        spotsState.forEach(function (s) { s.pct = 0; s.scratched = false; });
        window._scratchRevealed = false;
        window._scratchDone     = false;
        drawBase();
        drawOverlay();
    };

    resize();
}

function onScratchComplete() {
    var estado = carregarEstadoScratch();
    if (!estado || estado.finalizado) { return; }

    var res = analisarResultado(window._scratchBolinhas || []);
    estado.resultado = res;
    salvarEstadoScratch(estado);

    mostrarResultadoReveal(res);

    if (res.ganhou) {
        criarBotoesDecisao();
        atualizarBotoesDecisao(estado);
    } else {
        /* sem prêmio: oferece nova tentativa ou encerra */
        criarBotoesDecisao();
        if (elBtnFicar) { elBtnFicar.classList.add("hide"); }
        atualizarBotoesDecisao(estado);
    }
    elScratchBtn.classList.add("hide");
}

function raspar() {
    if (!cadastrouHoje()) {
        elScratchMsg.textContent = "📋 Faça seu cadastro abaixo para liberar a raspadinha!";
        elScratchMsg.classList.remove("hide");
        if (elScratchBtn) { elScratchBtn.disabled = true; }
        return;
    }

    var estado = carregarEstadoScratch();

    /* já finalizado: reexibe resultado */
    if (estado && estado.finalizado) {
        window._scratchBolinhas = estado.bolinhas;
        window._scratchDone     = true;
        iniciarScratchCanvas();
        if (typeof window._scratchCanvasRevealAll === "function") {
            window._scratchCanvasRevealAll();
        }
        mostrarResultadoReveal(estado.resultado || { ganhou: false });
        if (elScratchBtn) { elScratchBtn.classList.add("hide"); }
        var msgFinal = estado.resultado && estado.resultado.ganhou
            ? "🎉 Prêmio garantido! Apresente na secretaria."
            : "😔 Não foi dessa vez. Obrigado por participar!";
        elScratchMsg.textContent = msgFinal;
        elScratchMsg.classList.remove("hide");
        if (estado.resultado && estado.resultado.simboloVencedor &&
            estado.resultado.simboloVencedor.nivel === "diamante") {
            elScratchMatricula.classList.remove("hide");
        }
        return;
    }

    /* sessão em curso (não finalizado): retoma */
    if (estado && !estado.finalizado) {
        window._scratchBolinhas = estado.bolinhas;
        iniciarScratchCanvas();
        criarBotoesDecisao();
        atualizarBotoesDecisao(estado);
        if (elScratchBtn) { elScratchBtn.classList.add("hide"); }
        return;
    }

    /* nova rodada */
    adicionarPontos("raspadinha");

    var tier   = getTier(carregarPontos());
    var gerado = gerarBolinhas(tier);
    var res    = analisarResultado(gerado.bolinhas);

    window._scratchBolinhas = gerado.bolinhas;
    window._scratchRevealed = false;
    window._scratchDone     = false;

    var novoEstado = {
        bolinhas:         gerado.bolinhas,
        resultado:        res,         /* pré-calculado; confirmado ao revelar */
        tentativasUsadas: 1,
        finalizado:       false
    };
    salvarEstadoScratch(novoEstado);

    iniciarScratchCanvas();
    if (elScratchBtn) { elScratchBtn.classList.add("hide"); }
    elScratchMsg.textContent = "✨ Raspe as bolinhas — 3 iguais = prêmio!";
    elScratchMsg.classList.remove("hide");
}

if (elScratchBtn) {
    elScratchBtn.addEventListener("click", raspar);
}

/* auto-inicializa ao carregar a página se já há estado na sessão */
(function iniciarRaspadinha() {
    var estado = carregarEstadoScratch();

    if (!estado) {
        if (!cadastrouHoje()) {
            elScratchMsg.textContent = "📋 Cadastre-se abaixo para liberar a raspadinha!";
            elScratchMsg.classList.remove("hide");
            if (elScratchBtn) { elScratchBtn.disabled = true; }
        }
        return;
    }

    window._scratchBolinhas = estado.bolinhas;

    if (estado.finalizado) {
        window._scratchDone = true;
        iniciarScratchCanvas();
        setTimeout(function () {
            if (typeof window._scratchCanvasRevealAll === "function") {
                window._scratchCanvasRevealAll();
            }
        }, 200);
        mostrarResultadoReveal(estado.resultado || { ganhou: false });
        if (elScratchBtn) { elScratchBtn.classList.add("hide"); }
        var msgFinal = estado.resultado && estado.resultado.ganhou
            ? "🎉 Prêmio garantido! Apresente na secretaria."
            : "😔 Não foi dessa vez. Obrigado por participar!";
        elScratchMsg.textContent = msgFinal;
        elScratchMsg.classList.remove("hide");
        if (estado.resultado && estado.resultado.simboloVencedor &&
            estado.resultado.simboloVencedor.nivel === "diamante") {
            elScratchMatricula.classList.remove("hide");
        }
        return;
    }

    iniciarScratchCanvas();
    criarBotoesDecisao();
    atualizarBotoesDecisao(estado);
    if (elScratchBtn) { elScratchBtn.classList.add("hide"); }
    elScratchMsg.textContent = "✨ Raspe as bolinhas — 3 iguais = prêmio!";
    elScratchMsg.classList.remove("hide");
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
    if (elScratchBtn && elScratchBtn.disabled && !carregarEstadoScratch()) {
        elScratchBtn.disabled    = false;
        elScratchMsg.textContent = "🎉 Raspadinha liberada! Clique em \"Raspar Agora\" para jogar.";
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
            "<td>" + (leads.length - i)  + "</td>" +
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

var elFbForm  = document.getElementById("feedback-form");
var elFbNome  = document.getElementById("fb-nome");
var elFbTipo  = document.getElementById("fb-tipo");
var elFbNota  = document.getElementById("fb-nota");
var elFbTexto = document.getElementById("fb-texto");
var elFbMsg   = document.getElementById("fb-feedback-msg");

var elErroFbNome  = document.getElementById("erro-fb-nome");
var elErroFbTipo  = document.getElementById("erro-fb-tipo");
var elErroFbNota  = document.getElementById("erro-fb-nota");
var elErroFbTexto = document.getElementById("erro-fb-texto");

var elFbMural = document.getElementById("feedback-mural");
var elFbEmpty = document.getElementById("fb-empty");
var elFbAvg   = document.getElementById("fb-avg-stars");
var elFbCount = document.getElementById("fb-count");

var notaSelecionada = 0;

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
    for (var i = 1; i <= 5; i++) { s += i <= nota ? "★" : "☆"; }
    return s;
}

function renderizarFeedbacks() {
    var fbs = carregarFeedbacks();

    if (fbs.length === 0) {
        if (elFbEmpty) { elFbEmpty.classList.remove("hide"); }
        return;
    }

    if (elFbEmpty) { elFbEmpty.classList.add("hide"); }

    var soma  = fbs.reduce(function (s, f) { return s + f.nota; }, 0);
    var media = (soma / fbs.length).toFixed(1);

    if (elFbAvg)   { elFbAvg.textContent   = "★ " + media; }
    if (elFbCount) { elFbCount.textContent = fbs.length + " avaliação" + (fbs.length !== 1 ? "ões" : ""); }

    elFbMural.innerHTML = "";

    fbs.slice().reverse().forEach(function (fb) {
        var card = document.createElement("div");
        card.className = "fb-card";
        card.innerHTML =
            "<div class='fb-card-header'>" +
                "<div>" +
                    "<span class='fb-card-author'>" + escapar(fb.nome)  + "</span>" +
                    " <span class='fb-card-tipo'>"  + escapar(fb.tipo)  + "</span>" +
                "</div>" +
                "<span class='fb-card-stars'>" + starsHTML(fb.nota) + "</span>" +
            "</div>" +
            "<p class='fb-card-text'>"  + escapar(fb.texto) + "</p>" +
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