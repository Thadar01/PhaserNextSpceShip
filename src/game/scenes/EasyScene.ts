import Phaser from "phaser";
import { fruitList,questions } from "../data/fruitData";
import Laser from "../entities/Laser";

export default class EasyScene extends Phaser.Scene {
    bg: Phaser.GameObjects.Image;
    scoreText: Phaser.GameObjects.Text;
    easyScore: number;
    lifeText: Phaser.GameObjects.Text;
    life: number;
    player: Phaser.Physics.Arcade.Image | null;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    box1: Phaser.Physics.Arcade.Image;
    box2: Phaser.Physics.Arcade.Image;
    gameNumber: number;
    inputEnabled: boolean;
    laserGroup: Phaser.Physics.Arcade.Group;
    collisionHandled: boolean; // Prevent multiple collision handling
     currentSound: Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound | null = null;
   

    constructor() {
        super('easy-scene');
        this.easyScore = 0;
        this.life = 3;
        this.player = null;
        this.gameNumber = 0;
        this.inputEnabled = true;
        this.collisionHandled = false;
    }

    preload() {
        for (let i = 0; i < fruitList.length; i++) {
            for (let j = 0; j < 2; j++) {
                const fruitName = fruitList[i][j].name;
                const fruitSrc = fruitList[i][j].src;

                this.load.image(fruitName, fruitSrc);
            }
        }

    
            for (let k = 0; k < questions.length; k++) {
                const sound = questions[k].sound;
                const name = questions[k].name;


                this.load.audio(name,sound);
            }
       
    }

    create() {
        // Background
        this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.bg.setScale(1.5, 1.5);


             //Sound
             

        // Score
        this.scoreText = this.add.text(40, 50, `Score: ${this.easyScore.toString()}`, {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fixedWidth: 140,
            fontSize: '18px',
            padding: { left: 20, right: 0, top: 10, bottom: 10 },
        });

        // Life
        this.lifeText = this.add.text(850, 50, `Life: ${this.life.toString()}`, {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fixedWidth: 140,
            fontSize: '18px',
            padding: { left: 20, right: 0, top: 10, bottom: 10 },
        });

        // Player
        this.player = this.physics.add.image(50, 350, "player");
        this.player.setScale(1.7, 1.7);
        if (this.input.keyboard) {
            this.cursor = this.input.keyboard.createCursorKeys();
        }
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);

        // Boxes
        this.createBoxes();

        // Laser Group
        this.laserGroup = this.physics.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true,
        });

        const choose = [this.box1, this.box2];
        for (let i = 0; i < choose.length; i++) {
            this.physics.add.overlap(this.laserGroup, choose[i], (laser, meteor) => {
                if (this.collisionHandled) return; // Prevent multiple collision triggers
                this.collisionHandled = true;

                const laserInstance = laser as Laser;
                const meteorInstance = meteor as Phaser.Physics.Arcade.Image;

                meteorInstance.setVisible(false);
                laserInstance.setVisible(false);

                this.box1.setVelocity(0);
                this.box2.setVelocity(0);
               
                console.log(choose[i].texture.key);
                setTimeout(() => {
                    this.box1.setVisible(false);
                    this.box2.setVisible(false);
                }, 800);
                setTimeout(()=>this.hitBox(),2000);

                setTimeout(() => {
                    this.collisionHandled = false; // Reset collision handling
                }, 500);


                if(choose[i].texture.key===questions[this.gameNumber].name){
                    this.easyScore= (this.easyScore+100)
                    this.scoreText.setText(`Score: ${this.easyScore.toString()}`)
                }else{
                    if(this.life>0){
                        this.life--
                        this.lifeText.setText(`Life: ${this.life.toString()}`)
                    }else if (this.life===0){
                       this.goResult()
                      
                    }
                   
                }
            });
        }

        // Player-Box Collisions
        this.physics.add.collider(this.player, this.box1, () => this.destroyPlayer());
        this.physics.add.collider(this.player, this.box2, () => this.destroyPlayer());

   
    
        // Play sound immediately
       this. playSound();
    
       
        
    
    }

    update() {
        // Box Movement Logic
        if (this.box1.y < 150) {
            this.box1.setVelocity(-30, 200);
            this.box2.setVelocity(-30, 200);
        } else if (this.box2.y > 650) {
            this.box1.setVelocity(-30, -200);
            this.box2.setVelocity(-30, -200);
        }
        this.box2.y = this.box1.y + 150;

        // Player Movement
        if (this.player && this.inputEnabled) {
            if (this.cursor.down.isDown) {
                this.player.setVelocityY(200);
            } else if (this.cursor.up.isDown) {
                this.player.setVelocityY(this.player.y < 150 ? 0 : -200);
            } else {
                this.player.setVelocityY(0);
            }

            // Laser Firing
            if (this.cursor.space.isDown) {
                const shoot = this.laserGroup.get();
                if (shoot) {
                    shoot.fire(this.player.x + 60, this.player.y, this.player.rotation);
                }
            }
        }

        if (this.life===0){
           this.goResult()
            

        }

     
    }

    createBoxes(): void {
        this.box1 = this.physics.add.image(1025, 250, fruitList[this.gameNumber][0].name);
        this.box2 = this.physics.add.image(1025, 400, fruitList[this.gameNumber][1].name);

        this.box1.setScale(0.3, 0.3);
        this.box2.setScale(0.3, 0.3);

        this.box1.setVelocity(-30, 200);
        this.box2.setVelocity(-30, 200);

        this.box1.setCollideWorldBounds(true);
        this.box2.setCollideWorldBounds(true);

        this.physics.add.collider(this.box1, this.box2);

      
    }

    destroyPlayer(): void {
        if (this.player) {
            this.player.setVisible(false);
            this.player = null;
            this.box1.setVelocity(0);
            this.box2.setVelocity(0);

            setTimeout(() => {
                this.box1.setVisible(true);
                this.box2.setVisible(true);
            }, 800);

            setTimeout(() => {
                this.restoreBoxPosition();
            }, 2000);
        }

        if(this.life>0){
            this.life--
            this.lifeText.setText(`Life: ${this.life.toString()}`)
        }else{
           this.goResult()

        }
    }

    restoreBoxPosition(): void {
        if (!this.player) {
            this.player = this.physics.add.image(50, 350, "player").setScale(1.7, 1.7);
            this.player.setCollideWorldBounds(true);
        }

        this.box1.setPosition(1030, 250);
        this.box2.setPosition(1030, 400);

        this.box1.setVelocity(-30, 200);
        this.box2.setVelocity(-30, 200);
    }

    hitBox(): void {
      

       
            this.restoreBoxPosition();
            this.box1.setVisible(true);
            this.box2.setVisible(true);
        

        if (this.gameNumber < fruitList.length - 1 && this.life !==0) {
            this.gameNumber += 1;
            console.log(this.gameNumber);

            this.box1.setTexture(fruitList[this.gameNumber][0].name)
            this.box2.setTexture(fruitList[this.gameNumber][1].name)
            this.playSound()
            

        }else{
            this.goResult()
        }

    }

     playSound():void  {
        this.sound.play(questions[this.gameNumber].name, {
            loop: false,
        });
    };

    stopSound():void{
        this.sound.stopAll()
    }

    goResult():void{
        this.scene.switch('result-scene',{easyscore:this.easyScore})
        this.sound.stopAll()
    }
  
}
