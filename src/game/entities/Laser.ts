import Phaser from "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  direction: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'laser');

    this.speed = Phaser.Math.GetSpeed(500, 1);
    this.setScale(0.6);
  }

  // fire method should take x, y, and direction as arguments
  fire(x: number, y: number, direction: number): void {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);

    this.direction = direction;
    this.rotation = this.direction;
  }

  // update method should take time and delta as arguments
  update(time: number, delta: number): void {
    this.x += Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;

    // Check if laser is out of bounds and deactivate it
    if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }
}
