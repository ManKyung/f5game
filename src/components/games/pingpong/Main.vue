<template>
    <v-container>
        <v-toolbar app color="green lighten-2">
            <img class="ml-2" src="/static/img/pingpong.png" height='32'>
            <v-spacer></v-spacer>

            <v-btn dark icon @click="startHandler">
                <v-icon>fullscreen</v-icon>
            </v-btn>
        </v-toolbar>
        <canvas ref="myCanvas" id="myCanvas" width="480" height="320"></canvas>
    </v-container>
</template>
<style>
canvas { background: #eee; display: block; margin: 0 auto; }
</style>

<script>
export default {
    name: 'pingpong',
    data(){
        return{
            isFullScreen: false,
            isStart: false,
            dx:2,
            dy:-2,
            ballRadius:10,
            ballColor:'#0095DD',
            ballSpeed:10,

            paddleWidth:75,
            paddleHeight:10,

            brickRowCount:4,
            brickColumnCount:5,
            brickWidth:75,
            brickHeight:10,
            brickPadding:10,
            brickOffsetTop:30,
            brickOffsetLeft:30,
            
            rightPressed: false,
            leftPressed: false,
            score: 0,
            bricks:[]
        }
    },
    created(){
        
        for(var c = 0 ; c < this.brickColumnCount; c++){
            this.bricks[c] = [];
            for(var r = 0 ; r < this.brickRowCount; r++){
                this.bricks[c][r] = {x:0, y:0, status: true};
            }
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.canvas = this.$refs['myCanvas'];
            this.ctx = this.canvas.getContext('2d');
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height - 30;
            this.paddleX = (this.canvas.width - this.paddleWidth) / 2,
            
            window.addEventListener ('keydown', this.keyDownHandler);
            window.addEventListener ('keyup', this.keyUpHandler);
            window.addEventListener ('mousemove', this.mouseMoveHandler);

            
            setInterval(this.draw, this.ballSpeed);
        })
    },
    methods:{
        mouseMoveHandler(e) {
            var relativeX = e.clientX - this.canvas.offsetLeft;
            if(relativeX > 0 && relativeX < this.canvas.width) {
                this.paddleX = relativeX - this.paddleWidth/2;
            }
        },
        drawScore(){
            this.ctx.beginPath();
            this.ctx.font = "16px Arial";
            this.ctx.fillStyle = '#0095DD';
            this.ctx.fillText('Score: '+ this.score, 4 , 20);
            this.ctx.closePath();
        },
        drawBricks(){
            for(var c = 0 ; c < this.brickColumnCount; c++){
                for(var r = 0 ; r < this.brickRowCount; r++){
                    if(this.bricks[c][r].status){
                        var brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                        var brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    
                        this.bricks[c][r].x = brickX;
                        this.bricks[c][r].y = brickY;
                        this.ctx.beginPath();
                        this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                        this.ctx.fillStyle = "#0095DD";
                        this.ctx.fill();
                        this.ctx.closePath();
                    }
                }
            }
        },
        keyDownHandler(e){
            if(e.keyCode == 37){
                this.leftPressed = true;
            } else if(e.keyCode == 39){
                this.rightPressed = true;
            }
        },
        keyUpHandler(e){
            if(e.keyCode == 37){
                this.leftPressed = false;
            } else if(e.keyCode == 39){
                this.rightPressed = false;
            }
        },
        collisionDetection() {
            for(var c=0; c<this.brickColumnCount; c++) {
                for(var r=0; r<this.brickRowCount; r++) {
                    var b = this.bricks[c][r];
                    if(b.status == true){
                        if(this.x > b.x && this.x < b.x+this.brickWidth && this.y > b.y && this.y < b.y+this.brickHeight) {
                            this.dy = -(this.dy);
                            b.status = false;
                            this.score++;
                            if(this.score == this.brickRowCount*this.brickColumnCount) {
                                alert("YOU WIN, CONGRATULATIONS!");
                            }
                        }
                    }
                }
            }
        },
        drawPaddle(){
            this.ctx.beginPath();
            this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
            this.ctx.fillStyle='#0095DD';
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawBall(){
            this.ctx.beginPath();
            this.ctx.arc(this.x,this.y,this.ballRadius,0, Math.PI*2, false);
            this.ctx.fillStyle = this.ballColor;
            this.ctx.fill();
            this.ctx.closePath();
        },
        draw(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBall();
            this.drawBricks();
            this.drawPaddle();
            this.drawScore();
            this.collisionDetection();
            if(this.y + this.dy < this.ballRadius){
                this.ballColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                this.dy = -(this.dy);
            } else if(this.y + this.dy > this.canvas.height - this.ballRadius){
                if(this.x > this.paddleX && this.x< this.paddleX+this.paddleWidth){
                    this.dy = -(this.dy);
                }else{
                    console.log(1);
                }
            }
            if(this.x + this.dx < this.ballRadius || this.x + this.dx > this.canvas.width - this.ballRadius){
                this.ballColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                this.dx = -(this.dx);
            }

            if(this.leftPressed && this.paddleX > 0){
                this.paddleX += -5;
            } else if(this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth){
                this.paddleX += 5;
            }

            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
        },
        startHandler(){
            if(!this.isFullScreen){
                var elem = document.getElementById("app");
                if (elem.requestFullscreen) {
                elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
                }
            }
            else{
                if (document.exitFullscreen) {
                document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
                }
            }
            this.isFullScreen = !this.isFullScreen;
            this.isStart = true;
        }
    }
}
</script>
