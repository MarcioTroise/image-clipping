// seleciona o input
const fileInput = document.getElementById('imageInput');

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

    //const text = 'MATCH';
    // adiciona texto e estilo a marca d'água
    context.font = '70px Arial';
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    // centralizando o texto
    context.translate(canvas.width / 2, canvas.height / 2);
    // o js nao aceita -45deg entao fazemos um calculo para chegar na mesma rotacao
    context.rotate(-45 * Math.PI / 180); // assim identifico o deg (-45) mas assim -0.785 o resultado da o mesmo
    const textWidth = context.measureText('MATCH').width;
    context.fillText('match light', -textWidth, -70);

    // Criação de sombreamento para o texto anterior (um segundo texto só que escuro caso a img seja clara)
    context.font = '70px Arial';
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillText('match dark', -textWidth / 2, 70);

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
  });
});