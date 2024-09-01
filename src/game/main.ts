import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import TextTranslationPlugin from 'phaser3-rex-plugins/plugins/texttranslation-plugin.js';
import { AUTO, Game } from 'phaser';
import { BootScene } from './scenes/BootScene';
import { CreditScene } from './scenes/CreditScene';
import { DeckScene } from './scenes/deck/DeckScene';
import { FontPlugin } from 'phaser-font-plugin';
import { HomeScene } from './scenes/HomeScene';
import { HowToPlayScene } from './scenes/HowToPlayScene';
import { LobbyScene } from './scenes/LobbyScene';
import { LoginScene } from './scenes/LoginScene';
import { MultiplayerScene } from './scenes/MultiplayerScene';
import { PasswordScene } from './scenes/PasswordScene';
import { PreloaderScene } from './scenes/PreloaderScene';
import { PrivateScene } from './scenes/PrivateScene';
import { RegisterScene } from './scenes/RegisterScene';
import { SettingScene } from './scenes/SettingScene';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  banner: false,
  audio: {
    disableWebAudio: true,
  },
  parent: 'game-container',
  backgroundColor: '#ffffff',
  scene: [
    BootScene,
    PreloaderScene,
    LoginScene,
    RegisterScene,
    HomeScene,
    DeckScene,
    SettingScene,
    CreditScene,
    HowToPlayScene,
    MultiplayerScene,
    PasswordScene,
    LobbyScene,
    PrivateScene,
  ],
  plugins: {
    global: [
      {
        key: 'FontPlugin',
        plugin: FontPlugin,
        start: true,
      },
    ],
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
      {
        key: 'rexTextTranslation',
        plugin: TextTranslationPlugin,
        start: true,
        mapping: 'translation',
      },
    ],
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
