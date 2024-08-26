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
    const redFilter = this.createRedFilter();
    const blueFilter = this.createBlueFilter(redFilter);
    this.createBlackFilter(redFilter, blueFilter);
    this.createGreenFilter();
    this.createPurpleFilter(redFilter);
    const yellowFilter = this.createYellowFilter(redFilter, blueFilter);
    const limitCard = this.createLimitCardFilter(redFilter, blueFilter, yellowFilter);
    this.createSearchTermInput(redFilter, blueFilter, yellowFilter, limitCard);
    this.createCardCountText(redFilter, blueFilter, yellowFilter, limitCard);
  }

  private createRedFilter(): number {
    const createCheckbox = new Checkbox(this.scene);
    return createCheckbox.create({
      positionX: 650,
      positionY: 520,
      text: 'Vermelho',
      onChange: (value: boolean) => (this.redFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Red,
    });
  }

  private createBlueFilter(redFilter: number): number {
    const createCheckbox = new Checkbox(this.scene);
    return createCheckbox.create({
      positionX: 650 + redFilter,
      positionY: 520,
      text: 'Azul',
      onChange: (value: boolean) => (this.blueFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Blue,
    });
  }

  private createBlackFilter(redFilter: number, blueFilter: number): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + redFilter + blueFilter,
      positionY: 520,
      text: 'Preto',
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
      text: 'Verde',
      onChange: (value: boolean) => (this.greenFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Green,
    });
  }

  private createPurpleFilter(redFilter: number): void {
    const createCheckbox = new Checkbox(this.scene);
    createCheckbox.create({
      positionX: 650 + redFilter,
      positionY: 520 + 60,
      text: 'Roxo',
      onChange: (value: boolean) => (this.purpleFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Purple,
    });
  }

  private createYellowFilter(redFilter: number, blueFilter: number): number {
    const createCheckbox = new Checkbox(this.scene);
    return createCheckbox.create({
      positionX: 650 + redFilter + blueFilter,
      positionY: 520 + 60,
      text: 'Amarelo',
      onChange: (value: boolean) => (this.yellowFilter = value),
      eventEmit: this.emitEventName,
      valueEmit: ColorEnum.Yellow,
    });
  }

  private createLimitCardFilter(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number
  ): number {
    const createCheckbox = new Checkbox(this.scene);
    return createCheckbox.create({
      positionX: 650 + redFilter + blueFilter + yellowFilter,
      positionY: 520 + 30,
      text: 'Limite de 4',
      checked: true,
      readOnly: true,
    });
  }

  private createSearchTermInput(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number,
    limitCard: number
  ): void {
    this.inputSearchTerm = new InputText(this.scene, 'filterTerm', true, 25);
    this.inputSearchTerm.placeholder = 'Pesquisar';
    this.inputSearchTerm.create();
    this.inputSearchTerm.changePosition(
      650 + redFilter + blueFilter + yellowFilter + limitCard + 100,
      520 + 30
    );
    this.inputSearchTerm.onNameChanged((newName: string) => {
      console.log('Name changed to:', newName);
      EventBus.emit('filter-name', newName);
    });
  }

  private createCardCountText(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number,
    limitCard: number
  ): void {
    this.countText = this.scene.add
      .text(650 + redFilter + blueFilter + yellowFilter + limitCard + 300, 520 + 30, '0 / 51', {
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
    this.scene.add.text(
      width / 2 + 200,
      height / 2 + 60,
      `Total cartas: ${cardStore.cards.length}`,
      {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      }
    );
  }

  private changeCountText(newText: string): void {
    this.countText.setText(`${newText} / 51`);
  }
}
