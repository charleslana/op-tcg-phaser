import { ButtonBeige } from '../shared/ButtonBeige';
import { Checkbox } from '../shared/Checkbox';
import { CheckboxInterface } from '../interfaces/checkbox-interface';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class SettingScene extends Scene {
  constructor() {
    super(SceneEnum.Setting);
  }

  private inputPlayerName: InputText = <InputText>{};
  private autoDraw = false;
  private autoSkipBlock = false;
  private autoSkipTrigger = false;
  private confirmEndTurn = false;
  private confirmDonAttach = false;
  private dynamicPlaySheets = false;

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createPlayerName();
    this.createInputPlayerName();
    const checkboxes = this.createTextOptions();
    this.createInfoCheckbox(checkboxes);
    this.createBackButton();
    this.createSaveButton();
    this.createUpdatePasswordButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputPlayerName.update();
  }

  private createPlayerName(): void {
    const { width } = this.scale;
    this.add
      .text(width / 2, 50, 'Nome do jogador', {
        fontSize: '20px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0.5);
  }

  private createInputPlayerName(): void {
    const { width } = this.scale;
    this.inputPlayerName = new InputText(this);
    this.inputPlayerName.placeholder = '';
    this.inputPlayerName.create();
    this.inputPlayerName.updateName('Jogador00001');
    this.inputPlayerName.text = 'Jogador00001';
    this.inputPlayerName.changePosition(width / 2, 120);
  }

  private createTextOptions(): CheckboxInterface[] {
    const { width } = this.scale;
    const checkboxes: CheckboxInterface[] = [
      {
        positionX: width / 2 - 500,
        positionY: 250,
        text: 'Compra automática',
        checked: false,
        onChange: (value: boolean) => (this.autoDraw = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 320,
        text: 'Pular bloqueio automaticamente',
        checked: true,
        onChange: (value: boolean) => (this.autoSkipBlock = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 390,
        text: 'Pular gatilho automático',
        checked: false,
        onChange: (value: boolean) => (this.autoSkipTrigger = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 460,
        text: 'Confirmar fim de turno',
        checked: true,
        onChange: (value: boolean) => (this.confirmEndTurn = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 530,
        text: 'Confirmar anexar Don',
        checked: false,
        onChange: (value: boolean) => (this.confirmDonAttach = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 600,
        text: 'Fichas de jogo dinâmicas',
        checked: true,
        onChange: (value: boolean) => (this.dynamicPlaySheets = value),
        fontSize: 20,
      },
      {
        positionX: width / 2 - 500,
        positionY: 670,
        text: 'Botão Fim de turno alterado',
        checked: true,
        onChange: (value: boolean) => (this.dynamicPlaySheets = value),
        fontSize: 20,
      },
    ];
    checkboxes.forEach(checkbox => {
      const createCheckbox = new Checkbox(this);
      createCheckbox.create(checkbox);
    });
    return checkboxes;
  }

  private createInfoCheckbox(checkboxes: CheckboxInterface[]): void {
    const style = { font: '20px AlineaSans', fill: '#000000' };
    const infoTexts = [
      'Compra automática no início de cada turno sem clicar no botão Comprar',
      'Pular automaticamente a etapa de Bloqueio durante ataques se você não tiver Bloqueadores',
      'Pular automaticamente a etapa de Gatilho se sua carta de Vida não tiver Gatilho\n(Cuidado: pode dar informações ao oponente!)',
      "O botão 'Fim de turno' deve ser clicado duas vezes antes do turno terminar",
      'Após anexar Don, deve clicar em um botão para confirmar a anexação de Don ou Cancelar',
      'Usar uma ficha de jogo diferente com base na cor de cada Líder, em vez de uma ficha de jogo definida',
      "O botão 'Fim de turno' estará em um local diferente dos botões de Ação padrão",
    ];
    infoTexts.forEach((text, index) => {
      this.add
        .text(checkboxes[index].positionX + 500, checkboxes[index].positionY, text, style)
        .setOrigin(0, 0.5);
    });
  }

  private createSaveButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width / 2,
      positionY: height / 1.2,
      text: 'Salvar',
      scaleX: 1,
      scaleY: 1.8,
    });
    buttonCreate.on('pointerdown', () => this.save());
  }

  private save(): void {}

  private createUpdatePasswordButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width - 300,
      positionY: height / 1.2,
      text: 'Alterar Senha',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Password));
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
}
