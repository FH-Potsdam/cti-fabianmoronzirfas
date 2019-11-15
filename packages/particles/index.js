/**
 * @todo How to constrain the particle to the screen? ✓
 * @todo How to give an particle a live time? ✓
 * @todo How to create a new particle after 50 frames? ✓
 * @todo How to give the particle an on click action? ✓
 */
let canvas = undefined;
let jim = undefined;
const agents = [];
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent("sketch");
  jim = new Agent(random(width), random(height));
  // Agent().display(); will throw an error
}

function draw() {
  // background(210.5);
  if (frameCount % 50 === 0) {
    agents.push(
      new Agent(
        random(mouseX - 10, mouseX + 10),
        random(mouseY - 10, mouseY + 10),
      ),
    );
  }
  jim.update(mouseX, mouseY);
  jim.display();
  for (const item of agents) {
    item.update(mouseX, mouseY);
    item.display();
  }
  for (let i = agents.length - 1; i >= 0; i--) {
    if (agents[i].isDead === true) {
      agents.splice(i, 1);
    }
  }
}

function mousePressed() {
  // agents.push(new Agent(mouseX, mouseY));
  for (const item of agents) {
    if (item.isOver === true) {
      item.w = item.w + 0.5;
    }
  }
}
function mouseDragged() {
  agents.push(new Agent(mouseX, mouseY));
}
function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}

function Agent(x, y) {
  if (!(this instanceof Agent)) {
    throw new TypeError(
      "Agent can not be called as a function. Create an instance by calling 'new Agent(x,y)'",
    );
  }

  /**
   * If you want the fancy noise driven movement you need to add
   * these variables
   */
  // this.xoff = x;
  // this.yoff = y;
  // this.noiseRange = 2;

  this.x = x;
  this.y = y;
  this.w = 7;
  this.lifetime = 100;
  this.alphaSteps = 255 / this.lifetime;
  this.isDead = false;
  this.alpha = 255;
  this.isOver = false;

  /**
   * If you want the fancy noise driven movement remove
   * this update function
   */
  this.update = function(mx, my) {
    this.x = this.x + random(-0.5, 0.5);
    this.y = this.y + random(-0.5, 0.5);
    // constrain him to the canvas
    const d = dist(this.x, this.y, mx, my);
    if (d < this.w / 2) {
      console.log(d);
      this.isOver = true;
      this.lifetime++;
    } else {
      this.isOver = false;
    }

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    this.lifetime--;
    this.alpha = this.alphaSteps * this.lifetime;

    if (this.lifetime <= 0) {
      this.isDead = true;
    }
  };

  /**
   * If you want the fancy noise driven movement you need to add
   * this update function
   */
  // this.update = function() {
  //   this.xoff += 0.01;
  //   let xn = noise(this.xoff) * this.noiseRange;
  //   this.yoff += 0.01;
  //   let yn = noise(this.yoff) * this.noiseRange;
  //   this.x = this.x + xn - this.noiseRange / 2; //random(-1, 1);
  //   this.y = this.y + yn - this.noiseRange / 2; // random(-1, 1);
  //   // constrain him to the canvas
  //   if (this.x <= 0) {
  //     this.x = 0;
  //   }
  //   if (this.x >= width) {
  //     this.x = width;
  //   }
  //   if (this.y <= 0) {
  //     this.y = 0;
  //   }
  //   if (this.y >= height) {
  //     this.y = height;
  //   }
  // };

  this.display = function() {
    strokeWeight(2);
    // if (this.isOver === true) {
    // fill("#ff6347");
    // stroke("#00ff00");
    // } else {
    stroke(0, this.alpha);
    fill(255, this.alpha);
    // }
    ellipse(this.x, this.y, this.w);
  };
}
