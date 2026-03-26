let nomeJogador1 = 'Jogador 1';
let nomeJogador2 = 'Jogador 2';
let vsBot        = false;
let vezAtual     = 'X';
let jogoAtivo    = false;
let estadoBoard  = Array(9).fill('');

const gameTitle  = document.querySelector('.game-title');
const menuOverlay = document.getElementById('menuOverlay');
const cardMain   = document.getElementById('cardMain');
const cardModo   = document.getElementById('cardModo');
const cardConfig = document.getElementById('cardConfig');
const board      = document.getElementById('board');
const winMsg     = document.getElementById('winning-message');
const winText    = document.querySelector('[data-winning-message-text]');
const restartBtn = document.getElementById('RestartButton');
const cells      = document.querySelectorAll('[data-cell]');


// ── NAVEGAÇÃO ────────────────────────────────────────────────
document.getElementById('btnJogar').addEventListener('click', () => {
    cardMain.classList.add('hidden');
    cardModo.classList.remove('hidden');
});

document.getElementById('btnVoltar').addEventListener('click', () => {
    cardModo.classList.add('hidden');
    cardMain.classList.remove('hidden');
});

document.getElementById('btnConfig').addEventListener('click', () => {
    cardMain.classList.add('hidden');
    cardConfig.classList.remove('hidem');
});

document.getElementById('btnVoltarConfig').addEventListener('click', () => {
    cardConfig.classList.add('hidem');    // ← ERRO 1: estava 'hidden'
    cardMain.classList.remove('hidden'); // ← ERRO 1: estava remove('hidem')
});

document.getElementById('btnSalvar').addEventListener('click', () => {
    const n1 = document.getElementById('nomeP1').value.trim();
    const n2 = document.getElementById('nomeP2').value.trim();

    if (n1) nomeJogador1 = n1;
    if (n2) nomeJogador2 = n2;

    console.log('Salvo:', nomeJogador1, nomeJogador2);

    cardConfig.classList.add('hidem');
    cardMain.classList.remove('hidden');
});

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];


document.getElementById('btnPvP').addEventListener('click', () => {
    vsBot = false;
    nomeJogador2 = document.getElementById('nomeP2').value.trim() || nomeJogador2;
    iniciarJogo();
});

document.getElementById('btnPVP').addEventListener('click', () => {
    vsBot = true;
    nomeJogador2 = '🤖 Robô'; // no modo bot o nome 2 é sempre Robô
    iniciarJogo();
});

function iniciarJogo() {
    menuOverlay.classList.add('hidden'); 
    board.classList.remove('hidden');
    gameTitle.classList.remove('hidden');

    vezAtual    = 'X';
    jogoAtivo   = true;
    estadoBoard = Array(9).fill('');

    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'win-cell');
        cell.textContent = '';
    });

    winMsg.classList.remove('winning-message-show');
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => clicarCelula(cell, index));
});

function clicarCelula(cell, index) {
    if (!jogoAtivo || estadoBoard[index] !== '' || (vsBot && vezAtual === 'O')) return;

    registrarJogada(cell, index, vezAtual);

    if (verificarVitoria()) return; 

    if (vsBot) {
        jogoAtivo = false;
        setTimeout(() => {
            jogarBot();
            jogoAtivo = true;
            verificarVitoria();
        }, 500);
    }
}


function registrarJogada(cell, index, jogador) {
    estadoBoard[index] = jogador;
    cell.classList.add(jogador.toLowerCase());
    cell.textContent = jogador;
    vezAtual = jogador === 'X' ? 'O' : 'X';
}


function jogarBot() {
    const vitoria = encontrarJogadaVitoria('O');
    if (vitoria !== -1) return fazerJogadaBot(vitoria);

    const bloqueio = encontrarJogadaVitoria('X');
    if (bloqueio !== -1) return fazerJogadaBot(bloqueio);

    if (estadoBoard[4] === '') return fazerJogadaBot(4);

    const quinas = [0, 2, 6, 8].filter(i => estadoBoard[i] === '');
    if (quinas.length > 0) return fazerJogadaBot(quinas[Math.floor(Math.random() * quinas.length)]);

    const livres = estadoBoard.map((v, i) => v === '' ? i : -1).filter(i => i !== -1);
    fazerJogadaBot(livres[Math.floor(Math.random() * livres.length)]);
}

function encontrarJogadaVitoria(jogador) {
    for (const [a, b, c] of combinacoesVitoria) {
        const linha = [estadoBoard[a], estadoBoard[b], estadoBoard[c]];
        if (linha.filter(v => v === jogador).length === 2 && linha.includes('')) {
            return [a, b, c][linha.indexOf('')];
        }
    }
    return -1;
}

function fazerJogadaBot(index) {
    const cell = [...cells][index];
    registrarJogada(cell, index, 'O');
}


function verificarVitoria() {
    for (const [a, b, c] of combinacoesVitoria) {
        if (estadoBoard[a] !== '' &&
            estadoBoard[a] === estadoBoard[b] &&
            estadoBoard[b] === estadoBoard[c]
        ) {
            [a, b, c].forEach(i => cells[i].classList.add('win-cell')); 

        
            const vencedor = estadoBoard[a] === 'X' ? nomeJogador1 : nomeJogador2;
            mostrarResultado(`🏆 ${vencedor} venceu!`); // ← corrigido
            return true;
        }
    }

    if (estadoBoard.every(v => v !== '')) {
        mostrarResultado('🤝 Empate!');
        return true;
    }

    return false;
}


function mostrarResultado(mensagem) {
    jogoAtivo = false;
    winText.textContent = mensagem;
    winMsg.classList.add('winning-message-show');
}

restartBtn.addEventListener('click', () => {
    winMsg.classList.remove('winning-message-show');
    iniciarJogo();
});