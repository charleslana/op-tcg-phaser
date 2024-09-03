import * as Phaser from 'phaser';
import { Checkbox } from '@/game/shared/Checkbox';
import { ColorEnum } from '@/game/enums/color-enum';
import { EventBus } from '@/game/EventBus';
import { InputText } from '@/game/shared/InputText';
import { useCardStore } from '@/stores/card-store';

export class Filter extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  public inputSearchTerm: InputText = <InputText>{};

  private redFilter = false;
  private blueFilter = false;
  private blackFilter = false;
  private greenFilter = false;
  private purpleFilter = false;
  private yellowFilter = false;
  private countText: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private emitEventName = 'filter-card-color';
  private maxTextWidth = 183;

  public create(): void {
    this.createDeckFilter();
    this.createCountTotalCard();
    EventBus.on('card-count-text', this.changeCountText, this);
  }

  public destroy(fromScene: boolean = false): void {
    EventBus.off('card-count-text', this.changeCountText, this);
    super.destroy(fromScene);
  }

  private createDeckFilter(): void {
    this.createRedFilter();
    this.createBlueFilter();
    this.createBlackFilter();
    this.createGreenFilter();
    this.createPurpleFilter();
    this.createYellowFilter();
    this.createLimitCardFilter();
    this.createSearchTermInput();
    this.createCardCountText();
  }

  private createRedFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650,
      positionY: 520,
      text: 'checkbox_red',
      onChange: (value: boolean) => (this.redFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Red,
    });
    this.adjustFontSize(createCheckbox.text);
  }

  private createBlueFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + this.maxTextWidth,
      positionY: 520,
      text: 'checkbox_blue',
      onChange: (value: boolean) => (this.blueFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Blue,
    });
    this.adjustFontSize(createCheckbox.text);
  }

  private createBlackFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + this.maxTextWidth * 2,
      positionY: 520,
      text: 'checkbox_black',
      onChange: (value: boolean) => (this.blackFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Black,
    });
  }

  private createGreenFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650,
      positionY: 520 + 60,
      text: 'checkbox_green',
      onChange: (value: boolean) => (this.greenFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Green,
    });
  }

  private createPurpleFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + this.maxTextWidth,
      positionY: 520 + 60,
      text: 'checkbox_purple',
      onChange: (value: boolean) => (this.purpleFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Purple,
    });
  }

  private createYellowFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + this.maxTextWidth * 2,
      positionY: 520 + 60,
      text: 'checkbox_yellow',
      onChange: (value: boolean) => (this.yellowFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Yellow,
    });
    this.adjustFontSize(createCheckbox.text);
  }

  private createLimitCardFilter(): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + this.maxTextWidth * 3,
      positionY: 520 + 30,
      text: 'checkbox_limit',
      checked: true,
      readOnly: true,
    });
    this.adjustFontSize(createCheckbox.text);
  }

  private adjustFontSize(textObject: Phaser.GameObjects.Text): void {
    let fontSize = 25;
    const maxWidth = this.maxTextWidth - 50;
    textObject.setFontSize(fontSize);
    while (textObject.getBounds().width > maxWidth && fontSize > 10) {
      fontSize -= 1;
      textObject.setFontSize(fontSize);
    }
  }

  private createSearchTermInput(): void {
    this.inputSearchTerm = new InputText(this.scene, 'filterTerm', true, 25);
    this.inputSearchTerm.placeholder = 'input_search';
    this.inputSearchTerm.create();
    this.inputSearchTerm.changePosition(650 + this.maxTextWidth * 4 + 140, 520 + 30);
    this.inputSearchTerm.onNameChanged((newName: string) => {
      console.log('Name changed to:', newName);
      EventBus.emit('filter-name', newName);
    });
  }

  private createCardCountText(): void {
    this.countText = this.scene.add
      .text(650 + this.maxTextWidth * 4 + 310, 520 + 30, '0 / 51', {
        fontSize: '30px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0, 0.5);
    this.countText.setLetterSpacing(0);
  }

  private createCountTotalCard(): void {
    const { width, height } = this.scene.scale;
    const cardStore = useCardStore();
    const textObject = this.scene.add
      .text(width / 2 + 250, height / 2 + 60, `Total cartas: ${cardStore.cards.length}`, {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0.5, 0);
    textObject.translation = this.scene.translation.add(textObject, {
      translationKey: 'text_total_cards',
      interpolation: [cardStore.cards.length],
    });
  }

  private changeCountText(newText: string): void {
    this.countText.setText(`${newText} / 51`);
  }
}
