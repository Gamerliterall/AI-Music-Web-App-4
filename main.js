song = "";
status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0; 
scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {

    canvas =  createCanvas(400, 300);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(355, 255);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 400, 300);

    fill("#24f235");
    stroke("#24f235");

    if(scoreLeftWrist > 0.5){
    circle(leftWristX, leftWristY, 20);
    status = "true";
    song2.stop();
    }
    else if(scoreRightWrist > 0.5) {
        circle(rightWristX, rightWristY, 20);
        status = "false";
        song1.stop();
    }
}

function gotPoses(results)
{
    if(results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist = " + scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function play()
{
    if(status = "true"){
        song1.play();
        document.getElementById("firenation").innerHTML = "Harry Potter";
    }
    else if(status = "false"){
        song2.play();
        document.getElementById("firenation").innerHTML = "Peter Pan";
    }
}

function modelLoaded()
{
    console.log('PoseNet Is Successfully Loaded');
}