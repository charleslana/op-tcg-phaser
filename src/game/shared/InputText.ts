import * as Phaser from 'phaser';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputStateInterface } from '../interfaces/input-state-interface';

export class InputText extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    eventName = 'nameChanged',
    allowSpecialCharacters = false,
    maxLength = 16
  ) {
    super(scene);
    this.scene.add.existing(this);
    this.eventName = eventName;
    this.allowSpecialCharacters = allowSpecialCharacters;
    this.maxLength = maxLength;
  }

  public placeholder = 'Enter your name...';
  public text = '';

  private frame: Phaser.GameObjects.Image = {} as Phaser.GameObjects.Image;
  private inputState: InputStateInterface = {} as InputStateInterface;
  private cursorTween: Phaser.Tweens.Tween = {} as Phaser.Tweens.Tween;
  private eventName: string;
  private allowSpecialCharacters: boolean;
  private maxLength: number;

  public create(): void {
    this.initializeKeyboard();
    this.createNameText();
    this.createFrame();
    this.createCursor();
    this.createCursorTween();
    this.setupInputEvents();
    this.createInputMobile();
    this.add([this.frame, this.inputState.nameText, this.inputState.formCursor]);
  }

  public update(): void {
    this.updateCursorPosition();
  }

  public destroy(fromScene: boolean = false): void {
    EventBus.off(this.eventName);
    super.destroy(fromScene);
  }

  public changePosition(x: number, y: number): void {
    this.updatePosition(x, y);
  }

  public toggleVisibility(): void {
    this.inputState.isHidden = !this.inputState.isHidden;
  }

  public updateDisplay(): void {
    this.updateNameText();
  }

  public updateName(nameText: string): void {
    this.inputState.nameText.setText(nameText);
    this.inputState.name = nameText;
  }

  public onNameChanged(listener: (name: string) => void): void {
    EventBus.on(this.eventName, listener);
  }

  private initializeKeyboard(): void {
    this.scene.input.keyboard?.createCursorKeys();
  }

  private createNameText(): void {
    const nameTextConfig = { fontFamily: 'AlineaSans', fontSize: '23px', fill: '#000000' };
    this.inputState.name = this.placeholder;
    this.inputState.nameText = this.scene.add
      .text(420, 315, this.inputState.name, nameTextConfig)
      .setDepth(21);
  }

  private createFrame(): void {
    this.frame = this.scene.add.image(550, 325, ImageEnum.PanelBeige);
    this.frame.setScale(3, 0.7).setInteractive().setDepth(22);
    this.activateCursor(this.frame);
  }

  private createCursor(): void {
    const cursorConfig = { fontFamily: 'AlineaSans', fontSize: '32px', fill: '#000000' };
    this.inputState.formCursor = this.scene.add.text(420, 310, '|', cursorConfig);
    this.inputState.formCursor.setDepth(21).setAlpha(0);
  }

  private createCursorTween(): void {
    this.cursorTween = this.scene.tweens.add({
      targets: this.inputState.formCursor,
      alpha: 1,
      duration: 300,
      hold: 600,
      yoyo: true,
      repeat: -1,
      paused: true,
    });
  }

  private setupInputEvents(): void {
    this.scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (this.inputState.isEnteringName) {
        this.handleKeyboardInput(event);
      }
    });
  }

  private handleKeyboardInput(event: KeyboardEvent): void {
    const maxNameLength = this.maxLength;
    if (event.key === 'Backspace' && this.inputState.name.length > 0) {
      this.inputState.name = this.inputState.name.slice(0, -1);
      this.text = this.text.slice(0, -1);
    } else if (
      event.key.length === 1 &&
      (this.allowSpecialCharacters || event.key.match(/[a-zA-Z0-9\s\-_]/)) &&
      this.inputState.name.length < maxNameLength
    ) {
      this.text += event.key;
      this.inputState.name += this.inputState.isHidden ? '•' : event.key;
    } else if (this.inputState.name.length === maxNameLength) {
      this.scene.cameras.main.shake(30, 0.001, false);
    }
    this.adjustFontSizeToFit();
    EventBus.emit(this.eventName, this.inputState.name);
  }

  private adjustFontSizeToFit(): void {
    const frameWidth = this.frame.displayWidth - 20;
    const text = this.inputState.nameText;
    let fontSize = 23;
    text.setStyle({ fontSize: `${fontSize}px` });
    let textWidth = text.width;
    while (textWidth + 15 > frameWidth) {
      fontSize -= 1;
      if (fontSize <= 1) {
        fontSize = 1;
        break;
      }
      text.setStyle({ fontSize: `${fontSize}px` });
      textWidth = text.width;
    }
    this.inputState.formCursor.x = text.x + textWidth - 7;
  }

  private updateCursorPosition(): void {
    let textWidth = 0;
    if (this.inputState.isEnteringName) {
      this.inputState.nameText.setText(this.inputState.name);
      textWidth = this.inputState.nameText.width;
      this.inputState.formCursor.x = this.inputState.nameText.x + textWidth - 7;
    }
  }

  private updatePosition(x: number, y: number): void {
    const graphicsWidth = 300;
    const graphicsHeight = 65;
    this.frame.setPosition(x - graphicsWidth / 2 + 150, y - graphicsHeight / 2 + 35);
    this.inputState.nameText.setPosition(x - graphicsWidth / 2 + 20, y - graphicsHeight / 2 + 25);
    this.inputState.formCursor.setPosition(x - graphicsWidth / 2 + 20, y - graphicsHeight / 2 + 15);
  }

  private updateNameText(): void {
    this.inputState.nameText.setText(
      this.inputState.isHidden ? '•'.repeat(this.inputState.name.length) : this.inputState.name
    );
  }

  private activateCursor(gameObject: Phaser.GameObjects.Image): void {
    gameObject.on('pointerup', () => {
      if (!this.inputState.isEnteringName) {
        this.inputState.isEnteringName = true;
        if (this.inputState.name === this.placeholder) {
          this.inputState.name = '';
        }
        this.inputState.formCursor.setAlpha(0);
        this.cursorTween.resume();
        if (this.isMobileDevice()) {
          this.inputState.hiddenInput.focus();
        }
        this.scene.time.delayedCall(200, () => {
          this.deactivateCursor();
        });
      }
    });
  }

  private deactivateCursor(): void {
    this.scene.input.off('pointerup');
    this.scene.input.once('pointerup', () => {
      if (this.inputState.isEnteringName) {
        let delayTime = 0;
        if (!this.inputState.name) {
          this.inputState.name = this.placeholder;
          delayTime = 100;
        }
        this.scene.time.delayedCall(delayTime, () => {
          this.inputState.isEnteringName = false;
        });
        this.inputState.formCursor.setAlpha(0);
        this.cursorTween.pause();
        if (this.isMobileDevice()) {
          this.inputState.hiddenInput.blur();
        }
      }
    });
  }

  private createInputMobile(): void {
    if (this.isMobileDevice()) {
      this.inputState.hiddenInput = document.createElement('input');
      this.inputState.hiddenInput.style.position = 'absolute';
      this.inputState.hiddenInput.style.opacity = '0';
      this.inputState.hiddenInput.style.zIndex = '-1';
      document.body.appendChild(this.inputState.hiddenInput);
      this.inputState.hiddenInput.addEventListener('input', event => {
        const target = event.target as HTMLInputElement;
        this.inputState.name = target.value;
        EventBus.emit(this.eventName, target.value);
      });
    }
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}
