import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene{
        easy:Phaser.GameObjects.Text;
        med:Phaser.GameObjects.Text;
        hard:Phaser.GameObjects.Text;
    
    constructor(){
        super('main-menu')
    }

    create(){
        this.easy=this.add.text(400,250,"Easy",{
            fontSize:'30px',
            backgroundColor:'#57cdeb',
            color:'#000000',
            fixedWidth:300,
            padding: { left: 0, right: 0, top: 10, bottom: 10 },
            align:'center'

        })
        this.med=this.add.text(400,350,"Medium",{
            fontSize:'30px',
            backgroundColor:'#57cdeb',
            color:'#000000',
            fixedWidth:300,
            padding: { left: 0, right: 0, top: 10, bottom: 10 },
            align:'center'

        })
        this.hard=this.add.text(400,450,"Hard",{
            fontSize:'30px',
            backgroundColor:'#57cdeb',
            color:'#000000',
            fixedWidth:300,
            padding: { left: 0, right: 0, top: 10, bottom: 10 },
            align:'center'

        })

        this.easy.setInteractive();
        this.med.setInteractive();
        this.hard.setInteractive();

        this.easy.on('pointerdown', () => {
            // Add your logic here to handle the click event, e.g., change scene, update score, etc.
            this.scene.switch('easy-scene')
            this.easy.setStyle({ fill: '#ff0000' }); // Example: change text color on click
        });

      
    }

   
}