const btn = document.querySelectorAll('button');
const html = document.querySelector('html');
const imagem = document.querySelector('.app__image');
const tituloHtml = document.querySelector('.app__title');
const startpausebtn = document.getElementById('start-pause');
const displayTimer = document.getElementById('timer');

const inputMusica = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

inputMusica.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
})
    
function handleClick(event) {
    const dataContexto = event.currentTarget.getAttribute('data-contexto');
    btn.forEach(function (dataContexto) {
        dataContexto.classList.remove('active');
    })
    event.currentTarget.classList.add('active');

    if (dataContexto) {
        html.setAttribute('data-contexto', dataContexto);
        imagem.src = `/imagens/${dataContexto}.png`;

        switch (dataContexto) {
            case "foco":
                
                tituloHtml.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                displayTimer.textContent = "25:00"
                Numerotemporizador = 1500;

                break;

            case "descanso-curto":

                tituloHtml.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                displayTimer.textContent = "5:00"
                Numerotemporizador = 300;
        
                break;

            case "descanso-longo":

                tituloHtml.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                displayTimer.textContent = "10:00"
                Numerotemporizador = 600;
            default:
                break;
        }
    }
}

btn.forEach((element) => {
    element.addEventListener('click', handleClick);
});
let intervalId;
let Numerotemporizador = 1500;
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const temporizar = () =>{

    if(Numerotemporizador <= 0){
        zerar();
        pause.play();
        startpausebtn.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>`
        musica.pause();
        return
    }
        Numerotemporizador -= 1;
        mostrarTempo();

}

startpausebtn.addEventListener('click', iniciar);

function iniciar() {
    if(intervalId){
        zerar();
        pause.play();
        startpausebtn.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>`
        musica.pause();
        return
    } else {
        play.play();
        startpausebtn.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
        <span>Pause</span>`
        musica.play();
        musica.loop;
    }
    intervalId = setInterval(temporizar, 1000);
}

function zerar(){
    clearInterval(intervalId);
    intervalId = null;
}

function mostrarTempo () {
    const tempo = new Date(Numerotemporizador * 1000);
    const tempoformatada = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    displayTimer.innerHTML = `${tempoformatada}`;
}
