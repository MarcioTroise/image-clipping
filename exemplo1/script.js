// seleciona o input
const fileInput = document.getElementById('imageInput');

// const text = document.querySelector("input");
//   console.log("texto input...", this.text)
//   this.text = text;

// Variável global para armazenar o valor do input
var storedValue = '';

// Obtém referências ao formulário, ao campo de entrada e ao local onde será exibida a saída
var form = document.getElementById('myForm');
var input = document.getElementById('myInput');
var output = document.getElementById('output');

// Adiciona um ouvinte de evento ao formulário para o evento de submissão
form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    
    // Pega o valor do campo de entrada
    storedValue = input.value; // Armazena o valor na variável global

    // Chama uma função que usa esse valor
    handleInputValue(storedValue);
});

// Define a função que usará o valor do campo de entrada
function handleInputValue(value) {
    output.textContent = "Texto da Marca: " + value;

    console.log('Valor do input:', value);
}
console.log("Valor text", handleInputValue())

// Função que usa o valor armazenado
function useOutputValue() {
    // Usando o valor armazenado
    var newOutput = 'Texto adicionado: ' + storedValue;
    
    // Exibindo no console (ou você pode fazer outra coisa com o valor)
    console.log(newOutput);

    // Atualizando o conteúdo do output
    output.textContent = newOutput;
}

// Função que reseta o input e o output
function resetInput() {
  // Limpa o campo de entrada
  input.value = '';
  // Limpa o valor armazenado
  storedValue = '';
  // Limpa o conteúdo do output
  output.textContent = '';
  // Log para confirmação
  console.log('Input e output resetados');
}

// adicionando um evento de mudanças no input
fileInput.addEventListener('change', function(event) {
  // pegando o arquivo carregado/baixado
  const file = event.target.files[0];

  // cria uma URL temporária para a imagem carregada
  const imageUrl = URL.createObjectURL(file);

  // cria um novo elemento de imagem para carregar a imagem
  const image = new Image();
  image.src = imageUrl;
  

  // adiciona um evento para a imagem carregada
  image.addEventListener('load', function() {
    // cria um canvas para desenhar a imagem com a marca d'água
    const canvas = document.createElement('canvas');
    
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    // Começa a imagem no eixo-x e eixo-y em 0, pra nao cortar
    context.drawImage(image, 0, 0);

    // adiciona texto e estilo a marca d'água
    context.font = '3.5rem Arial';
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    // centralizando o texto
    context.translate(canvas.width / 2, canvas.height / 2.5);
    // o js nao aceita -45deg entao fazemos um calculo para chegar na mesma rotacao
    context.rotate(-45 * Math.PI / 180); // assim identifico o deg (-45) mas assim -0.785 o resultado da o mesmo
    const textWidth = context.measureText('MATCH').width;
    context.fillText(storedValue, -textWidth, -70);

    // Criação de sombreamento para o texto anterior (um segundo texto só que escuro caso a img seja clara)
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillText(storedValue, -textWidth / 2, 70);

    // com fillRect voce pode colocar uma 'placa' por cima da img com a cor do fillStyle
    // context.fillRect(0, 0, canvas.width, canvas.height);

    // substitui a imagem original com a imagem com a marca d'água
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = canvas.toDataURL();

    const downloadButton = document.getElementById('dwl-img');
    downloadButton.addEventListener('click', function() {
      
      // Fazendo a img baixada ser a mesma que 'pegou' a marca d'agua
      if (fileInput.files.length > 0) {
        const uploadedFile = fileInput.files[0];
        
        // Transformando o href do <a> para o mesmo da imagem com a marca d'agua
        downloadButton.href = imagePreview.src;
        // Deixando o nome do arquivo baixado o mesmo do enviado
        downloadButton.download = uploadedFile.name;
      }
    })
    
    if (resetInput()) {
      this.imagePreview = null;
      this.imagePreview = undefined;
    } 
  });

});


