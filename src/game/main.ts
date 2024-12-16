
import { AUTO, Game } from 'phaser';
import PreLoaderScene from './scenes/PreLoaderScene';
import PlayScene from './scenes/PlayScene';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics:{
        default:'arcade',
        arcade:{
           gravity:{x:0,y:0},
           debug:true
        },
       
    },
    scene: [
       PreLoaderScene,
       PlayScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
