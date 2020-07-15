
class Player {
    constructor()
    {
        this.hp = 100
        this.damage = 1.2

        // Set everything in the middle by default
        let leftWristX = WIDTH/2
        let leftWristY = HEIGHT/2
        let leftWristR = 256;
        this.left = new Circle(leftWristX, leftWristY, leftWristR)

        let rightWristX = WIDTH/2
        let rightWristY = HEIGHT/2
        let rightWristR = 256;
        this.right = new Circle(rightWristX, rightWristY, rightWristR)

        let headX = WIDTH/2
        let headY = HEIGHT/2
        let headR = 256;
        this.head = new Circle(headX, headY, headR)

    }
}