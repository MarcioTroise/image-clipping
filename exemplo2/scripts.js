// Criando variavel para input (vai ser bastante usado)
const inputFile = document.getElementById('photo-file');
// Pegando a tag IMG que criei
let photoPreview = document.getElementById('photo-preview');
// O que foi comentado na linha 159 é referente a criacao
let image = new Image();

// Pegando o ID do button pra buscar o file do input no CLICK
document.getElementById('select-image').onclick =
// criando funcao de CLICK para o input
function() {
    inputFile.click()
}

// adicionando evento DOM com funcionalidade sempre que a DOM estiver pronta
window.addEventListener('DOMContentLoaded', () => {

    // executando evento do input, sempre que houver mudanca (change)
    inputFile.addEventListener('change', () => {

        // Guardando a imagem carregada (em array)
        let file = inputFile.files.item(0)

        // ler um arquivo
        let reader = new FileReader()
        reader.readAsDataURL(file)
        //console.log("111", file.name) //file.name para trazer o nome da img igual ao do desk
        
        // onload = Carregar, quando carregar a imagem faça/execute... (funcao)
        reader.onload = function(event) {
            // Como nao coloquei SRC na minha tag, vou incluir um source nela de acordo com
            // o que foi carregad o primeiro (onload), nesse caso, uma imagem 
            image.src = event.target.result // pre-visualizacao
        }
        // Colocando uma borda na imagem quando for exibida
        photoPreview.style.border = '2px double white'
    })
})

// Selection Tool - fazendo ação de recorte dentro da imagem
// -------------------------------------------------------------------------------------
// MOUSEOVER - acao do mouse SOBRE a imagem
// -------------------------------------------------------------------------------------
/* MOUSEDOWN - acao do mouse no CLICK da imagem
    Aqui é mais delicado pois não recortaremos os pixels (px) da imagem e sim suas posicoes
    relativas referentes a ela, por isso criamos a variavel que armazena esses valores

    Posicionamento absoluto se é achado dentro de 'event.clientX' e o,
    Posicionamento relativo é dentro de 'event.offsetX'
    Pra ajustar isso vamos desestruturar com uma constante recebendo esses eventos.
    Esses eventos são do eixo X e Y da sua pagina em sí, de ponta a ponta (tipo margin)
    mas o evento só acontece quando clicado na imagem

    Adicionar a flag de inicio de seleção (quando clicado na imagem)
*/
// -------------------------------------------------------------------------------------
/* MOUSEMOVE - acao do mouse segurando/arranstando a imagem
    Movimento do mouse. De acordo com o movimento escolher tal ação pra ser feita em cima disso
*/
// -------------------------------------------------------------------------------------
/* MOUSEUP -  acao do mouse DEPOIS do click/soltar a imagem
    Adicionar a flag de fim de seleção (quando soltar o click na imagem)
*/
// -------------------------------------------------------------------------------------
let startX, startY, relativeStartX, relativeStartY, endX, endY, relativeEndX, relativeEndY;
const selection = document.getElementById('selection-tool');
let startSelection = false; // quando clicado virar TRUE
// Criando eventos a serem usados
const events = {
    // Nesses casos o THIS vai ser o target que dispara o evento (image) 
    mouseover(){
        // Mudando o estilo do cursor quando o mouse 'entrar' na imagem 
        this.style.cursor = 'crosshair'
    },
    mousedown(){
        const {clientX, clientY, offsetX, offsetY } = event
        // console.log({
        //     'client': [clientX,clientY],
        //     'offset': [offsetX, offsetY],
        // })

        startX = clientX
        startY = clientY
        relativeStartX = offsetX
        relativeStartY = offsetY

        startSelection = true;
    },
    mousemove(){
        // Com essas 2 tags com o click do mouse ja temos a area de recorte, porem, sem consegui desfazela
        endX = event.clientX
        endY = event.clientY

        // Só vai haver alteração se o mouse for clicado (startSelection = true)
        if (startSelection) {
            // Desenhando o traçado de acordo com o começo e fim do click-mouse
            selection.style.display = 'initial';
            // Onde foi iniciado
            selection.style.top = startY + 'px'; // Onde comeca na vertical
            selection.style.left = startX + 'px'; // Onde comeca na horizontal
            // Pegando largura/altura, onde termina menos onde começa
            selection.style.width = (endX - startX) + 'px';
            selection.style.height = (endY - startY) + 'px';

            // Pegando largura/altura, onde termina menos onde começa
            //selection.style.width = (startX - endX - endY) + 'px';
            //selection.style.height = (startY - endY - endX) + 'px';
            photoPreview.style.opacity = '0.7'
        }
    },
    mouseup(){
        photoPreview.style.opacity = '1'
        // Quando "soltar" o mouse, ficar salvo a ultima acao do 'mousemove'
        startSelection = false;

        relativeEndX = event.layerX // deslocamento do mouse no eixoX (layerX ja traz isso automatico)
        relativeEndY = event.layerY // deslocamento do mouse no eixoY (layerY ja traz isso automatico)

        selection.style.opacity = '1'
    }, 
}

 /* CONTINUAR...
    continuar com CANVAS nesse link
    https://youtu.be/-RWPvVcYAC4?t=2759

 */
// Passando os eventos pegando as chaves do evento (pra nao precisar fazer uma funcao dentro de cada evento)
Object.keys(events).forEach(eventName => {
    // Adicionando evento dentro da imagem importada
    photoPreview.addEventListener(eventName, events[eventName]) 
})

// ------------------ CANVAS --------------------------
let canvas = document.createElement('canvas')

// canvas precisa de um contexto para ser trabalhado, por isso criaremos a variavel 'ctx
// o canvas só consegue receber imagens e as alterações através do contexto
let ctx = canvas.getContext('2d')

// toda vez que a img for carregada fazer...
image.onload = function() {
    // desestruturando o IMAGE pra não precisar ficar dessa forma e trabalhar mais facil futuramente
    // canvas.width = image.width;
    // canvas.height = canvas.height;
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;


    // Agora preciso Limpar o contexto (ctx)
    ctx.clearRect(0, 0, width, height)

    // desenhar a imagem no contexto. Começar no eixo X=0 e eixo Y=0
    ctx.drawImage(image, 0, 0)

    // preciso atualizar o preview da imagem (visualizacao) [transformando os dados em URL]
    photoPreview.src = canvas.toDataURL()
    // CUIDADO = Dessa forma criada a cima até aqui pode carregar a imagem 2x por causa do onload
    // entao mexemos na linha 3, criando uma variavel pra arrumar as imagens separadas

}





