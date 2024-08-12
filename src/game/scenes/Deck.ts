import SimpleDropDownList from 'phaser3-rex-plugins/templates/ui/simpledropdownlist/SimpleDropDownList';
import { ButtonBeige } from '../shared/ButtonBeige';
import { DeckInterface } from '../interfaces/deck-interface';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { useUserStore } from '@/stores/user-store';
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
  private blackFilter = false;
  private greenFilter = false;
  private purpleFilter = false;
  private yellowFilter = false;
  private searchTerm: InputText = <InputText>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.DeckBackground).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    const userStore = useUserStore();
    console.log(userStore.userId, 'user-store');
  }

  create() {
    this.createDecksDropdown();
    this.createLoadDeckButton();
    this.createInputName();
    this.createSaveDeckButton();
    this.createInfo();
    this.createBackButton();
    this.createClearDeckButton();
    this.createDeckInPanel();
    this.createDeckFilter();
    this.createDeckOutPanel();
    this.createCardList();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputName.update();
    this.searchTerm.update();
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
      { text: 'Deck B Colocar limite de cha', value: 2 },
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
    if (this.deckSelected.id !== 0) {
      this.inputName.text = this.deckSelected.name;
      this.inputName.updateName(this.deckSelected.name);
    }
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
    buttonCreate.on('pointerdown', () => this.showToast('O deck foi salvo com sucesso.'));
  }

  private showToast(message: string): void {
    this.rexUI.add
      .toast({
        x: 400,
        y: 300,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e),
        text: this.add.text(0, 0, '', {
          fontSize: '24px',
          fontFamily: 'LiberationSans',
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

  private createInfo(): void {
    const wrappedText = this.add.text(
      300,
      300,
      `Digite Nomes de cartas, Número de Custo, Tipos de Ataque ou Nomes de Categoria sem espaços na barra de Pesquisa para restringir os resultados.
      Colocar colchetes [] em volta de um termo de pesquisa pesquisará por essa palavra exata.
      Outras opções de pesquisa são atualmente: OnKO, Trigger, Activate, EndOfTurn, Blocker, Rush, Counter, OnBlock, OnAttack
      Pesquisar P7000 retornará cartas com 7000 de Poder, e pesquisar C2000 retornará cartas com 2000 de Contador
      Adicionar "<" + número do conjunto pesquisará cartas até um certo conjunto. ou seja, <3.5 pesquisará até ST-08 Luffy e ST-09 Yamato.
      `,
      {
        fontSize: '20px',
        fontFamily: 'LiberationSans',
        color: '#000000',
        wordWrap: { width: 500 },
        align: 'left',
        lineSpacing: 10,
      }
    );
    wrappedText.setOrigin(0.5, 0);
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

  private createSearchTermInput(
    redFilter: number,
    blueFilter: number,
    yellowFilter: number,
    limitCard: number
  ): void {
    this.searchTerm = new InputText(this);
    this.searchTerm.placeholder = 'Pesquisar';
    this.searchTerm.create();
    this.searchTerm.changePosition(
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
    const text = this.add
      .text(650 + redFilter + blueFilter + yellowFilter + limitCard + 300, 520 + 30, '51 / 51', {
        fontSize: '30px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(0, 0.5);
    text.setLetterSpacing(0);
  }

  private createCheckbox(
    positionX: number,
    positionY: number,
    text: string,
    onChange: (value: boolean) => void,
    readOnly?: boolean,
    checked?: boolean
  ): number {
    const checkbox = this.rexUI.add.checkbox(positionX, positionY, 40, 40, 0xffffff);
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
    const labelText = this.add
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

  private createDeckOutPanel(): void {
    const panel = this.add.image(400, 400, ImageEnum.PanelBeige);
    panel.setOrigin(0, 0.5);
    panel.setPosition(630, 840);
    panel.setAlpha(0.4);
    panel.setScale(12, 4.2);
  }

  private createCardList(): void {
    const COLOR_MAIN = 0x4e342e;
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;

    const scrollMode = 0;
    const scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 640,
        y: 840,
        width: 1180,
        height: 400,

        scrollMode: scrollMode,

        // background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

        panel: {
          child: this.createGrid(this, scrollMode),
          mask: {
            // mask: true,
            padding: 1,
          },
        },

        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
          // position: 'left'
        },

        mouseWheelScroller: {
          focus: false,
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

    const print = this.add.text(0, 0, '');

    scrollablePanel
      .setChildrenInteractive({})
      .on('child.over', function (child: any, pointer: any, event: any) {
        print.text += `Pointer Over ${child.text}\n`;
      })
      .on('child.out', function (child: any, pointer: any, event: any) {
        print.text += `Pointer Out ${child.text}\n`;
      })
      .on('child.click', function (child: any, pointer: any, event: any) {
        print.text += `Click ${child.text}\n`;
      })
      .on('child.pressstart', function (child: any, pointer: any, event: any) {
        print.text += `Press ${child.text}\n`;
      });
  }

  private createGrid(scene: Scene, orientation: any) {
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;
    const sizer = scene.rexUI.add.fixWidthSizer({
      // orientation: orientation,
      space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        item: 0,
        line: 0,
      },
    });
    // .addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK));
    const width = 100;
    const height = 150;
    for (let i = 0; i < 200; i++) {
      sizer.add(
        // scene.rexUI.add.label({
        //   width: 60,
        //   height: 60,

        //   background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
        //   text: scene.add.text(0, 0, `${i}`, {
        //     fontSize: 18,
        //   }),

        //   align: 'center',
        //   space: {
        //     left: 10,
        //     right: 10,
        //     top: 10,
        //     bottom: 10,
        //   },
        // })
        this.add.image(0, 0, ImageEnum.ST01_001_Card).setOrigin(0).setDisplaySize(width, height),
        { key: '1' }
      );
    }

    return sizer;
  }
}
