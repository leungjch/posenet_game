
class Player {
    constructor()
    {
        this.hp = 100
        this.damageBase = 1.05
        this.damageLeft = 1.05
        this.damageRight = 1.05
        this.reactTime = 10 // show pain face for 10 frames
        this.react = 0; // react iterator
        // Set everything in the middle by default
        let leftWristX = WIDTH/2
        let leftWristY = HEIGHT/2
        let leftWristR = 256;
        this.left = new Circle(leftWristX, leftWristY, leftWristR)
        this.leftPrev = new Circle(leftWristX, leftWristY, leftWristR)

        let rightWristX = WIDTH/2
        let rightWristY = HEIGHT/2
        let rightWristR = 256;
        this.right = new Circle(rightWristX, rightWristY, rightWristR)
        this.rightPrev = new Circle(rightWristX, rightWristY, rightWristR)

        let headX = WIDTH/2
        let headY = HEIGHT/2
        let headR = 256;
        this.head = new Circle(headX, headY, headR)

    }
}