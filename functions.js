function drawCrosshair() {
    if(!b_drawCrosshair) return false;
    strokeWeight(1);
    stroke(0,0,0,128);
    line(0, mouseY, windowWidth, mouseY);
    line(mouseX, 0, mouseX, windowHeight);
}

async function sleep(t) {
    if(t===0) return false;
    await new Promise(r => setTimeout(r, t*1000));
}

function angle(a, b, c) {
    const temp =  Math.atan2((c.y-b.y), (c.x-b.x)) - Math.atan2((a.y-b.y), (a.x-b.x));
    return temp < 0 ? Math.PI*2 + temp: temp;
}

function drawTriangles() {
    triangles.forEach(t=>{
        if (t.visible) t.draw();
    })
}

async function showTriangles() {
    triangles.forEach(t=>{
        t.visible = true;
        sleep(sleepDurationSeconds);
    })
}

function randomColor() {
    r = random(255);
    g = random(100,200);
    b = random(100);

    return [r,g,b];
}

function drawGrid(xSize, ySize) {
    if(!b_drawGrid) return false;
    for (let i = 0; i < windowHeight; i+=ySize) {
        strokeWeight(1);
        stroke(0,0,0,32);
        line(0, i, windowWidth, i);
    }
    for (let j = 0; j < windowWidth; j+=xSize) {
        strokeWeight(1);
        stroke(0,0,0,32);
        line(j, 0, j, windowHeight);
    }
}

function lineIntersect(a, b, c, d, p, q, r, s) {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

function isPointInTriangle(p, p0, p1, p2) {
    const A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    const sign = A < 0 ? -1 : 1;
    const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

    return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}

function reset() {
    polygon = new Polygon(2, 10);
    triangles = [];
    actionsCount = 0;
    verticesCount = 0;
    state = "drawing"
}

