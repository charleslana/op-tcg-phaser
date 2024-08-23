import * as Phaser from 'phaser';
import { ColorEnum } from '@/game/enums/color-enum';
import { EventBus } from '@/game/EventBus';
import { InputText } from '@/game/shared/InputText';
import { useCardStore } from '@/stores/card-store';

export interface FilterEnum {
  positionX: number;
  positionY: number;
  text: string;
  onChange?: (value: boolean) => void;
  readOnly?: boolean;
  checked?: boolean;
  color?: ColorEnum;
}

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

  public create(): void {
    this.createDeckFilter();
    this.createCountTotalCard();
    EventBus.on('card-count-text', this.changeCountText, this);
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
    return this.createCheckbox({
      positionX: 650,
      positionY: 520,
      text: 'Vermelho',
      onChange: (value: boolean) => (this.redFilter = value),
      color: ColorEnum.Red,
    });
  }

  private createBlueFilter(redFilter: number): number {
    return this.createCheckbox({
      positionX: 650 + redFilter,
      positionY: 520,
      text: 'Azul',
      onChange: (value: boolean) => (this.blueFilter = value),
      color: ColorEnum.Blue,
    });
  }

  private createBlackFilter(redFilter: number, blueFilter: number): void {
    this.createCheckbox({
      positionX: 650 + redFilter + blueFilter,
      positionY: 520,
      text: 'Preto',
      onChange: (value: boolean) => (this.blackFilter = value),
      color: ColorEnum.Black,
    });
  }

  private createGreenFilter(): void {
    this.createCheckbox({
      positionX: 650,
      positionY: 520 + 60,
      text: 'Verde',
      onChange: (value: boolean) => (this.greenFilter = value),
      color: ColorEnum.Green,
    });
  }

  private createPurpleFilter(redFilter: number): void {
    this.createCheckbox({
      positionX: 650 + redFilter,
      positionY: 520 + 60,
      text: 'Roxo',
      onChange: (value: boolean) => (this.purpleFilter = value),
      color: ColorEnum.Purple,
    });
  }

  private createYellowFilter(redFilter: number, blueFilter: number): number {
    return this.createCheckbox({
      positionX: 650 + redFilter + blueFilter,
      positionY: 520 + 60,
      text: 'Amarelo',
      onChange: (value: boolean) => (this.yellowFilter = value),
      color: ColorEnum.Yellow,
    });
  }

  private createLimitCardFilter(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number
  ): number {
    return this.createCheckbox({
      positionX: 650 + redFilter + blueFilter + yellowFilter,
      positionY: 520 + 30,
      text: 'Limite de 4',
      checked: true,
      readOnly: true,
    });
  }

  private createCheckbox(filter: FilterEnum): number {
    const checkbox = this.scene.rexUI.add.checkbox(
      filter.positionX,
      filter.positionY,
      40,
      40,
      0xffffff
    );
    checkbox.setBoxFillStyle(0xffffff, 1);
    checkbox.setCheckerStyle(0x000000, 1);
    checkbox.setUncheckedBoxFillStyle(0xffffff, 1);
    checkbox.setBoxStrokeStyle(0, 0x000000, 1);
    checkbox.setValue(filter.checked ?? false);
    if (filter.readOnly) {
      checkbox.setReadOnly(true);
    }
    checkbox.on('valuechange', function (value: boolean) {
      if (filter.onChange) {
        filter.onChange(value);
      }
      console.log(`${filter.text} filter: ${value}`);
      if (filter.color) {
        EventBus.emit('filter-card-color', filter.color, value);
      }
    });
    const labelText = this.scene.add
      .text(filter.positionX, filter.positionY, `    ${filter.text}`, {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(0, 0.5);
    if (!filter.readOnly) {
      labelText.setInteractive({ useHandCursor: false }).on('pointerdown', () => {
        checkbox.setValue(!checkbox.checked);
      });
    }
    return checkbox.width + labelText.width + 30;
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
        fontFamily: 'LiberationSans',
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
        fontFamily: 'LiberationSans',
      }
    );
  }

  private changeCountText(newText: string): void {
    this.countText.setText(`${newText} / 51`);
  }
}
