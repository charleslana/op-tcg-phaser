import FixWidthSizer from 'phaser3-rex-plugins/templates/ui/fixwidthsizer/FixWidthSizer';
import ScrollablePanel from 'phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel';
import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class HowToPlayScene extends Scene {
  constructor() {
    super(SceneEnum.HowToPlay);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createText();
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createText(): void {
    const { width, height } = this.scale;
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;
    const scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: width / 2,
        y: 480,
        width: width - 200,
        height: height - 200,
        scrollMode: 0,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10),
        panel: {
          child: this.rexUI.add.fixWidthSizer({
            space: {
              left: 3,
              right: 3,
              top: 3,
              bottom: 3,
              item: 8,
              line: 8,
            },
          }),
          mask: {
            padding: 1,
          },
        },
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },
        mouseWheelScroller: {
          focus: true,
          speed: 0.1,
        },
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          panel: 10,
        },
      })
      .layout();
    this.updatePanel(scrollablePanel, this.getContent());
  }

  private updatePanel(panel: ScrollablePanel, content: string): ScrollablePanel {
    const sizer = panel.getElement('panel') as FixWidthSizer;
    const scene = panel.scene;
    sizer.clear(true);
    const addTextWithStyle = (text: string, isBold: boolean) => {
      sizer.add(
        scene.add
          .text(0, 0, text, {
            fontSize: '20px',
            color: '#000000',
            fontFamily: 'AlineaSans',
            fontStyle: isBold ? 'bold' : 'normal',
            wordWrap: { width: panel.width - 20 },
          })
          .setWordWrapWidth(panel.width - 20)
      );
    };
    const processText = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/);
      parts.forEach(part => {
        if (part.startsWith('**') && part.endsWith('**')) {
          addTextWithStyle(part.slice(2, -2), true);
        } else {
          addTextWithStyle(part, false);
        }
      });
    };
    const lines = content.split('\n');
    lines.forEach((line, lineIndex) => {
      processText(line);
      if (lineIndex < lines.length - 1) {
        sizer.addNewLine();
      }
    });
    panel.layout();
    return panel;
  }

  private createBackButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 120,
      positionY: height / 1.1,
      text: 'Voltar',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Home));
  }

  private getContent(): string {
    const content = `
    **Construção de Deck**

    Um baralho é composto por 61 cartas, sendo elas:
    • 1 Líder
    • 50 Cartas em um Deck Principal
    • 10 Cartas DON em um Deck Secundário

    As cartas obrigatoriamente devem ter ao menos uma cor em comum com o líder.

    **Tipos de Cartas e Atributos**

    Líder
      • Poder
      • Vida
      • Nome
      • Habilidade Principal
      • Cor
    DON
      • Valor
    Personagem
      • Custo
      • Vida
      • Habilidade (Opcional)
      • Cor
    Evento
      • Custo
      • Cor
      • Habilidade
    Terreno
      • Custo
      • Cor
      • Habilidade

    **Preparação para o Jogo**

    É necessário colocar seu Líder em campo e embaralhar o Deck Principal. Então pegue 5 cartas. Caso as cartas escolhidas não sejam do agrado, é possível embaralhar o deck novamente e pegar 5 novas cartas. Essa ação é chamada de Mulligan e só pode ser feita uma vez por partida.

    Após a separação das 5 cartas, coloque uma quantidade X de cartas viradas para baixo em seu campo, sendo X a vida de seu líder. Estas cartas representam sua vida.

    **Fases de um Turno**

    Um turno é dividido em 5 fases, sendo que algumas delas tem sub-fases, conforme descrito abaixo.

    **Fase de Atualização**

    Nessa fase, todas as cartas viradas são desviradas. E as cartas DON anexadas a um Personagem ou ao Líder voltam a Área de Custo.

    **Fase de Compra**

    Nessa fase, o jogador compra uma carta do Deck Principal (O Jogador que iniciar a partida não compra em seu primeiro turno). Não há um limite de cartas na mão.

    **Fase DON**

    Nessa fase, o jogador compra duas cartas DON. (O Jogador que iniciar a partida compra apenas uma em seu primeiro turno)

    **Fase Principal**

    Nessa fase, é possível fazer quatro tipos de ações diferentes:
      • Conjurar uma carta pagando seu custo. O custo é pago por meio das cartas DON. Caso um personagem ou evento tenha custo 2, para invoca-lo, é necessário virar 2 cartas DON.
      • Anexar cartas DON a uma carta Personagem/Líder para aumentar seu poder. O poder é aumentado de acordo com o descrito na carta DON
      • Ativar habilidades descritas como "Ativação: Principal"
      • Atacar

    **Fase de Ataque**

    Dentro da fase de Ataque, existem quatro passos. O primeiro é a fase de Ataque, onde o jogador atacante escolhe qual carta de Personagem/Líder irá atacar e seleciona seu alvo.
    Qualquer carta de Personagem que estiver virada pode ser escolhida como alvo. O Líder pode ser escolhido, estando virado ou não.

    As cartas selecionadas como atacantes são viradas.

    **Fase de Bloqueio**

    Após o Ataque, cartas que estiver em campo desvirado e com a habilidade Bloqueador podem se tornar o novo alvo do atacante, a escolha do Jogador defendido.

    **Fase de Contra-Golpe**

    Após o Bloqueio, o Jogador defendido também pode utilizar cartas que tenham a habilidade Contra-Golpe.

    Caso a habilidade esteja na descrição da carta, é necessário pagar o custo da carta. Caso esteja ao lado, a carta será descartada e o poder anexado a uma criatura a escolha.

    Essa ação também é exclusiva do jogador que está se defendendo.

    **Fase de Dano**

    Após essas resoluções, se é calculado quem tem mais poder entre o atacante e o alvo. Caso o alvo tenha mais poder, nada acontece. Porém, se o atacante tiver mais poder que o alvo, o alvo é eliminado. Caso o alvo do ataque seja o Líder, o jogador atacado retira 1 carta de sua pilha de Cartas de Vida e a coloca em sua mão.

    Caso a carta tenha uma habilidade Engatilhada, o jogador pode utiliza-la agora. Habilidades Engatilhadas só podem ser usadas desta forma.

    Caso o Líder seja o alvo do ataque enquanto não tiver mais cartas em uma pilha de Cartas de Vida, o jogador alvo perdeu o jogo.

    **Condição de Vitória**

    Caso o oponente não tenha mais cartas em seu Deck Principal ou o líder leve um golpe quando não tem mais vida.
    `;
    return content;
  }
}
