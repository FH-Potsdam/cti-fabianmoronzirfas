/**
 * @todo change size of area on mouseOver ✓
 * @todo change rotation of area on mouseOver ✓
 * @todo draw area from center not upper left corner ✓
 * @todo do something on click for the area ✓
 */
let x = 0;
let canvas = undefined;
const step = 25;
const border = 12.5;
let areas = [];
function setup() {
  canvas = createCanvas(125, 125);
  rectMode(CENTER);
  canvas.parent("sketch");
  for (let x = step / 2 + border; x <= width - step / 2 - border; x += step) {
    for (
      let y = step / 2 + border;
      y <= height - step / 2 - border;
      y += step
    ) {
      areas.push(new Area(x, y, step, step));
    }
  }
  // noStroke()
  stroke(255);
}

function draw() {
  background(255);
  areas = areas.sort((a, _b) => {
    if (a.isOver === true) {
      return 1;
    } else {
      return 0;
    }
  });
  for (const item of areas) {
    item.update(mouseX, mouseY);
    item.display();
  }
}

function Area(x, y, w, h) {
  if (!(this instanceof Area)) {
    throw new TypeError(
      "Area can not be called as a function. Create an instance by calling new Area(x,y,w,h)",
    );
  }
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isOver = false;
  this.rotation = 0;

  this.update = function(mX, mY) {
    if (
      mX > this.x - this.w / 2 &&
      mX < this.x + this.w / 2 &&
      mY > this.y - this.h / 2 &&
      mY < this.y + this.h / 2
    ) {
      this.isOver = true;
      this.rotation += 2;
    } else {
      this.isOver = false;
      // this.roation -= 1;
      this.rotation = this.rotation < 0 ? 0 : this.rotation - 1;
    }
  };

  this.display = function() {
    let w = this.w;
    push();
    translate(this.x, this.y);
    rotate(radians(this.rotation % 360));
    if (this.isOver === true) {
      fill("#ff6347");
      w = w + 5;
    } else {
      fill("#00ff00");
      w = this.w;
    }
    rect(0, 0, w, w);
    pop();
  };
}

function mousePressed() {
  for (let i = areas.length - 1; i >= 0; i--) {
    if (areas[i].isOver === true) {
      areas.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}
