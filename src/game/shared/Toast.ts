import * as Phaser from 'phaser';

export class Toast extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public show(message: string): void {
    const { width, height } = this.scene.scale;
    this.scene.rexUI.add
      .toast({
        x: width / 2,
        y: height / 2,
        background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0x4e342e),
        text: this.scene.add.text(0, 0, '', {
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
}
