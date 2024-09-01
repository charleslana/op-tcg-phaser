import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';
import { useSettingsStore } from '@/stores/settings-store';

enum Language {
  pt = 'pt',
  en = 'en',
}

export class ButtonLanguage extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.createLanguageIcons();
  }

  private languageIcons: Phaser.GameObjects.Image[] = [];
  private settingsStore = useSettingsStore();

  private createLanguageIcons(): void {
    const { width } = this.scene.scale;
    const portugueseIcon = this.scene.add
      .image(width - 100, 40, ImageEnum.BrazilFlag)
      .setScale(0.1)
      .setInteractive();
    const englishIcon = this.scene.add
      .image(width - 40, 40, ImageEnum.EnglishFlag)
      .setScale(0.1)
      .setInteractive();
    this.languageIcons.push(portugueseIcon, englishIcon);
    portugueseIcon.on('pointerdown', () => this.selectLanguage(Language.pt));
    englishIcon.on('pointerdown', () => this.selectLanguage(Language.en));
    const currentLanguage = this.settingsStore.language as Language;
    this.selectLanguage(currentLanguage);
  }

  private selectLanguage(language: Language): void {
    this.languageIcons.forEach(icon => icon.setAlpha(0.5));
    if (language === Language.pt) {
      this.languageIcons[0].setAlpha(1);
      this.scene.translation.changeLanguage(Language.pt);
    } else if (language === Language.en) {
      this.languageIcons[1].setAlpha(1);
      this.scene.translation.changeLanguage(Language.en);
    }
    this.settingsStore.setLanguage(language);
    console.log(`Idioma selecionado: ${language}`);
  }
}
