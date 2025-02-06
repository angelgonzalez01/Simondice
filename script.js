let moves, totalMoves, current;
const sonido = new Audio("8-bit-victory-sound-101319.mp3");
const btnregresar = document.getElementById("regresar");

btnregresar.addEventListener('click', () => {
    window.location.href = 'https://angelgonzalez01.github.io/game/';
})

function iluminate(cellPos, time)   {
    setTimeout(() => {
        document.querySelector('.cell[pos="' + cellPos + '"]').classList.add('active');
        sonido.play();
        setTimeout(() => {
            document.querySelector('.cell[pos="' + cellPos + '"]').classList.remove('active'); 
        }, 300);
    }, time);
}

function setMoves() {
    moves.push(Math.floor(Math.random() * 4) + 1);
    if (current < totalMoves) {
        current++;
        setMoves();
    }
}

function startGame() {
    moves = [];
    totalMoves = 2;
    current = 0;
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#regresar').style.display = 'none';
    document.querySelector('#message').style.display = 'block';
    sequence();
}

function sequence() {
    moves = [];
    current = 0;
    setMoves();
    document.querySelector('#message').innerHTML = "Simon dice";

    for (let i = 0; i < moves.length; i++) {
        iluminate(moves[i], 600 * i);   
    }

    setTimeout(() => {
        document.querySelector('#message').innerHTML = 'Replica la secuencia';
    }, 600 * moves.length);
}

function cellClick(e) {
    let cellPos = e.target.getAttribute('pos');
    iluminate(cellPos, 0);

    if (moves[0] && moves.length) {
        if (moves[0] == cellPos) {
            moves.shift();

            if (!moves.length) {
                totalMoves++;
                setTimeout(() => {
                    sequence();
                }, 1000);
            }
        } else {
            document.querySelector('#message').innerHTML = 'Perdiste';
            setTimeout(() => {
                document.querySelector('#start').style.display = 'block';
                document.querySelector('#regresar').style.display = 'block';
                document.querySelector('#message').style.display = 'none';
            }, 1000);
        }
    }
}

document.querySelector('#start').addEventListener('click', startGame);
let cells = Array.from(document.getElementsByClassName('cell'));

cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});