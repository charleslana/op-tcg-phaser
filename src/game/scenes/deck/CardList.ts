import * as Phaser from 'phaser';
import ScrollablePanel from 'phaser3-rex-plugins/templates/ui/scrollablepanel/ScrollablePanel';
import { EventBus } from '@/game/EventBus';
import { getImageEnum, ImageEnum } from '@/game/enums/image-enum';
import { useCardStore } from '@/stores/card-store';

export class CardList extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private cardStore = useCardStore();

  public create(): void {
    this.createCardPanel();
    this.createCardList();
  }

  private createCardPanel(): void {
    const panel = this.scene.add.image(400, 400, ImageEnum.PanelBeige);
    panel.setOrigin(0, 0.5);
    panel.setPosition(630, 840);
    panel.setAlpha(0.4);
    panel.setScale(12, 4.2);
  }

  private createCardList(): void {
    const COLOR_LIGHT = 0x7b5e57;
    const COLOR_DARK = 0x260e04;
    const scrollMode = 0;
    const scrollablePanel = this.scene.rexUI.add
      .scrollablePanel({
        x: 640,
        y: 840,
        width: 1180,
        height: 400,
        scrollMode: scrollMode,
        panel: {
          child: this.createCardGrid(),
          mask: {
            padding: 1,
          },
        },
        slider: {
          track: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
          thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },
        mouseWheelScroller: {
          focus: true,
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
    this.addCardPanelEventListeners(scrollablePanel);
  }

  private addCardPanelEventListeners(scrollablePanel: ScrollablePanel): void {
    scrollablePanel
      .setChildrenInteractive({})
      .on('child.over', function (child: Phaser.GameObjects.Image) {
        console.log(`Pointer Over ${child.getData('id')}\n`);
        EventBus.emit('set-image-card', getImageEnum(child.getData('image')));
        EventBus.emit('set-visible-card', true);
        EventBus.emit('set-description-card', child.getData('descriptionPt'));
      })
      .on('child.out', function (child: Phaser.GameObjects.Image) {
        console.log(`Pointer Out ${child.getData('id')}\n`);
        EventBus.emit('set-visible-card', false);
      })
      .on('child.click', function (child: Phaser.GameObjects.Image) {
        console.log(`Click ${child.getData('id')}\n`);
      })
      .on('child.pressstart', function (child: Phaser.GameObjects.Image) {
        console.log(`Press ${child.getData('id')}\n`);
      });
  }

  private createCardGrid() {
    const sizer = this.scene.rexUI.add.fixWidthSizer({
      space: {
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        item: 0,
        line: 0,
      },
    });
    const width = 100;
    const height = 150;
    for (const card of this.cardStore.cards) {
      sizer.add(
        this.scene.add
          .image(0, 0, getImageEnum(card.image))
          .setOrigin(0)
          .setDisplaySize(width, height)
          .setData(card)
      );
    }
    return sizer;
  }
}
