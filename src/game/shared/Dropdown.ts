import * as Phaser from 'phaser';
import SimpleDropDownList from 'phaser3-rex-plugins/templates/ui/simpledropdownlist/SimpleDropDownList';
import { AudioEnum } from '../enums/audio-enum';
import { useSettingsStore } from '@/stores/settings-store';

interface DropdownOption {
  text: string;
  value: unknown;
}

export class Dropdown extends Phaser.GameObjects.GameObject {
  private dropDownList: SimpleDropDownList;
  private onSelectCallback: (value: unknown) => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    options: DropdownOption[],
    onSelect: (value: unknown) => void
  ) {
    super(scene, '');
    this.scene.add.existing(this);
    this.onSelectCallback = onSelect;
    this.dropDownList = this.createDropdown(options);
    this.dropDownList.setPosition(x, y);
    this.dropDownList.setDepth(10);
  }

  public setOptions(options: DropdownOption[]): void {
    this.dropDownList.setOptions(options).layout();
  }

  public setText(text: string): void {
    this.dropDownList.setText(text);
  }

  private createDropdown(options: DropdownOption[]): SimpleDropDownList {
    const style = this.getDropdownStyle();
    const dropDownList = this.scene.rexUI.add
      .simpleDropDownList(style)
      .resetDisplayContent('  Selecione uma opção')
      .setOptions(options)
      .setPosition(0, 0)
      .layout();
    dropDownList.on(
      'button.click',
      (
        dropdown: SimpleDropDownList,
        _listPanel: SimpleDropDownList,
        button: SimpleDropDownList
      ) => {
        dropdown.setText('  ' + button.text);
        this.onSelectCallback(button.value);
        const settingsStore = useSettingsStore();
        if (settingsStore.audio) {
          this.scene.sound.play(AudioEnum.Click);
        }
      }
    );
    return dropDownList;
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
}
