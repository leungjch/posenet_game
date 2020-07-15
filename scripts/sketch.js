let boundary = new Rectangle(200,200,200,200);
let qt = new QuadTree(boundary, 4);
console.log(qt)

for (let i = 0; i < 100; i++) {
    let p = new Point(Math.ceil(Math.random()*400), Math.ceil(Math.random()*400))
    qt.insert(p)
}
console.log(qt)
function setup()
{
    createCanvas(400,400)
    
}
function draw(){
    background(0)
    qt.show();
}


// class Enemy {
//     constructor()
//     {
//         this.x = Math.floor(Math.random()*WIDTH)
//         this.y = Math.floor(Math.random()*HEIGHT)
//         this.speed = Math.random()
//         this.radius = 32
//     }
//     move(playerX, playerY)
//     {
//         var distance = Math.sqrt((playerX-this.x)**2 + (playerY-this.y)**2)
//         var ang = Math.atan(Math.abs(playerY-this.y)/Math.abs(playerX-this.x))
        
        

//         if (this.x > playerX)
//         {
//             this.x -= Math.cos(ang)*this.speed
//         }
//         else
//         {
//             this.x += Math.cos(ang)*this.speed
//         }
//         // If enemy is below player, move up
//         if (this.y > playerY)
//         {
//             this.y -= Math.sin(ang)*this.speed
//         }
//         else
//         {
//             this.y += Math.sin(ang)*this.speed
//         }
        
//     }
// }

// class Player {
//     constructor()
//     {
//         this.hp = 100

//         // Set everything in the middle by default
//         this.leftWristX = WIDTH/2
//         this.leftWristY = HEIGHT/2
//         this.leftWristRadius = 256;


//         this.rightWristX = WIDTH/2
//         this.rightWristY = HEIGHT/2
//         this.rightWristRadius = 256;

//         this.headX = WIDTH/2
//         this.headY = HEIGHT/2
//         this.headRadius = 256;

//     }
// }

// class Powerup {
//     constructor()
//     {
//         types = ["health", "fire", "zap", "gun", ""]
//     }
// }


// let video;
// let poseNet;
// let pose;
// let skeleton;

// let grin;

// let WIDTH = 1920;
// let HEIGHT = 1080;

// let scaleWidth;
// let scaleHeight;

// let player = new Player();

// function checkCollision(x1, x2, y1, y2, r1, r2)
// {
//     distance = Math.sqrt((x1-x2)**2 + (y1-y2)**2)
//     if (distance <= (r1 + r2)/2)
//     {
//         return true
//     }
//     else
//     {
//         return false
//     }
// }

// let en = new Enemy()
// let enemies = []

// for (var i = 0; i < 10; i++)
// {
//     enemies.push(new Enemy())
// }

// function gotPoses(poses) {
//     //console.log(poses); 
//     if (poses.length > 0) {
//       pose = poses[0].pose;
//       skeleton = poses[0].skeleton;
//     }
//   }
  

// function setup() {
//   createCanvas(WIDTH, HEIGHT);
//   video = createCapture(VIDEO);
//   video.hide();
//   poseNet = ml5.poseNet(video, modelLoaded);
//   poseNet.on('pose', gotPoses);

//   scaleWidth = WIDTH/video.width;
//   scaleHeight = HEIGHT/video.height;

//   // Load emoji
//   grin = loadImage('./icons/grinning_msft.png')
//   fist = loadImage('./icons/fist_msft.png')

//     // scaleWidth = 1
//     // scaleHeight = 1

// }

// function modelLoaded() {
//   console.log('poseNet ready');
// }

// function draw() {
//     push();

//     transparencyc = color(255,255,255);
//     transparencyc.setAlpha(128)


//     translate(WIDTH,0);  
//     // We need to flip the webcam so that movement is less confusing
//     // We also need to scale the webcam and pose coordinates to the screen
//     // Flip webcam
//     scale(-1, 1); 
//     image(video, 0, 0, WIDTH, HEIGHT);
//     pop();
//     fill(transparencyc)
//     rect(0,0, WIDTH,HEIGHT)

    
//     if (pose) {

//     // Rough depth estimation by measuring the distance in coordinates between eyes
//     let eyeR = pose.rightEye;
//     let eyeL = pose.leftEye;
//     let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

//     // Flip and scale pose coordinates and store them in player
//     // player.headX = WIDTH - scaleWidth * pose.nose.x
//     // player.headY = scaleHeight * pose.nose.y
//     player.headX = WIDTH - (WIDTH * pose.nose.x/video.width)
//     player.headY = HEIGHT * pose.nose.y/video.height



//     player.leftWristX = WIDTH - (WIDTH * pose.leftWrist.x/video.width)
//     player.leftWristY = HEIGHT * pose.leftWrist.y/video.height

//     player.rightWristX = WIDTH - (WIDTH * pose.rightWrist.x/video.width)
//     player.rightWristY = HEIGHT * pose.rightWrist.y/video.height
//     }
//     // for (let i = 0; i < pose.keypoints.length; i++) {
//     //   let x = pose.keypoints[i].position.x;
//     //   let y = pose.keypoints[i].position.y;
//     //   fill(0,255,0);
//     //   ellipse(x,y,16,16);
//     // }

//     // for (let i = 0; i < skeleton.length; i++) {
//     //     let a = skeleton[i][0];
//     //     let b = skeleton[i][1];
//     //     strokeWeight(2);
//     //     // stroke(255);
//     //     line(a.position.x, a.position.y,b.position.x,b.position.y);      
//     // }
//     fill(0,255,0)

//     // Draw the player
//     // Draw head
//     fill(255, 255, 0);
//     ellipse(player.headX, player.headY, player.headRadius);
//     image(grin, player.headX-player.headRadius/2, player.headY-player.headRadius/2, player.headRadius, player.headRadius)
//     // Draw HP
//     textSize(100)
//     text(player.hp, player.headX-player.headRadius/2, player.headY-player.headRadius/2)

//     // Draw wrists
//     fill(0, 0, 255);
//     ellipse(player.leftWristX, player.leftWristY, player.leftWristRadius);
//     image(fist, player.leftWristX-player.leftWristRadius/2, player.leftWristY-player.leftWristRadius/2, player.leftWristRadius, player.leftWristRadius)

//     ellipse(player.rightWristX, player.rightWristY, player.rightWristRadius);
//     image(fist, player.rightWristX-player.rightWristRadius/2, player.rightWristY-player.rightWristRadius/2, player.rightWristRadius, player.rightWristRadius)

//     fill(255, 0, 0);

//     // Move enemies
//     for (let enemy of enemies)
//     {
//         enemy.move(player.headX,player.headY)
//         ellipse(enemy.x, enemy.y, enemy.radius)

//         // Check enemy collision against left and right wrists
//         if (checkCollision(player.leftWristX, enemy.x, player.leftWristY, enemy.y, player.leftWristRadius, enemy.radius) || 
//             checkCollision(player.rightWristX, enemy.x, player.rightWristY, enemy.y, player.rightWristRadius, enemy.radius))
//         {
//             enemies.splice(enemies.indexOf(enemy),1)
//         }

//         // Check enemy collision against head
//         if (checkCollision(player.headX, enemy.x, player.headY, enemy.y, player.headRadius, enemy.radius))
//         {
//             enemies.splice(enemies.indexOf(enemy),1)
//             player.hp -= 1
//         }
//     }

//     if (Math.random()>0.95)
//     {
//         enemies.push(new Enemy())
//     }

  
  
// }

