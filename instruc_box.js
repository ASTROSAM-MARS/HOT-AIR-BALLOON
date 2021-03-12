class instruc_box{
    constructor(){
        this.x = 495;
        this.y = 250;
        this.height = 400;
        this.width = 300;
    }

    display(){
        push();
        fill(250);
        rect(this.x, this.y, this.height, this.width);
        pop();
    }
}