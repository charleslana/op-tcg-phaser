import * as Phaser from 'phaser';

export class Version extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  public create(): void {
    const { width, height } = this.scene.scale;
    this.scene.add
      .text(width - 10, height - 10, 'versão 1.0.0', {
        font: '14px AlineaSans',
        color: '#000000',
      })
      .setOrigin(1, 1);
  }
}
