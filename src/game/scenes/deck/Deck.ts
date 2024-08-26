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
    EventBus.on('add-card-deck', this.insertCard, this);
    EventBus.on('remove-card-deck', this.removeCard, this);
    EventBus.on('check-leader', this.checkLeader, this);
  }

  public destroy(fromScene: boolean = false): void {
    EventBus.off('add-card-deck', this.insertCard, this);
    EventBus.off('remove-card-deck', this.removeCard, this);
    EventBus.off('check-leader', this.checkLeader, this);
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

  public getCards(): CardInterface[] {
    return this.cards;
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
        EventBus.emit('remove-card-deck', child.getData('id'));
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
    const leaderCard = this.cards.find(card => this.isLeaderCard(card));
    const otherCards = this.cards.filter(card => !this.isLeaderCard(card));
    if (leaderCard) {
      const leaderImage = this.scene.add
        .image(0, 0, getImageEnum(leaderCard.image))
        .setOrigin(0.5, 1)
        .setDisplaySize(cardWidth, cardHeight);
      const leaderGroup = this.scene.add.container();
      leaderGroup
        .add(leaderImage)
        .setData('id', leaderCard.id)
        .setData('image', leaderCard.image)
        .setData('descriptionPt', leaderCard.descriptionPt)
        .setSize(leaderImage.displayWidth, leaderImage.displayHeight);
      sizer.add(leaderGroup);
    }
    const groupedCards: { [key: string]: CardInterface[] } = otherCards.reduce(
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
          .setData('id', card.id)
          .setData('image', card.image)
          .setData('descriptionPt', card.descriptionPt)
          .setSize(cardImage.displayWidth, cardImage.displayHeight);
      }
      sizer.add(cardGroup);
    }
    return sizer;
  }

  private insertCard(card?: CardInterface): void {
    if (!card) return;
    if (this.isLeaderCard(card)) {
      if (this.hasLeader) {
        this.logError('Já existe um Líder no deck. Não é possível adicionar outro.');
        return;
      }
      if (this.cards.length > 0) {
        const existingColors = this.getAllColorsFromExistingCards();
        const isLeaderColorValid = this.doesLeaderHaveAllColors(existingColors, card.color);

        if (!isLeaderColorValid) {
          this.logError('O Líder deve ter exatamente as cores das cartas já adicionadas.');
          return;
        }
      }
      this.setLeader(card);
    } else {
      if (!this.hasLeader) {
        this.logError('É necessário ter um Líder no deck antes de adicionar outros cards.');
        return;
      }
      if (!this.isCardColorValid(card)) {
        this.logError('A carta deve ter pelo menos uma cor correspondente às cores do Líder.');
        return;
      }
    }
    if (this.isCardCopyLimitReached(card)) {
      this.logError('Você já tem 4 cópias desta carta no deck.');
      return;
    }
    if (this.isDeckLimitReached()) {
      this.logError('O deck pode conter no máximo 50 cartas além do Líder.');
      return;
    }
    this.addCardToDeck(card);
    EventBus.emit('card-count-text', this.cards.length);
  }

  private getAllColorsFromExistingCards(): ColorEnum[] {
    const colors: ColorEnum[] = [];
    this.cards.forEach(card => {
      if (card.color) {
        card.color.forEach(color => {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        });
      }
    });
    return colors;
  }

  private doesLeaderHaveAllColors(existingColors: ColorEnum[], leaderColors: ColorEnum[]): boolean {
    return existingColors.every(color => leaderColors.includes(color));
  }

  private isLeaderCard(card: CardInterface): boolean {
    return card.characterType === CharacterTypeEnum.Leader;
  }

  private setLeader(card: CardInterface): void {
    this.hasLeader = true;
    this.leaderColors = card.color;
  }

  private isCardColorValid(card: CardInterface): boolean {
    return card.color.some(color => this.leaderColors.includes(color));
  }

  private isCardCopyLimitReached(card: CardInterface): boolean {
    return this.cards.filter(c => c.id === card.id).length >= 4;
  }

  private isDeckLimitReached(): boolean {
    return this.cards.length >= 51;
  }

  private addCardToDeck(card: CardInterface): void {
    this.scrollablePanel.clear(true);
    this.cards.push(card);
    this.createDeck();
  }

  private logError(message: string): void {
    this.showToast(message);
    console.log(message);
  }

  private removeCard(cardId: number): void {
    const cardIndex = this.cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      this.cards.splice(cardIndex, 1);
      if (this.cards.length === 0) {
        this.clearDeck();
      } else {
        if (this.cards.every(card => !this.isLeaderCard(card))) {
          this.hasLeader = false;
          this.leaderColors = [];
        }
      }
      this.scrollablePanel.clear(true);
      this.createDeck();
      EventBus.emit('card-count-text', this.cards.length);
      EventBus.emit('set-visible-card', false);
    } else {
      this.logError('Carta não encontrada no deck.');
    }
  }

  private showToast(message: string): void {
    const { width, height } = this.scene.scale;
    this.scene.rexUI.add
      .toast({
        x: width / 2,
        y: height / 2,
        background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e),
        text: this.scene.add.text(0, 0, '', {
          fontSize: '24px',
          fontFamily: 'AlineaSans',
        }),
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      })
      .showMessage(message);
  }

  private checkLeader(cards: CardInterface[]): void {
    const leaderCard = cards.find(card => card.characterType === CharacterTypeEnum.Leader);
    if (leaderCard) {
      this.hasLeader = true;
      this.leaderColors = leaderCard.color;
    } else {
      this.hasLeader = false;
      this.leaderColors = [];
    }
    console.log('Líder verificado. Cores do líder:', this.leaderColors);
  }
}
