import Phaser from "phaser";
import { level1, questions } from "../data/wordData";
import Laser from "../entities/Laser";
import { threadId } from "worker_threads";

export default class Level1Scene extends Phaser.Scene {
    bg: Phaser.GameObjects.Image;
    player: Phaser.Physics.Arcade.Image | null;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    inputEnabled: boolean;
    chooseA: Phaser.Physics.Arcade.Image;
    chooseB: Phaser.Physics.Arcade.Image;
    answerNo: number;
    spacing: number;
    questionNo: number;
    question: Phaser.GameObjects.Text;
    laserGroup: Phaser.Physics.Arcade.Group;
    life:number
    lifeText:Phaser.GameObjects.Text

    constructor() {
        super("level1-scene");
        this.inputEnabled = true;
        this.answerNo = 0;
        this.spacing = 150;
        this.player = null;
        this.questionNo = 0;
        this.life=5
    }

    preload() {
        for (let i = 0; i < level1.length; i++) {
            for (let j = 0; j < level1[i].length; j++) {
                const source = level1[i][j].src;
                const name = level1[i][j].name;

                this.load.image(`${name}`, `${source}`);
            }
        }
    }

    create() {
        //text
        const questionText = questions[0][this.questionNo];
        this.question = this.add
            .text(70, 50, `Level 1    Ans: ${questionText}`, {
                fontSize: "32px",
                color: "#FFFFFF",
                fontFamily: "Arial",
            })
            .setDepth(1); // Ensures text is above other objects

            this.lifeText = this.add
            .text(800, 50, `Total: ${this.life}`, {
                fontSize: "32px",
                color: "#FFFFFF",
                fontFamily: "Arial",
            })
            .setDepth(1); // Ensures text is above other objects
        
        
        //background
        this.bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
        this.bg.setScale(1.5, 1.5);

        // Player
        this.player = this.physics.add.image(50, 350, "player");
        this.player.setScale(1.7, 1.7);
        if (this.input.keyboard) {
            this.cursor = this.input.keyboard?.createCursorKeys();
        }
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);

        //Choose
        const chooseArray = level1[this.answerNo];
        this.chooseA = this.physics.add.image(
            950,
            350,
            `${chooseArray[0].name}`
        );
        this.chooseB = this.physics.add.image(
            950,
            500,
            `${chooseArray[1].name}`
        );

        this.chooseA.setScale(0.4, 0.4);
        this.chooseB.setScale(0.4, 0.4);

        this.chooseA.setCollideWorldBounds(true);
        this.chooseB.setCollideWorldBounds(true);

        this.chooseA.setVelocity(-20, -200);
        this.chooseB.setVelocity(-20, -200);

        //collision
        this.physics.add.collider(
            this.player,
            this.chooseA,
            this.collision,
            undefined,
            this
        );
        this.physics.add.collider(
            this.player,
            this.chooseB,
            this.collision2,
            undefined,
            this
        );
        this.physics.add.collider(this.chooseA, this.chooseB);

        //laser
        this.laserGroup = this.physics?.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true,
        });

        const choose = [this.chooseA, this.chooseB];

        for (let i = 0; i < choose.length; i++) {
            this.physics.add.collider(
                this.laserGroup,
                choose[i],
                (laser, meteor) => {
                    const laserInstance = laser as Laser;
                    const meteorInstance =
                        meteor as Phaser.Physics.Arcade.Image;
                    // this.chooseA.setVisible(false)
                        
                    meteorInstance.setVisible(false);
                    laserInstance.setVisible(false);


                    console.log(choose[i].texture.key);
                    console.log(questions[0][this.questionNo]);
                    if (
                        choose[i].texture.key === questions[0][this.questionNo]
                    ) {
                        

                        this.chooseB.setVelocity(0);
                        this.chooseA.setVelocity(0);

                        setTimeout(() => {
                            this.chooseA.setVisible(false);
                            this.chooseB.setVisible(false);
                        }, 500);

                        setTimeout(() => this.resetPosion(), 2000);
                        if (this.questionNo < 1) {
                            this.questionNo += 1;
                            this.question.setText(
                                `Level 1    Ans: ${questions[0][this.questionNo]}`
                            );
                        } else {
                            this.scene.switch("end");
                        }

                        if (this.answerNo < 1) {
                            this.answerNo += 1;
                        }

                        this.inputEnabled = false;
                    }else{
                        this.chooseA?.setVelocity(0,0)
                        this.chooseB?.setVelocity(0,0)
                        this.inputEnabled=false

                    }
                    
                }
            );
        }
    }

    update() {
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
                    shoot.fire(
                        this.player.x,
                        this.player.y,
                        this.player.rotation
                    );
                }
            }
        }

        if (this.chooseA.y < 50) {



            this.chooseA.setVelocityY(250);
            this.chooseB.setVelocityY(250);
        } 
        else if (this.chooseB.y>650) {
            this.chooseA.setVelocityY(-250);
            this.chooseB.setVelocityY(-250);
        }

        this.chooseB.y = this.chooseA.y + this.spacing;
    }

    collision(): void {
        this.destroyPlayer();
    }

    collision2(): void {
        this.destroyPlayer();
    }
    destroyPlayer(): void {
        if (this.player) {
            this.player.destroy();
            this.player = null;
            this.inputEnabled = false;
            this.chooseA.setVelocity(0);
            this.chooseB.setVelocity(0);
        }
    }

    resetPosion(): void {
        this.chooseA.setTexture(`${level1[this.answerNo][0].name}`);
        this.chooseB.setTexture(`${level1[this.answerNo][1].name}`);

        this.chooseA.setPosition(950, 350);
        this.chooseB.setPosition(950, 500);
        this.chooseA.setVelocity(-20, -200);
        this.chooseB.setVelocity(-20, -200);
        this.inputEnabled = true;
        this.chooseA.setVisible(true);
        this.chooseB.setVisible(true);

        console.log("the answer is rights");
    }
}
