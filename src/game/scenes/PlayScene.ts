import { Project } from "next/dist/build/swc";
import Phaser, { Physics } from "phaser";

export default class PlayScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Image;
    stone:Phaser.Physics.Arcade.Image;
    stone2:Phaser.Physics.Arcade.Image;

    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    bg:Phaser.GameObjects.Image;
    

    constructor() {
        super("play-scene");
    }

    create(): void {
        //background
       this.bg= this.add.image(0,0,'bg').setOrigin(0,0)
       this.bg.setScale(1.5,1.5)
   

       //player
        this.player = this.physics.add.image(50, 350, "player");
        if (this.input.keyboard) {
            this.cursor = this.input.keyboard?.createCursorKeys();
        }
        this.player.setCollideWorldBounds(true)
        this.player.setImmovable(true)


        //stone
        this.stone=this.physics.add.image(950,350,'largeStone')
        this.stone2=this.physics.add.image(950,440,'largeStone')

        this.stone.setVelocityX(-20)
        this.stone2.setVelocityX(-20)

        this.stone2.setVelocityY(-250)
        this.stone.setCollideWorldBounds(true)
        this.stone2.setCollideWorldBounds(true)

        //collision
// Collision
this.physics.add.collider(this.player, this.stone, this.collision, undefined, this);
this.physics.add.collider(this.stone,this.stone2)

    }


    update():void{
        
        if(this.cursor.down.isDown){
            this.player?.setVelocityY(200)
        }else if(this.cursor.up.isDown){
            this.player?.setVelocityY(-200)

        }else{
            this.player?.setVelocityY(0)
        }

        if(this.stone.y===41){
            this.stone.setVelocityY(250)
        }else if(this.stone2.y===659){
            this.stone2.setVelocityY(-250)
        }
    }

    collision(){
        this.player.destroy()
    }
}
