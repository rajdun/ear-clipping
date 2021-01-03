class Triangle{
    constructor(a, b, c, color='black') {
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = color;
        this.visible = false;
    }

    draw() {
        fill(this.color[0], this.color[1], this.color[2],128);
        stroke(mainColor);
        strokeWeight(lineWeightLight);
        triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    }
}
