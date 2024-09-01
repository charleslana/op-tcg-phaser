import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { useSettingsStore } from '@/stores/settings-store';

export class BootScene extends Scene {
  constructor() {
    super(SceneEnum.Boot);
  }

  preload() {
    this.load.image(ImageEnum.Background, 'assets/images/background.jpg');
    this.load.font('AlineaSans', 'assets/fonts/AlineaSansW01Regular.ttf');
    this.loadTranslation();
  }

  create() {
    this.translation.i18next.on('languageChanged', () => {
      this.translation.i18next.off('languageChanged');
      this.scene.start(SceneEnum.Preloader);
    });
    this.createLoadingText();
  }

  private loadTranslation(): void {
    this.translation.initI18Next(this, {
      lng: 'en',
      fallbackLng: 'en',
      ns: 'ui',
      debug: false,
      backend: {
        loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
      },
    });
  }

  private createLoadingText(): void {
    const settingsStore = useSettingsStore();
    settingsStore.setDefaultLanguage(this);
    const textObject = this.add.text(0, 0, '', { color: 'black' }).setAlpha(1);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'loading',
      interpolation: ['...'],
    });
  }
}
