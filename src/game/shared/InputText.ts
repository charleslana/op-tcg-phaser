import * as Phaser from 'phaser';
import { InputStateInterface } from '../interfaces/input-state-interface';
import { ImageEnum } from '../enums/image-enum';

export class InputText extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public placeholder = 'Enter your name...';
  public text = '';

  private inputGraphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
  private inputState: InputStateInterface = {} as InputStateInterface;
  private cursorTween: Phaser.Tweens.Tween = {} as Phaser.Tweens.Tween;
  private frame: Phaser.GameObjects.Image = {} as Phaser.GameObjects.Image;

  create(): void {
    this.scene.input.keyboard?.createCursorKeys();
    const nameTextConfig = { fontSize: '23px', fill: '#000000' };
    this.inputState.name = this.placeholder;
    this.inputState.nameText = this.scene.add
      .text(420, 315, this.inputState.name, nameTextConfig)
      .setDepth(21);

    this.inputGraphics = this.scene.add.graphics({ x: 400, y: 290 });
    this.inputGraphics.fillStyle(0xffffff, 1).setAlpha(0.9).setDepth(20);
    this.inputGraphics.fillRect(0, 0, 300, 65);
    this.inputGraphics.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 300, 65),
      Phaser.Geom.Rectangle.Contains
    );

    const cursorConfig = { fontSize: '32px', fill: '#000000' };
    this.inputState.formCursor = this.scene.add.text(420, 310, '|', cursorConfig);
    this.inputState.formCursor.setDepth(21).setAlpha(0);

    this.frame = this.scene.add.image(550, 325, ImageEnum.StoneButtonFrame);
    this.frame.setScale(1.2, 0.6).setInteractive().setDepth(22);

    this.cursorTween = this.scene.tweens.add({
      targets: this.inputState.formCursor,
      alpha: 1,
      duration: 300,
      hold: 600,
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    this.activateGraphics(this.inputGraphics);
    this.activateGraphics(this.frame);

    this.scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (this.inputState.isEnteringName) {
        const maxNameLength = 16;
        if (event.key === 'Backspace' && this.inputState.name.length > 0) {
          this.inputState.name = this.inputState.name.slice(0, -1);
          this.text = this.inputState.name;
        } else if (
          event.key.length === 1 &&
          event.key.match(/[a-zA-Z0-9\s\-_]/) &&
          this.inputState.name.length < maxNameLength
        ) {
          this.text += event.key;
          this.inputState.name += this.inputState.isHidden ? '•' : event.key;
        } else if (this.inputState.name.length === maxNameLength) {
          this.scene.cameras.main.shake(30, 0.001, false);
        }
      }
    });
  }

  update(): void {
    let textWidth = 0;
    if (this.inputState.isEnteringName) {
      this.inputState.nameText.setText(
        this.inputState.isHidden ? '•'.repeat(this.inputState.name.length) : this.inputState.name
      );
      textWidth = this.inputState.nameText.width;
      this.inputState.formCursor.x = this.inputState.nameText.x + textWidth - 7;
    }
  }

  public changePosition(x: number, y: number): void {
    const graphicsWidth = 300;
    const graphicsHeight = 65;
    this.frame.setPosition(x - graphicsWidth / 2 + 150, y - graphicsHeight / 2 + 35);
    this.inputGraphics.setPosition(x - graphicsWidth / 2, y - graphicsHeight / 2);
    this.inputState.nameText.setPosition(x - graphicsWidth / 2 + 20, y - graphicsHeight / 2 + 25);
    this.inputState.formCursor.setPosition(x - graphicsWidth / 2 + 20, y - graphicsHeight / 2 + 15);
  }

  public toggleVisibility(): void {
    this.inputState.isHidden = !this.inputState.isHidden;
  }

  public updateDisplay(): void {
    this.inputState.nameText.setText(
      this.inputState.isHidden ? '•'.repeat(this.inputState.name.length) : this.inputState.name
    );
  }

  private activateGraphics(gameObject: Phaser.GameObjects.Graphics | Phaser.GameObjects.Image) {
    gameObject.on('pointerup', () => {
      if (!this.inputState.isEnteringName) {
        this.inputState.isEnteringName = true;
        if (this.inputState.name === this.placeholder) {
          this.inputState.name = '';
        }
        this.inputState.formCursor.setAlpha(0);
        this.cursorTween.resume();
        this.scene.time.delayedCall(200, () => {
          this.deactivateGraphics();
        });
      }
    });
  }

  private deactivateGraphics() {
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
      }
    });
  }
}
