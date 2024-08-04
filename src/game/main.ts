import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

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
  scene: [Boot, Preloader, MainMenu],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
