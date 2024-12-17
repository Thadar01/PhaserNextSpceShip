import Phaser, { Physics } from "phaser";
import Laser from "../entities/Laser";
import { level1,questions } from "../data/wordData";


export default class Level1Scene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Image | null;
    stone: Phaser.Physics.Arcade.Image;
    stone2: Phaser.Physics.Arcade.Image;

    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    bg: Phaser.GameObjects.Image;

    inputEnabled: boolean; 
    laserGroup: Phaser.Physics.Arcade.Group;
    isTrue:boolean;
    dataNo:number
    questionNo:number
    question:Phaser.GameObjects.Text
    questionContent:number


    constructor() {
        super("level1-scene");
        this.inputEnabled = true; 
        this.player=null
        this.dataNo=0
        this.questionContent=0
    }

    preload() {
        for (let i = 0; i < level1.length; i++) {
            for (let j = 0; j < level1[i].length; j++) {
                const image = level1[i][j];
                this.load.image(image.name, image.src);
            }
        }
    }

    create(): void {
        // Background
        this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.bg.setScale(1.5, 1.5);

        //text
        this.question=this.add.text(50,30,questions[0][this.questionContent])

        // Player
        this.player = this.physics.add.image(50, 350, "player");
        if (this.input.keyboard) {
            this.cursor = this.input.keyboard?.createCursorKeys();
        }
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);


        // Stone
        this.stone = this.physics.add.image(950, 350, `${level1[this.dataNo][0].name}`);
        this.stone2 = this.physics.add.image(950, 440, `${level1[this.dataNo][1].name}`);
        this.stone.setScale(0.3,0.3)
        this.stone2.setScale(0.3,0.3)


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
                meteorInstance.setVisible(false)
                // console.log(stone[i].texture.key)
                if(stone[i].texture.key===questions[0][this.questionContent]){
                    this.questionContent+=1
                    console.log(this.questionContent)
                    this.question.setText(questions[0][this.questionContent])
                    this.dataNo+=1
                    

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
