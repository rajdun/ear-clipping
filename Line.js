class Line{
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.color = mainColor;
        this.visible = false;
    }

    draw() {
        if (!this.visible) return false;
        stroke(this.color);
        strokeWeight(lineWeight);
        line(this.a, this.b, this.c , this.d);
    }

    setPoints(p1, p2) {
        this.a = p1.x;
        this.b = p1.y;
        this.c = p2.x;
        this.d = p2.y;
    }
}
