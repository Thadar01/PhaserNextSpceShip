import Phaser from "phaser";

export default class PreLoaderScene extends Phaser.Scene{
   constructor(){
    super('preloader-scene')
   }


   preload(){
      this.load.image('player','/assets/player.png')
      this.load.image('bg','/assets/bg.jpg')
      this.load.image('largeStone','/assets/meteor_large.png')
      this.load.image('medStone','/assets/meteor_med.png')

      this.load.image('laser','/assets/laser.png')
   }

   create(){
      this.scene.switch('level1-scene')
   }
}