import * as Phaser from 'phaser';
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

  public create(): void {
    this.createDeckFilter();
    this.createCountTotalCard();
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
    return this.createCheckbox(650, 520, 'Vermelho', (value: boolean) => (this.redFilter = value));
  }

  private createBlueFilter(redFilter: number): number {
    return this.createCheckbox(
      650 + redFilter,
      520,
      'Azul',
      (value: boolean) => (this.blueFilter = value)
    );
  }

  private createBlackFilter(redFilter: number, blueFilter: number): void {
    this.createCheckbox(
      650 + redFilter + blueFilter,
      520,
      'Preto',
      (value: boolean) => (this.blueFilter = value)
    );
  }

  private createGreenFilter(): void {
    this.createCheckbox(650, 520 + 60, 'Verde', (value: boolean) => (this.greenFilter = value));
  }

  private createPurpleFilter(redFilter: number): void {
    this.createCheckbox(
      650 + redFilter,
      520 + 60,
      'Roxo',
      (value: boolean) => (this.purpleFilter = value)
    );
  }

  private createYellowFilter(redFilter: number, blueFilter: number): number {
    return this.createCheckbox(
      650 + redFilter + blueFilter,
      520 + 60,
      'Amarelo',
      (value: boolean) => (this.yellowFilter = value)
    );
  }

  private createLimitCardFilter(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number
  ): number {
    return this.createCheckbox(
      650 + redFilter + blueFilter + yellowFilter,
      520 + 30,
      'Limite de 4',
      () => null,
      true,
      true
    );
  }

  private createCheckbox(
    positionX: number,
    positionY: number,
    text: string,
    onChange: (value: boolean) => void,
    readOnly?: boolean,
    checked?: boolean
  ): number {
    const checkbox = this.scene.rexUI.add.checkbox(positionX, positionY, 40, 40, 0xffffff);
    checkbox.setBoxFillStyle(0xffffff, 1);
    checkbox.setCheckerStyle(0x000000, 1);
    checkbox.setUncheckedBoxFillStyle(0xffffff, 1);
    checkbox.setBoxStrokeStyle(0, 0x000000, 1);
    checkbox.setValue(checked ?? false);
    if (readOnly) {
      checkbox.setReadOnly(true);
    }
    checkbox.on('valuechange', function (value: boolean) {
      onChange(value);
      console.log(`${text} filter: ${value}`);
    });
    const labelText = this.scene.add
      .text(positionX, positionY, `    ${text}`, {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(0, 0.5);
    if (!readOnly) {
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
    this.inputSearchTerm = new InputText(this.scene);
    this.inputSearchTerm.placeholder = 'Pesquisar';
    this.inputSearchTerm.create();
    this.inputSearchTerm.changePosition(
      650 + redFilter + blueFilter + yellowFilter + limitCard + 100,
      520 + 30
    );
  }

  private createCardCountText(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number,
    limitCard: number
  ): void {
    const text = this.scene.add
      .text(650 + redFilter + blueFilter + yellowFilter + limitCard + 300, 520 + 30, '51 / 51', {
        fontSize: '30px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(0, 0.5);
    text.setLetterSpacing(0);
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
}
