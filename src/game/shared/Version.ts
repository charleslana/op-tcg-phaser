import * as Phaser from 'phaser';
import packageJson from '@package';

export class Version extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private create(): void {
    const { width, height } = this.scene.scale;
    const textObject = this.scene.add
      .text(width - 10, height - 10, 'versão 1.0.0', {
        font: '14px AlineaSans',
        color: '#000000',
      })
      .setOrigin(1, 1);
    textObject.translation = this.scene.translation.add(textObject, {
      translationKey: 'version',
      interpolation: [packageJson.version],
    });
  }
}
