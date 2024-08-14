import * as Phaser from 'phaser';
import { EventBus } from '@/game/EventBus';
import { ImageEnum } from '@/game/enums/image-enum';

export class FloatingCard extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private cardContainer: Phaser.GameObjects.Container = <Phaser.GameObjects.Container>{};
  private imageCardContainer: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{};
  private descriptionCard: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private descriptionCardBackground: Phaser.GameObjects.Graphics = <Phaser.GameObjects.Graphics>{};

  public create(): void {
    EventBus.on('set-image-card', this.setImageCardContainer, this);
    EventBus.on('set-visible-card', this.setVisibleCardContainer, this);
    EventBus.on('set-description-card', this.setDescriptionCard, this);
    this.createShowCard();
  }

  private createShowCard(): void {
    this.cardContainer = this.scene.add.container(300, 600);
    this.imageCardContainer = this.createImage();
    this.cardContainer.add(this.imageCardContainer);
    const { width, height } = this.createStripe();
    this.descriptionCard = this.createText(width);
    this.adjustFontSizeToFit(this.descriptionCard, height - 20, 10);
    this.descriptionCard.setY(0);
    this.cardContainer.add(this.descriptionCard);
    this.cardContainer.setSize(480, 671);
    this.cardContainer.setVisible(false);
  }

  private createImage(): Phaser.GameObjects.Image {
    return this.scene.add
      .image(0, 0, ImageEnum.ST01_001_Card)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(480, 671);
  }

  private createStripe(): { width: number; height: number } {
    const width = 430;
    const height = 100;
    this.descriptionCardBackground = this.scene.add.graphics();
    this.descriptionCardBackground.fillStyle(0xffffff, 0.7);
    this.descriptionCardBackground.fillRect(-width / 2, -height / 2, width, height);
    this.cardContainer.add(this.descriptionCardBackground);
    return { width, height };
  }

  private createText(width: number): Phaser.GameObjects.Text {
    return this.scene.add
      .text(
        0,
        0,
        '[Ativar: Principal] [Uma vez por turno] Dê a este Líder ou até 1 dos seus Personagens descansado 1 carta DON!!.',
        {
          fontSize: '20px',
          color: '#000000',
          fontFamily: 'LiberationSans',
          align: 'center',
          wordWrap: { width: width - 20 },
          fixedWidth: width - 20,
        }
      )
      .setOrigin(0.5, 0.5);
  }

  private adjustFontSizeToFit(
    text: Phaser.GameObjects.Text,
    maxHeight: number,
    minFontSize: number
  ): void {
    let fontSize = parseInt(text.style.fontSize.toString(), 10);
    text.setFontSize(fontSize);
    let textBounds = text.getBounds();
    while (textBounds.height > maxHeight && fontSize > minFontSize) {
      fontSize -= 1;
      text.setFontSize(fontSize);
      textBounds = text.getBounds();
    }
  }

  private setImageCardContainer(texture: string): void {
    this.imageCardContainer.setTexture(texture);
  }

  private setVisibleCardContainer(visible: boolean): void {
    this.cardContainer.setVisible(visible);
  }

  private setDescriptionCard(description: string | null): void {
    if (!description) {
      this.descriptionCard.setVisible(false);
      this.descriptionCardBackground.setVisible(false);
      return;
    }
    this.descriptionCard.setText(description).setVisible(true);
    this.descriptionCardBackground.setVisible(true);
  }
}
