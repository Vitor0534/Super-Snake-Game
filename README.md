# Super Snake Game :snake:

O presente projeto consiste de um jogo popularmente conhecido no Brasil como "jogo da cobrinha", com nome em Inglês de "snake".

Tal projeto foi desenvolvido como um dos desafios da DIO. As tecnologias utilizadas foram:

- CSS;
- HTML;
-  JavaScript.

A lógica de funcionamento do programa é semelhante ao que se vê no processing, no qual se tem uma função que permanece em loop desenhando os elementos na tela a cada frame. Nesse caso, a tela é o canvas. 

Funcionamento do jogo:

O jogo funciona semelhante ao original, no qual se tem uma visão de cima da cobrinha em um plano 2D, onde a mesma se locomove automaticamente com possibilidade para o jogador mudar a direção em x ou y. O objetivo do jogo consiste em fazer a snake comer o máximo possível da comida (quadro vermelho), para que cresça. 

O jogo não termina enquanto a snake não chocar com o próprio corpo. Os Controles para o jogo são os seguintes:

- Seta pra cima: muda a direção para -y;
- Seta para baixo: muda a direção para +y;

- Seta para esquerda: muda a direção para -x;

- Seta para direita: muda a direção para +x.

Foram feitas algumas melhorias e adaptações na proposta original do projeto, sendo elas:

- foi adicionado um menu inicial onde o usuário tem as seguintes opções:
  - Start Game: inicia o jogo;
  - Settings: na versão atual o jogador pode configurar a velocidade da snake:
    - low: velocidade padrão;
    - higth: velocidade alta;
    - insane: velocidade muito alta.

- Foi adicionado uma label superior que mostra a quantidade de pontos e a velocidade selecionada.

Como executar o jogo: 

- Abra o arquivo index.html no navegador;

