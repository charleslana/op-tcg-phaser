import SimpleDropDownList from 'phaser3-rex-plugins/templates/ui/simpledropdownlist/SimpleDropDownList';
import { ButtonBeige } from '../shared/ButtonBeige';
import { DeckInterface } from '../interfaces/deck-interface';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class Deck extends Scene {
  constructor() {
    super(SceneEnum.Deck);
  }

  private inputName: InputText = <InputText>{};
  private dropDownList: SimpleDropDownList = <SimpleDropDownList>{};
  private deckSelected: DeckInterface = <DeckInterface>{ id: 0 };
  private redFilter = false;
  private blueFilter = false;

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.DeckBackground).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createDecksDropdown();
    this.createLoadDeckButton();
    this.createInputName();
    this.createSaveDeckButton();
    this.createBackButton();
    this.createClearDeckButton();
    this.createDeckInPanel();
    this.createDeckFilter();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputName.update();
  }

  private createDecksDropdown(): void {
    const style = this.getDropdownStyle();
    const options = this.getDropdownOptions();
    this.dropDownList = this.rexUI.add
      .simpleDropDownList(style)
      .resetDisplayContent('  Selecione um deck')
      .setOptions(options)
      .setPosition(200, 100)
      .layout();
    this.setupDropdownEvents();
  }

  private getDropdownStyle(): SimpleDropDownList.IConfig {
    return {
      label: {
        space: { left: 0, right: 0, top: 20, bottom: 20 },
        background: { color: 0xfffffff },
        text: {
          fontSize: 23,
          fixedWidth: 300,
          fontFamily: 'LiberationSans',
          color: 0xf000000,
        },
        height: 20,
      },
      button: {
        space: { left: 10, right: 10, top: 20, bottom: 20 },
        background: {
          color: 0xffffff,
          strokeWidth: 0,
          'hover.strokeColor': 0xf000000,
          'hover.strokeWidth': 2,
        },
        text: {
          fontSize: 23,
          fixedWidth: 280,
          fontFamily: 'LiberationSans',
          color: 0xfffffff,
        },
      },
    };
  }

  private getDropdownOptions(): { text: string; value: number }[] {
    const options = [
      { text: 'Deck A', value: 1 },
      { text: 'Deck B', value: 2 },
      { text: 'Deck C', value: 3 },
      { text: 'Deck D', value: 4 },
      { text: 'Deck E', value: 5 },
      { text: 'Deck F', value: 6 },
      { text: 'Deck G', value: 7 },
      { text: 'Deck H', value: 8 },
      { text: 'Deck I', value: 9 },
      { text: 'Deck J', value: 10 },
      { text: 'Deck K', value: 11 },
      { text: 'Deck L', value: 12 },
      { text: 'Deck M', value: 13 },
      { text: 'Deck N', value: 14 },
      { text: 'Deck O', value: 15 },
      { text: 'Deck P', value: 16 },
      { text: 'Deck Q', value: 17 },
      { text: 'Deck R', value: 18 },
      { text: 'Deck S', value: 19 },
      { text: 'Deck T', value: 20 },
      { text: 'Deck U', value: 21 },
      { text: 'Deck V', value: 22 },
      { text: 'Deck W', value: 23 },
      { text: 'Deck X', value: 24 },
      { text: 'Deck Y', value: 25 },
      { text: 'Deck Z', value: 26 },
      { text: 'Deck AA', value: 27 },
      { text: 'Deck AB', value: 28 },
      { text: 'Deck AC', value: 29 },
      { text: 'Deck AD', value: 30 },
      { text: 'Deck AE', value: 31 },
      { text: 'Deck AF', value: 32 },
      { text: 'Deck AG', value: 33 },
      { text: 'Deck AH', value: 34 },
      { text: 'Deck AI', value: 35 },
      { text: 'Deck AJ', value: 36 },
      { text: 'Deck AK', value: 37 },
      { text: 'Deck AL', value: 38 },
      { text: 'Deck AM', value: 39 },
      { text: 'Deck AN', value: 40 },
      { text: 'Deck AO', value: 41 },
      { text: 'Deck AP', value: 42 },
      { text: 'Deck AQ', value: 43 },
      { text: 'Deck AR', value: 44 },
      { text: 'Deck AS', value: 45 },
      { text: 'Deck AT', value: 46 },
      { text: 'Deck AU', value: 47 },
      { text: 'Deck AV', value: 48 },
      { text: 'Deck AW', value: 49 },
      { text: 'Deck AX', value: 50 },
    ];
    return options;
  }

  private setupDropdownEvents(): void {
    const self = this;
    this.dropDownList.on(
      'button.click',
      function (
        dropDownList: SimpleDropDownList,
        _listPanel: SimpleDropDownList,
        button: SimpleDropDownList
      ) {
        dropDownList.setText('  ' + button.text);
        self.deckSelected.id = button.value;
        self.deckSelected.name = button.text;
      }
    );
  }

  private createLoadDeckButton(): void {
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 200 + 270,
      positionY: 100,
      text: 'Carregar',
      scaleX: 1,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.changeInputName());
  }

  private changeInputName(): void {
    console.log(this.deckSelected);
    this.inputName.text = this.deckSelected.name;
    this.inputName.updateName(this.deckSelected.name);
  }

  private createInputName(): void {
    this.inputName = new InputText(this);
    this.inputName.placeholder = 'Digite o nome do deck';
    this.inputName.create();
    this.inputName.changePosition(200, 200);
  }

  private createSaveDeckButton(): void {
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 200 + 250,
      positionY: 200,
      text: 'Salvar',
      scaleX: 0.8,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => null);
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

  private createClearDeckButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 200 + 220,
      positionY: height / 1.1,
      text: 'Limpar deck',
      scaleX: 1.4,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.clearDeck());
  }

  private clearDeck(): void {
    this.dropDownList.setText('  Selecione um deck');
    this.deckSelected.id = 0;
    this.inputName.text = '';
    this.inputName.updateName(this.inputName.placeholder);
  }

  private createDeckInPanel(): void {
    const panel = this.add.image(400, 400, ImageEnum.PanelBeige);
    panel.setOrigin(0, 0.5);
    panel.setPosition(630, 273);
    panel.setAlpha(0.4);
    panel.setScale(12, 4.2);
  }

  private createDeckFilter(): void {
    const redFilter = this.createCheckbox(
      650,
      520,
      'Vermelho',
      (value: boolean) => (this.redFilter = value)
    );
    this.createCheckbox(
      650 + redFilter,
      520,
      'Azul',
      (value: boolean) => (this.blueFilter = value)
    );
  }

  private createCheckbox(
    positionX: number,
    positionY: number,
    text: string,
    onChange: (value: boolean) => void,
    readOnly?: boolean
  ): number {
    const checkbox = this.rexUI.add.checkbox(positionX, positionY, 40, 40, 0xffffff);
    checkbox.setBoxFillStyle(0xffffff, 1);
    checkbox.setCheckerStyle(0x000000, 1);
    checkbox.setUncheckedBoxFillStyle(0xffffff, 1);
    checkbox.setBoxStrokeStyle(0, 0x000000, 1);
    checkbox.setValue(false);
    if (readOnly) {
      checkbox.setReadOnly(true);
    }
    checkbox.on('valuechange', function (value: boolean) {
      onChange(value);
      console.log(`${text} filter: ${value}`);
    });
    const labelText = this.add
      .text(positionX, positionY, `    ${text}`, {
        fontSize: '30px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(0, 0.5);
    labelText.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      if (!readOnly) {
        checkbox.setValue(!checkbox.checked);
      }
    });
    return checkbox.width + labelText.width + 30;
  }
}