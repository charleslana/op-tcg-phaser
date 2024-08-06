import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { Login } from './scenes/Login';
import { Preloader } from './scenes/Preloader';
import { Register } from './scenes/Register';

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
  scene: [Boot, Preloader, Login, Register],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
