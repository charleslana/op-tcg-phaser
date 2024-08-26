import * as Phaser from 'phaser';
import { CheckboxInterface } from '../interfaces/checkbox-interface';
import { EventBus } from '../EventBus';

export class Checkbox extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public create(checkboxInterface: CheckboxInterface): number {
    const checkbox = this.scene.rexUI.add.checkbox(
      checkboxInterface.positionX,
      checkboxInterface.positionY,
      40,
      40,
      0xffffff
    );
    checkbox.setBoxFillStyle(0xffffff, 1);
    checkbox.setCheckerStyle(0x000000, 1);
    checkbox.setUncheckedBoxFillStyle(0xffffff, 1);
    checkbox.setBoxStrokeStyle(0, 0x000000, 1);
    checkbox.setValue(checkboxInterface.checked ?? false);
    if (checkboxInterface.readOnly) {
      checkbox.setReadOnly(true);
    }
    checkbox.on('valuechange', function (value: boolean) {
      if (checkboxInterface.onChange) {
        checkboxInterface.onChange(value);
      }
      console.log(`${checkboxInterface.text} filter: ${value}`);
      if (checkboxInterface.eventEmit) {
        EventBus.emit(checkboxInterface.eventEmit, checkboxInterface.valueEmit, value);
      }
    });
    const labelText = this.scene.add
      .text(
        checkboxInterface.positionX + 10,
        checkboxInterface.positionY,
        `    ${checkboxInterface.text}`,
        {
          fontSize: checkboxInterface.fontSize ?? 25,
          color: '#000000',
          fontFamily: 'AlineaSans',
        }
      )
      .setOrigin(0, 0.5);
    if (!checkboxInterface.readOnly) {
      labelText.setInteractive({ useHandCursor: false }).on('pointerdown', () => {
        checkbox.setValue(!checkbox.checked);
      });
    }
    return checkbox.width + labelText.width + 30;
  }
}
