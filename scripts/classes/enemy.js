function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

// Types: 'roamer', 'seeker', 'boss', 'shooter'
class Enemy {
    constructor(icons)
    {
        this.types = ['roamer', 'seeker', 'robot']
        this.type = choose(this.types);

        if (this.type === 'roamer')
        {
            this.icon = icons['alien']
        }

        if (this.type === 'seeker')
        {
            this.icon = icons['evil']
        }
        
        if (this.type === 'robot')
        {
            this.icon = icons['robot']
            this.direction = choose(['left', 'up', 'down', 'rightDiag', 'leftDiag', 'right']);
        }

        // Geometry
        let randY = Math.floor(Math.random()*HEIGHT)
        let randX = Math.floor(Math.random()*WIDTH)
        let randR = Math.ceil(Math.random()*256)+16
        this.speed = Math.random()*10

        this.circle = new Circle(randX, randY, randR);
    }
    move(player)
    {

        let playerX = player.head.x
        let playerY = player.head.y

        var distance = Math.sqrt((playerX-this.circle.x)**2 + (playerY-this.circle.y)**2)
        var ang = Math.atan(Math.abs(playerY-this.circle.y)/Math.abs(playerX-this.circle.x))

        if (this.type === "roamer")
        {
            this.circle.x += this.speed * (-1)**(Math.round(Math.random())) * 2
            this.circle.y += this.speed * (-1)**(Math.round(Math.random())) * 2
        }
        else if (this.type === "seeker")
        {
                
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
        else if (this.type === "robot")
        {
            if (this.direction === "left")
            {
                this.circle.x -= this.speed
            }
            else if (this.direction === "right")
            {
                this.circle.x += this.speed

            }
            else if (this.direction === "up")
            {
                this.circle.y -= this.speed

            }
            else if (this.direction === "down")
            {
                this.circle.y += this.speed

            }
            else if (this.direction === "leftDiag")
            {
                this.circle.x += this.speed
                this.circle.y -= this.speed

            }
            else if (this.direction === "rightDiag")
            {
                this.circle.x -= this.speed
                this.circle.y += this.speed
            }
        }
        


        
    }
}

