
let video;
let poseNet;
let pose;
let skeleton;

let WIDTH = 1500;
let HEIGHT = 1000;

class Enemy {
    constructor()
    {
        this.x = Math.floor(Math.random()*WIDTH)
        this.y = Math.floor(Math.random()*HEIGHT)
        this.speed = Math.random()
        this.radius = 32
    }
    move(playerX, playerY)
    {
        if (this.x > playerX)
        {
            this.x -= this.speed
        }
        else
        {
            this.x += this.speed
        }
        // If enemy is below player, move up
        if (this.y > playerY)
        {
            this.y -= this.speed
        }
        else
        {
            this.y += this.speed
        }
        
    }
}


let en = new Enemy()
let enemies = []

for (var i = 0; i < 10; i++)
{
    enemies.push(new Enemy())
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}


function draw() {


    transparencyc = color(255,255,255);
    transparencyc.setAlpha(128)
    fill(transparencyc)

    image(video, 0, 0);
    rect(0,0, WIDTH,HEIGHT)

    if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 64);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0,255,0);
    //   ellipse(x,y,16,16);
    // }

    for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
    fill(0,255,0)

    // Move enemies
    for (let enemy of enemies)
    {
        enemy.move(pose.nose.x,pose.nose.y)
        ellipse(enemy.x, enemy.y, enemy.radius)

    }


  
  }
}

