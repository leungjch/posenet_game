// let boundary = new Rectangle(200,200,200,200);
// let qt = new QuadTree(boundary, 4);
// console.log(qt)

// for (let i = 0; i < 25; i++) {
//     let p = new Point(Math.ceil(Math.random()*400), Math.ceil(Math.random()*400))
//     qt.insert(p)
// }
// console.log(qt)
// function setup()
// {
//     createCanvas(400,400)
// }
// function draw(){
//     background(0)
//     qt.show();

//     stroke(0,255,0);
//     rectMode(CENTER);
//     let range = new Rectangle(250,250,107,75);
    
//     rect(range.x, range.y, range.w*2, range.h*2)
//     let points = []
//     qt.query(range,points)
//     console.log(points);
// }


let video;
let poseNet;
let pose;
let skeleton;

let grin;

let WIDTH = 1920;
let HEIGHT = 1080;

let scaleWidth;
let scaleHeight;

let player;

function checkCollision(x1, x2, y1, y2, r1, r2)
{
    distance = Math.sqrt((x1-x2)**2 + (y1-y2)**2)
    if (distance <= (r1 + r2)/2)
    {
        return true
    }
    else
    {
        return false
    }
}

let en = new Enemy()
let enemies = []

for (var i = 0; i < 10; i++)
{
    enemies.push(new Enemy())
}

function gotPoses(poses) {
    //console.log(poses); 
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        let nX = poses[0].pose.keypoints[0].position.x;
        let nY = poses[0].pose.keypoints[0].position.y;
        // let eX = poses[0].pose.keypoints[1].position.x;
        // let eY = poses[0].pose.keypoints[1].position.y;
        // player.head.x = lerp(player.head.x, nX, 0.5);
        // player.head.y = lerp(player.head.y, nY, 0.5);
        // eyelX = lerp(eyelX, eX, 0.5);
        // eyelY = lerp(eyelY, eY, 0.5);


    }
  }
  

function setup() {
    createCanvas(WIDTH, HEIGHT);
    video = createCapture(VIDEO);
    video.hide();
    player = new Player();  

    poseNet = ml5.poseNet(video, modelLoaded, 
        options = {
            imageScaleFactor: 0.1,
            outputStride: 16,
            flipHorizontal: false,
            minConfidence: 0.5,
            maxPoseDetections: 5,
            scoreThreshold: 0.5,
            nmsRadius: 20,
            detectionType: 'single',
            multiplier: 0.75,
        });
    poseNet.on('pose', gotPoses);

    scaleWidth = WIDTH/video.width;
    scaleHeight = HEIGHT/video.height;

    // Load emoji
    grin = loadImage('./icons/grinning_msft.png')
    fist = loadImage('./icons/fist_msft.png')

    // scaleWidth = 1
    // scaleHeight = 1

}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {

    push();
    // Make the webcam view half transparent
    transparencyc = color(255,255,255);
    transparencyc.setAlpha(128)

    translate(WIDTH,0);  
    // We need to flip the webcam so that movement is less confusing
    // We also need to scale the webcam and pose coordinates to the screen
    // Flip webcam
    scale(-1, 1); 
    image(video, 0, 0, WIDTH, HEIGHT);
    fill(transparencyc)
    rect(0,0, WIDTH,HEIGHT)
    pop();

    // Fetch pose
    if (pose) {
    // Rough depth estimation by measuring the distance in coordinates between eyes
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);


    // Flip and scale pose coordinates and store them in player
    player.head.x = lerp(player.head.x, WIDTH - (WIDTH * pose.nose.x/video.width), 0.5);
    player.head.y = lerp(player.head.y, HEIGHT * pose.nose.y/video.height, 0.5);
    // player.head.r = d*10

    player.left.x = lerp(player.left.x, WIDTH - (WIDTH * pose.leftWrist.x/video.width), 1)
    player.left.y = lerp(player.left.y, HEIGHT * pose.leftWrist.y/video.height, 1)

    player.right.x = lerp(player.right.x, WIDTH - (WIDTH * pose.rightWrist.x/video.width),1 )
    player.right.y = lerp(player.right.y, HEIGHT * pose.rightWrist.y/video.height, 1)

    // Get "speed" of movements
    let kineticLeft = Math.sqrt((player.left.x - player.leftPrev.x)**2 + (player.left.y - player.leftPrev.y)**2)/d
    let kineticRight = Math.sqrt((player.right.x - player.rightPrev.x)**2 + (player.right.y - player.rightPrev.y)**2)/d
    strokeWeight(kineticLeft*20)
    line(player.leftPrev.x, player.leftPrev.y, player.left.x, player.left.y)
    strokeWeight(kineticRight*20)
    line(player.rightPrev.x, player.rightPrev.y, player.right.x, player.right.y)
    // line(player.right.x, player.rightPrev.x, player.right.y, player.rightPrev.y)
    strokeWeight(1)
    console.log(kineticLeft, kineticRight)

    // Update previous wrist positions
    player.rightPrev.x = player.right.x
    player.rightPrev.y = player.right.y

    player.leftPrev.x = player.left.x
    player.leftPrev.y = player.left.y
    }
    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0,255,0);
    //   ellipse(x,y,16,16);
    // }

    // for (let i = 0; i < skeleton.length; i++) {
    //     let a = skeleton[i][0];
    //     let b = skeleton[i][1];
    //     strokeWeight(2);
    //     // stroke(255);
    //     line(a.position.x, a.position.y,b.position.x,b.position.y);      
    // }
    fill(0,255,0)

    // Draw the player
    // Draw head
    fill(255, 255, 0);
    // ellipse(player.head.x, player.head.y, player.head.r);
    image(grin, player.head.x-player.head.r/2, player.head.y-player.head.r/2, player.head.r, player.head.r)

    // Draw HP
    fill(0,0,0)
    textSize(100)
    text(Math.floor(player.hp), player.head.x-player.head.r/2, player.head.y-player.head.r/2)

    // Draw wrists
    fill(0, 0, 255);
    ellipse(player.left.x, player.left.y, player.left.r);
    image(fist, player.left.x-player.left.r/2, player.left.y-player.left.r/2, player.left.r, player.left.r)

    ellipse(player.right.x, player.right.y, player.right.r);
    image(fist, player.right.x-player.right.r/2, player.right.y-player.right.r/2, player.right.r, player.right.r)

    fill(255, 0, 0);

    // Build the quadtree
    let boundary = new Rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT);
    let qtree = new QuadTree(boundary, 2);

    // Move enemies
    for (let enemy of enemies)
    {
        enemy.move(player)
        ellipse(enemy.circle.x, enemy.circle.y, enemy.circle.r)
        // // Check enemy collision against left and right wrists
        // if (checkCollision(player.left.x, enemy.x, player.left.y, enemy.y, player.left.r, enemy.radius) || 
        //     checkCollision(player.right.x, enemy.x, player.right.y, enemy.y, player.right.r, enemy.radius))
        // {
        //     enemies.splice(enemies.indexOf(enemy),1)
        // }

        // // Check enemy collision against head
        // if (checkCollision(player.head.x, enemy.x, player.head.y, enemy.y, player.head.r, enemy.radius))
        // {
        //     enemies.splice(enemies.indexOf(enemy),1)
        //     player.hp -= 1
        // } 
    }

    for (let enemy of enemies) {
        let point = new Point(enemy.circle.x, enemy.circle.y, enemy);
        qtree.insert(point);
      }

    // Query quadtree
    let headRange = new Circle(player.head.x, player.head.y, player.head.r * 0.5);

    let rangePoints = qtree.query(headRange); // Possible points of collision near the query
    for (let point of rangePoints) {
        if (player.head.contains(point))
        {
            fill(255,0,0)
            textSize(point.entity.circle.r * 2)
            text("-" + Math.floor(player.hp), player.head.x-player.head.r/2, player.head.y-player.head.r/2)
            
            player.hp -= point.entity.circle.r * 4
            // point.entity.circle.r*=1.02
            enemies.splice(enemies.indexOf(point.entity),1)
        }
    }

    let leftRange = new Circle(player.left.x, player.left.y, player.left.r * 0.5);
    let rightRange = new Circle(player.right.x, player.right.y, player.right.r * 0.5);
    let leftRangePoints = qtree.query(leftRange); // Possible points of collision near the query
    let rightRangePoints = qtree.query(rightRange); // Possible points of collision near the query

    for (let point of leftRangePoints) {
        if (player.left.contains(point))
        {
            fill(0,255,0)
            textSize(point.entity.circle.r*3)
            text("+" + Math.floor(point.entity.circle.r), player.left.x-player.left.r/2 + Math.random()*player.left.r, player.left.y-player.left.r/2 + Math.random()*player.left.r)
            point.entity.circle.r/=player.damageLeft

            // enemies.splice(enemies.indexOf(point.entity),1)
            player.hp += point.entity.circle.r

            if (point.entity.circle.r < 2)
            {
                enemies.splice(enemies.indexOf(point.entity),1)
            }

        }
    }
    for (let point of rightRangePoints) {
        if (player.right.contains(point))
        {
            fill(0,255,0)
            textSize(point.entity.circle.r*3)
            text("+" + Math.floor(point.entity.circle.r), player.right.x-player.right.r/2 + Math.random()*player.right.r, player.right.y-player.right.r/2 + Math.random()*player.right.r)
            point.entity.circle.r/=player.damageRight

            // enemies.splice(enemies.indexOf(point.entity),1)
            player.hp += point.entity.circle.r

            if (point.entity.circle.r < 2)
            {
                enemies.splice(enemies.indexOf(point.entity),1)
            }

        }
    }
    // qtree.show();    
      

    if (Math.random()>0.8)
    {
        enemies.push(new Enemy())
    }

  
  
}

