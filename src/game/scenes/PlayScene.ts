import Phaser, { Physics } from "phaser";
import Laser from "../entities/Laser";

export default class PlayScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Image | null;
    stone: Phaser.Physics.Arcade.Image;
    stone2: Phaser.Physics.Arcade.Image;

    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    bg: Phaser.GameObjects.Image;

    inputEnabled: boolean; 
    laserGroup: Phaser.Physics.Arcade.Group;
    isTrue:boolean;


    constructor() {
        super("play-scene");
        this.inputEnabled = true; 
        this.player=null
    }

    create(): void {
        // Background
        this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.bg.setScale(1.5, 1.5);

        // Player
        this.player = this.physics.add.image(50, 350, "player");
        if (this.input.keyboard) {
            this.cursor = this.input.keyboard?.createCursorKeys();
        }
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);

        // Stone
        this.stone = this.physics.add.image(950, 350, "largeStone");
        this.stone2 = this.physics.add.image(950, 440, "medStone");

        this.stone.setVelocityX(-20);
        this.stone2.setVelocityX(-20);

        this.stone2.setVelocityY(-250);
        this.stone.setCollideWorldBounds(true);
        this.stone2.setCollideWorldBounds(true);

        // Collision
        this.physics.add.collider(this.player, this.stone, this.collision, undefined, this);
        this.physics.add.collider(this.player, this.stone2, this.collision2, undefined, this);
        this.physics.add.collider(this.stone, this.stone2);

        //Laser
        this.laserGroup = this.physics?.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true
          });
      
          type LaserMeteorCollisionCallback = (laser: Laser, meteor: Phaser.Physics.Arcade.Image) => void;
      

          const stone=[this.stone,this.stone2]

          for(let i=0;i<stone.length;i++){
            this.physics.add.collider(this.laserGroup, stone[i], (laser, meteor) => {
                const laserInstance = laser as Laser;
                const meteorInstance = meteor as Phaser.Physics.Arcade.Image ;
                laserInstance.destroy()
                meteorInstance.destroy()
                console.log(stone[i].texture.key)
                if(i===0){
                    this.stone2.setVelocity(0)

                }else{
                    this.stone.setVelocity(0)
                }
                this.inputEnabled=false
              });
          }
          // Then use it like this:
    


    }


    update(): void {
        if (this.player && this.inputEnabled) { 
            if (this.cursor.down.isDown) {
                this.player?.setVelocityY(200);
            } else if (this.cursor.up.isDown) {
                this.player?.setVelocityY(-200);
            } else {
                this.player?.setVelocityY(0);
            }

            if (this.cursor.space.isDown) {
                const shoot = this.laserGroup?.get();
                if (shoot) {
                  shoot.fire(this.player.x, this.player.y, this.player.rotation);
                }
              }
        } else {
            this.player?.setVelocityY(0); 
        }

        if (this.stone.body?.blocked.up) {
            this.stone.setVelocityY(250);
        } else if (this.stone2.body?.blocked.down) {
            this.stone2.setVelocityY(-250);
        }
    }

    collision(): void {
        this.destroyPlayer()

    }

    collision2(): void {
       this.destroyPlayer()
    }
    destroyPlayer(): void {
        if (this.player) {
            this.player.destroy(); 
            this.player = null; 
            this.inputEnabled = false; 
            this.stone.setVelocity(0);
            this.stone2.setVelocity(0)
        }
    }
}
