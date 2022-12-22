song="";
status="";
object=[];

function preload(){
    song=loadSound("alarm_r.mp3");
    }

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectdetector=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="Status: Detecting Object"
}

function modelloaded(){
console.log("modelloaded")
status=true;
}

function gotresults(error, results){
if(error){
console.log(error);
}
else{
console.log(results);
object=results;
}
}

function draw(){
image(video,0,0,380,380);
if(status!=""){
r= random(255);
g= random(255);
b= random(255);
objectdetector.detect(video,gotresults);
for(i=0; i<object.length; i++){
document.getElementById("status").innerHTML="Object Detected";
fill(r,g,b);
percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%", object[i].x+15, object[i].y+15);
noFill();
stroke(r,g,b);
rect(object[i].x, object[i].y, object[i].width, object[i].height);
if(objects[i].label=="person"){
    document.getElementById("found").innerHTML="Baby is in view";
    song.stop()
}
else{
document.getElementById("found").innerHTML="Baby is not in view and in potential danger";
song.play();
}
    
}
if(objects.length==0){
    document.getElementById("found").innerHTML="Baby is not in view and in potential danger";
    song.play();
}
}
}