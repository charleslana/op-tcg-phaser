import SimpleDropDownList from 'phaser3-rex-plugins/templates/ui/simpledropdownlist/SimpleDropDownList';
import { ButtonBeige } from '@/game/shared/ButtonBeige';
import { CardList } from './CardList';
import { Deck } from './Deck';
import { EventBus } from '@/game/EventBus';
import { Filter } from './Filter';
import { FloatingCard } from './FloatingCard';
import { ImageEnum } from '@/game/enums/image-enum';
import { InputText } from '@/game/shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '@/game/enums/scene-enum';
import { useCardStore } from '@/stores/card-store';
import { UserDeckInterface } from '@/game/interfaces/user-deck-interface';
import { useUserStore } from '@/stores/user-store';
import { Version } from '@/game/shared/Version';

export class DeckScene extends Scene {
  constructor() {
    super(SceneEnum.Deck);
  }

  private inputName: InputText = <InputText>{};
  private dropDownList: SimpleDropDownList = <SimpleDropDownList>{};
  private deckSelected: UserDeckInterface = <UserDeckInterface>{ id: 0 };
  private deck: Deck = <Deck>{};
  private filter: Filter = <Filter>{};
  private userStore = useUserStore();
  private cardStore = useCardStore();
  private deleteDeckButton: ButtonBeige = <ButtonBeige>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.DeckBackground).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    console.log(this.userStore.user.id, 'user-store');
    this.userStore.setData();
    this.cardStore.setData();
  }

  create() {
    this.createDecksDropdown();
    this.createLoadDeckButton();
    this.createInputName();
    this.createSaveDeckButton();
    this.createInfo();
    this.createBackButton();
    this.createClearDeckButton();
    this.createDeleteDeckButton();
    this.deck = new Deck(this);
    this.filter = new Filter(this);
    new CardList(this);
    new FloatingCard(this);
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputName.update();
    this.filter.inputSearchTerm.update();
  }

  private createDecksDropdown(): void {
    const style = this.getDropdownStyle();
    const options = this.userStore.user.decks.map(deck => ({
      text: deck.name,
      value: deck.id,
    }));
    this.dropDownList = this.rexUI.add
      .simpleDropDownList(style)
      .resetDisplayContent('  Selecione um deck')
      .setOptions(options)
      .setPosition(200, 100)
      .layout();
    this.setupDropdownEvents();
  }

  private getDropdownStyle(): SimpleDropDownList.IConfig {
    const COLOR_LIGHT = 0x7b5e57;
    return {
      label: {
        space: { left: 0, right: 0, top: 20, bottom: 20 },
        background: { color: 0xfffffff },
        text: {
          fontSize: 23,
          fixedWidth: 300,
          fontFamily: 'AlineaSans',
          color: 0xf000000,
        },
        height: 20,
      },
      track: { width: 10, color: 0xfffffff },
      thumb: { width: 14, height: 14, color: COLOR_LIGHT },
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
          fontFamily: 'AlineaSans',
          color: 0xfffffff,
        },
      },
      list: {
        maxHeight: 400,
        sliderAdaptThumbSize: true,
        mouseWheelScroller: {
          focus: true,
          speed: 0.1,
        },
      },
    };
  }

  private setupDropdownEvents(): void {
    this.dropDownList.on(
      'button.click',
      (
        dropDownList: SimpleDropDownList,
        _listPanel: SimpleDropDownList,
        button: SimpleDropDownList
      ) => {
        dropDownList.setText('  ' + button.text);
        this.deckSelected.id = button.value;
        this.deckSelected.name = button.text;
      }
    );
  }

  private createLoadDeckButton(): void {
    const button = new ButtonBeige(this);
    button.create({
      positionX: 200 + 270,
      positionY: 100,
      text: 'Carregar',
      key: 'load_button',
      scaleX: 1,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.changeDeckSelected();
    });
  }

  private changeDeckSelected(): void {
    console.log(this.deckSelected);
    if (this.deckSelected.id !== 0) {
      this.deleteDeckButton.showButton('delete_deck_button');
      this.inputName.text = this.deckSelected.name;
      this.inputName.updateName(this.deckSelected.name);
      const deck = this.userStore.getDeck(this.deckSelected.id);
      if (deck) {
        this.deck.updateCards(deck.cards);
        EventBus.emit('check-leader', deck.cards);
      }
      EventBus.emit('card-count-text', '51');
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
    button.create({
      positionX: 200 + 250,
      positionY: 200,
      text: 'Salvar',
      key: 'save_button',
      scaleX: 0.8,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.validateDeckCompleted();
    });
  }

  private validateDeckCompleted(): void {
    const deckName = this.inputName.text.trim();
    if (deckName === '') {
      this.showToast('Preencha o nome do deck.');
      return;
    }
    if (this.deck.getCards().length !== 51) {
      this.showToast('O deck deve conter 51 cartas para salvar.');
      return;
    }
    this.showToast('O deck foi salvo com sucesso.');
  }

  private showToast(message: string): void {
    this.rexUI.add
      .toast({
        x: 400,
        y: 300,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e),
        text: this.add.text(0, 0, '', {
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

  private createInfo(): void {
    const wrappedText = this.add.text(
      300,
      300,
      `Digite Nomes de cartas, Número de Custo, Tipos de Ataque ou Nomes de Categoria sem espaços na barra de Pesquisa para restringir os resultados.
      Colocar colchetes [] em volta de um termo de pesquisa pesquisará por essa palavra exata.
      Outras opções de pesquisa são atualmente: OnKO, Trigger, Activate, EndOfTurn, Blocker, Rush, Counter, OnBlock, OnAttack
      Pesquisar P7000 retornará cartas com 7000 de Poder, e pesquisar C2000 retornará cartas com 2000 de Counter
      Adicionar "<" + número do conjunto pesquisará cartas até um certo conjunto. ou seja, <3.5 pesquisará até ST-08 Luffy e ST-09 Yamato.
      `,
      {
        fontSize: '20px',
        fontFamily: 'AlineaSans',
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
    button.create({
      positionX: 120,
      positionY: height / 1.1,
      text: 'Voltar',
      key: 'back_button',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.scene.start(SceneEnum.Home);
    });
  }

  private createClearDeckButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    button.create({
      positionX: 200 + 220,
      positionY: height / 1.1,
      text: 'Limpar deck',
      key: 'clear_deck_button',
      scaleX: 1.4,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.clearDeck();
    });
  }

  private clearDeck(): void {
    this.dropDownList.setText('  Selecione um deck');
    this.deckSelected = <UserDeckInterface>{ id: 0 };
    this.inputName.text = '';
    this.inputName.updateName(this.inputName.placeholder);
    this.deck.clearDeck();
    this.resetDeleteDeckButton();
    this.deleteDeckButton.hideButton();
    EventBus.emit('card-count-text', '0');
  }

  private createDeleteDeckButton(): void {
    const { height } = this.scale;
    this.deleteDeckButton = new ButtonBeige(this);
    this.deleteDeckButton.create({
      positionX: 200 + 100,
      positionY: height / 1.25,
      text: 'Excluir deck',
      key: 'delete_deck_button',
      scaleX: 1.4,
      scaleY: 1.5,
    });
    this.resetDeleteDeckButton();
    this.deleteDeckButton.hideButton();
  }

  private resetDeleteDeckButton(): void {
    this.deleteDeckButton.onPointerDown(() => {
      this.confirmDeleteDeck();
    });
  }

  private confirmDeleteDeck(): void {
    this.deleteDeckButton.changeText('confirm_delete_deck_button');
    this.deleteDeckButton.onPointerDown(() => {
      this.deleteDeck();
    });
  }

  private deleteDeck(): void {
    this.deleteDeckButton.hideButton();
    this.clearDeck();
  }
}
