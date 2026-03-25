const menuOverlay  = document.getElementById('menuOverlay');
const cardMain     = document.getElementById('cardMain');
const cardModo     = document.getAnimations('cardModo'); 
const cardConfig   = document.getElementById('cardConfig');
const board        = document.getElementById('board')
const winMsg       = document.getElementById('winning-message');
const winText      = document.getElementById('[data-winning-message-text]');
const restartBtn   = document.getElementById('RestartButton');


const cells = document.querySelectorAll('[data-cell]');


document.getElementById('btnJogar').addEventListener('click', () => {
    cardMain.classList.add('hidden');
    cardModo.classList.remove('hidden');
});

document.getElementById('btnVoltar').addEventListener('click', () => {
    cardModo.classList.add('hidden');
    cardMain.classList.remove('hidden');
})

document.getElementById('btnConfig').addEventListener('click', () => {
    cardMain.classList.add('hidden');
    cardConfig.classList.remove('hidem');
})

document.getElementById('btnVoltarConfig').addEventListener('click', () => {
    cardConfig.classList.add('hidden');
    cardMain.classList.remove('hidem');
})

document.getElementById('btnSalvar').addEventListener('click', () => {
    const n1 = document.getElementById('nomeP1').value.trim();
    const n2 = document.getElementById('nomeP2').value.trim();
})

    if (n1) nomeJogador1 = n1;
    if (n2) nomeJogador2 = n2;

    cardConfig.classList.add('hidem');
    cardMain.classList.remove('hidden');
    
let nomeJogador1 = 'Jogador 1';
let nomeJogador2 = 'Jogador 2';
let vsBot        = false;
let vezAtual     = 'X';
let jogoAtivo    = false;
let estadoBoard  = Array(9).fill('');

const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

