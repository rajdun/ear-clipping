let polygon = new Polygon(2, 10);
let canvas;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ui = new UI();
    ui.sleepTimeInput.value = sleepDurationSeconds;
    canvas = document.querySelector('canvas');
}

function draw() {
    background(255, 255, 240);
    drawGrid(10*windowSizeRatio, 10*windowSizeRatio);
    diagonal.draw();
    polygon.draw();
    drawTriangles();
    drawCrosshair();
    ui.update();
}

function mousePressed(e) {
    if(state !== "drawing" || e.target !== canvas) return; // 123
    verticesCount++;
    polygon.addVertex(createVector(mouseX, mouseY));
}


function keyPressed(e) {
    if(e.keyCode === 32) {
        if(state === "drawing") { // 123
            polygon.triangulate();
        }
        else if(state === "finished"){
            reset();
        }
    }
}
