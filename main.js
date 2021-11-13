video="";
status1="";
objects=[];

function preload(){

    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(0, 0, 480, 380);
    canvas.center();
}

function start(){

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:Detecting Objects";
}

function modelLoaded(){

    console.log("model Loaded");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){

    image(video, 0, 0, 480, 380);
    
        if(status1 != ""){

            objectDetector.detect(video, gotResult);
            for(i=0;i<objects.length;i++){

                document.getElementById("status").innerHTML="Status: Object Detected";
                document.getElementById("number_of_objects").innerHTML="Number of Objects Detected:"+objects.length;
                fill("red");
                percent=floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%",objects[i]+15,objects[i].y+15);
                noFill();
                stroke("black");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);                
            }

    }
}

function gotResult(error, results){

    if(error){

        console.log(error);

    }

    console.log(results);
    objects=results;


}