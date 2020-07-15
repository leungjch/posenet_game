class Point {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

class Rectangle {
    constructor(x,y,w,h) {
        this.x = x
        this.y = y 
        this.w = w
        this.h = h
    }

    contains(point) {
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h)
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let neRect = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        let nwRect = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        let seRect = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        let swRect = new Rectangle(x - w/2, y + h/2, w/2, h/2);

        this.nw = new QuadTree(nwRect, this.capacity);
        this.ne = new QuadTree(neRect, this.capacity);
        this.sw = new QuadTree(swRect, this.capacity);
        this.se = new QuadTree(seRect, this.capacity);
        this.divided = true;

    }
    
    insert(point)
    {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided){
                this.subdivide();
            }

            if (this.ne.insert(point)) return true;
            if (this.nw.insert(point)) return true;
            if (this.se.insert(point)) return true;
            if (this.sw.insert(point)) return true;

        }
    }

    show() {
        stroke(255);
        strokeWeight(1)
        noFill();
        rectMode(CENTER)
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2)
        if (this.divided) {
            this.ne.show();
            this.nw.show();
            this.se.show();
            this.sw.show();
        }

        for (let p of this.points) {
            strokeWeight(4);
            point(p.x, p.y)
        }
    }
}