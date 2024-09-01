import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import TextTranslation from 'phaser3-rex-plugins/plugins/texttranslation';
import TextTranslationPlugin from 'phaser3-rex-plugins/plugins/texttranslation-plugin.js';
import 'phaser';

declare module 'phaser' {
  interface Scene {
    rexUI: RexUIPlugin;
  }
  interface Scene {
    translation: TextTranslationPlugin;
  }
  namespace GameObjects {
    interface Text {
      translation: TextTranslation;
    }
  }
}
