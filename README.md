

[This project is the single-player component of another project.](https://github.com/leungjch/posenet-game-peer2peer)

[You can still play the singleplayer version on Github pages here.](https://leungjch.github.io/posenet_game/)

# Emoji ninja

A unique bullet hell-like game where the player is controlled by your body! Think Kinect but with any cheap webcam, thanks to recent advances in machine learning pose estimation.

# Instructions

- Set up a webcam that shows a clear space. **Make sure your surroundings are clear of potential sources of injuries (e.g. walls, tripping hazards)!**

- Use your wrists to fight off approaching enemies. If they touch your head, you receive damage.

- Hold off for as long as you can and reach for a high score!

# Misc

Graphics implemented in in p5.js. Pose estimation was done using the pretrained PoseNet model from ml5.js. 

- Implemented a Quadtree data structure to improve collision detection time complexity from O(n^2) to O(nlogn).