import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { AUTO, Game } from 'phaser';
import { BootScene } from './scenes/BootScene';
import { DeckScene } from './scenes/deck/DeckScene';
import { HomeScene } from './scenes/HomeScene';
import { LoginScene } from './scenes/LoginScene';
import { PreloaderScene } from './scenes/PreloaderScene';
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
  scene: [BootScene, PreloaderScene, LoginScene, RegisterScene, HomeScene, DeckScene, SettingScene],
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
