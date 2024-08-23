import * as Phaser from 'phaser';
import ScrollablePanel from 'phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel';
import { CardInterface } from '@/game/interfaces/card-interface';
import { CharacterTypeEnum } from '@/game/enums/character-type-enum';
import { ColorEnum } from '@/game/enums/color-enum';
import { EventBus } from '@/game/EventBus';
import { getImageEnum, ImageEnum } from '@/game/enums/image-enum';

export class Deck extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private scrollablePanel: ScrollablePanel = <ScrollablePanel>{};
  private cards: CardInterface[] = [];
  private hasLeader: boolean = false;
  private leaderColors: ColorEnum[] = [];

  public create(): void {
    this.createDeckPanel();
    this.createDeck();
    EventBus.on('deck-card-id', this.insertCard, this);
  }

  public destroy(fromScene: boolean = false): void {
    EventBus.off('deck-card-id', this.insertCard, this);
    super.destroy(fromScene);
  }

  public updateCards(cards: CardInterface[]): void {
    this.clearDeck();
    this.cards = cards;
    this.createDeck();
  }

  public clearDeck(): void {
    this.cards = [];
    this.hasLeader = false;
    this.leaderColors = [];
    this.scrollablePanel.clear(true);
  }

  private createDeckPanel(): void {
    const panel = this.scene.add.image(400, 400, ImageEnum.PanelBeige);
    panel.setOrigin(0, 0.5);
    panel.setPosition(630, 273);
    panel.setAlpha(0.4);
    panel.setScale(12, 4.2);
  }

  private createDeck(): void {
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;
    const scrollMode = 0;
    this.scrollablePanel = this.scene.rexUI.add
      .scrollablePanel({
        x: 640,
        y: 270,
        width: 1180,
        height: 400,
        scrollMode: scrollMode,
        panel: {
          child: this.createDeckGrid(),
          mask: {
            padding: 1,
          },
        },
        slider: {
          track: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
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
          header: 10,
          footer: 10,
        },
      })
      .setOrigin(0, 0.5)
      .layout();
    this.addDeckPanelEventListeners(this.scrollablePanel);
  }

  private addDeckPanelEventListeners(scrollablePanel: ScrollablePanel): void {
    scrollablePanel
      .setChildrenInteractive({})
      .on('child.over', function (child: Phaser.GameObjects.Image | Phaser.GameObjects.Container) {
        console.log(`Pointer Over ${child.getData('id')}\n`);
        EventBus.emit('set-image-card', getImageEnum(child.getData('image')));
        EventBus.emit('set-visible-card', true);
        EventBus.emit('set-description-card', child.getData('descriptionPt'));
      })
      .on('child.out', function (child: Phaser.GameObjects.Image | Phaser.GameObjects.Container) {
        console.log(`Pointer Out ${child.getData('id')}\n`);
        EventBus.emit('set-visible-card', false);
      })
      .on('child.click', function (child: Phaser.GameObjects.Image | Phaser.GameObjects.Container) {
        console.log(`Click ${child.getData('id')}\n`);
      })
      .on(
        'child.pressstart',
        function (child: Phaser.GameObjects.Image | Phaser.GameObjects.Container) {
          console.log(`Press ${child.getData('id')}\n`);
        }
      );
  }

  private createDeckGrid() {
    const sizer = this.scene.rexUI.add.fixWidthSizer({
      space: {
        left: 20,
        right: 0,
        top: 80,
        bottom: 0,
        item: 35,
        line: 40,
      },
    });
    const cardWidth = 100;
    const cardHeight = 150;
    const groupedCards: { [key: string]: CardInterface[] } = this.cards.reduce(
      (acc: { [key: string]: CardInterface[] }, card: CardInterface) => {
        if (!acc[card.id]) {
          acc[card.id] = [];
        }
        acc[card.id].push(card);
        return acc;
      },
      {}
    );
    for (const cardId in groupedCards) {
      const cardGroup = this.scene.add.container();
      const duplicateCount = groupedCards[cardId].length;
      for (let col = 0; col < duplicateCount; col++) {
        const card = groupedCards[cardId][col];
        const cardImage = this.scene.add
          .image(0, 0, getImageEnum(card.image))
          .setOrigin(0.5, 1)
          .setDisplaySize(cardWidth, cardHeight);
        cardImage.setPosition(col * 9, col * 11);
        cardGroup
          .add(cardImage)
          .setData('id', groupedCards[cardId][col].id)
          .setData('image', groupedCards[cardId][col].image)
          .setData('descriptionPt', groupedCards[cardId][col].descriptionPt)
          .setSize(cardImage.displayWidth, cardImage.displayHeight);
      }
      sizer.add(cardGroup);
    }
    return sizer;
  }

  private insertCard(card?: CardInterface): void {
    if (card) {
      if (card.characterType === CharacterTypeEnum.Leader) {
        if (this.hasLeader) {
          console.log('Já existe um Líder no deck. Não é possível adicionar outro.');
          return;
        } else {
          this.hasLeader = true;
          this.leaderColors = card.color;
        }
      } else if (!this.hasLeader) {
        console.log('É necessário ter um Líder no deck antes de adicionar outros cards.');
        return;
      } else if (this.hasLeader && !card.color.some(color => this.leaderColors.includes(color))) {
        console.log('A carta deve ter pelo menos uma cor correspondente às cores do Líder.');
        return;
      }
      const count = this.cards.filter(c => c.id === card.id).length;
      if (count >= 4) {
        console.log('Você já tem 4 cópias desta carta no deck.');
        return;
      }
      if (this.cards.length >= 51) {
        console.log('O deck pode conter no máximo 50 cartas além do Líder.');
        return;
      }
      this.scrollablePanel.clear(true);
      this.cards.push(card);
      this.createDeck();
      EventBus.emit('card-count-text', this.cards.length);
    }
  }
}
