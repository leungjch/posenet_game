
class Enemy {
    constructor()
    {
        this.speed = Math.random()*5

        // Geometry
        let randY = Math.floor(Math.random()*WIDTH)
        let randX = Math.floor(Math.random()*HEIGHT)
        let randR = Math.ceil(Math.random()*128)+16
        this.circle = new Circle(randX, randY, randR);
    }
    move(player)
    {
        let playerX = player.head.x
        let playerY = player.head.y
        
        var distance = Math.sqrt((playerX-this.circle.x)**2 + (playerY-this.circle.y)**2)
        var ang = Math.atan(Math.abs(playerY-this.circle.y)/Math.abs(playerX-this.circle.x))

        if (this.circle.x > playerX)
        {
            this.circle.x -= Math.cos(ang)*this.speed
        }
        else
        {
            this.circle.x += Math.cos(ang)*this.speed
        }
        // If enemy is below player, move up
        if (this.circle.y > playerY)
        {
            this.circle.y -= Math.sin(ang)*this.speed
        }
        else
        {
            this.circle.y += Math.sin(ang)*this.speed
        }
        
    }
}

