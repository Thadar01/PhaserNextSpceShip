import Phaser from "phaser";

export default class ResultScene extends Phaser.Scene{
            cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    
    easyResult:number
    constructor(){
        super('result-scene')
        this.easyResult=0
    }
    
    init(data:{easyscore:number}){
        this.easyResult=data.easyscore
    }
    create(){

        if(this.easyResult<300 || this.easyResult === 0){
            this.add.text(400,300,'Fail! Try Again',{
                fontSize:'30px'
            })
            this.add.text(400,350,`Result: ${this.easyResult}`,{
                fontSize:'30px'
            })
        }else{
            this.add.text(400,300,'Congratulation!!',{
                fontSize:'30px'
            })
            this.add.text(400,350,`Result: ${this.easyResult}`,{
                fontSize:'30px'
            })
        }

        if(this.input.keyboard){
            this.cursor=this.input.keyboard?.createCursorKeys()

        }
      
    }

    update(){
        if(this.cursor.space.isDown){
            this.scene.switch('main-menu')
        }
    }
   
}