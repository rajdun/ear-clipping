class Polygon{
    constructor() {
        this.vertices = [];
    }

    get area() {
        let area = 0;
        for (let i = 0; i < this.vertices.length; i++) {
            let j = (i + 1) % this.vertices.length;
            area += this.vertices[i].x * this.vertices[j].y;
            area -= this.vertices[j].x * this.vertices[i].y;
        }
        return area / 2;
    }

    addVertex(vec2) {
        this.vertices.push(vec2)
    }

    drawLines() {
        for (let i = 0; i < this.vertices.length+1; i++) {
            stroke(mainColor);
            strokeWeight(lineWeight);
            line(this.vertices[i % this.vertices.length].x, this.vertices[i % this.vertices.length].y, this.vertices[(i+1) % this.vertices.length].x, this.vertices[(i+1) % this.vertices.length].y)
        }
    }

    drawDots() {
        this.vertices.forEach(v=>{
            stroke(v.z > 0 ? highlightColor : mainColor);
            strokeWeight(v.z > 0 ? dotRadius*2 : dotRadius);
            point(v.x, v.y);
        })
    }

    draw() {
        if(this.vertices < 3) return false;
        this.drawLines();
        this.drawDots();
    }

    async isEar(i) {
        let isEar = true;
        if(angle(this.vertices[i % this.vertices.length], this.vertices[(i + 1) % this.vertices.length], this.vertices[(i + 2) % this.vertices.length]) > Math.PI) {
            isEar = false;
            actionsCount++;
        }
        else{
            for (let j = 0; j < this.vertices.length+1; j++) {
                actionsCount++;
                this.setCurrentVertices([i, i+1, i+2, j])
                await sleep(sleepDurationSeconds/5);
                if (isPointInTriangle(this.vertices[j%this.vertices.length], this.vertices[(i)%this.vertices.length], this.vertices[(i+1)%this.vertices.length],this.vertices[(i+2)%this.vertices.length])){
                    isEar = false;
                    this.vertices[j%this.vertices.length].z = 0;
                    break;
                }
            }
        }
        return isEar;
    }

    async triangulate() {
        if (this.vertices.length < 3) return false;

        if(this.area > 0) this.vertices.reverse();

        let i=0;
        state = "playing";
        diagonal.visible = true;
        while (this.vertices.length > 3) {
            diagonal.setPoints(this.vertices[(i) % this.vertices.length], this.vertices[(i + 2) % this.vertices.length]);
            diagonal.color = executingColor;
            this.setCurrentVertices([i, i+1, i+2])
            if(await this.isEar(i)) {
                const tempTriangle = new Triangle(this.vertices[i % this.vertices.length], this.vertices[(i + 1) % this.vertices.length], this.vertices[(i + 2) % this.vertices.length], randomColor());
                triangles.push(tempTriangle);
                diagonal.color = successColor;

                await sleep(sleepDurationSeconds);

                this.vertices.splice((i + 1) % this.vertices.length, 1);
            }
            else{
                diagonal.color = failureColor;
                await sleep(sleepDurationSeconds);
            }
            i++;
        }
        const tempTriangle = new Triangle(this.vertices[i%this.vertices.length], this.vertices[(i+1)%this.vertices.length], this.vertices[(i+2)%this.vertices.length], randomColor());
        triangles.push(tempTriangle);

        actionsCount++;
        this.setCurrentVertices([0]);
        await sleep(sleepDurationSeconds);
        this.vertices = [];
        diagonal.visible = false;

        await showTriangles();
        state = "finished";
    }

    setCurrentVertices(i) {
        const verLen = this.vertices.length;
        for (let j = 0; j < verLen; j++) {
            this.vertices[j].z = 0;
        }
        for (let j = 0; j < i.length; j++) {
            this.vertices[i[j]%verLen].z = 1;
        }
    }
}
