<template>
    <v-container>
        <v-toolbar app color="green lighten-2">
            <img class="ml-2" src="/static/img/1to50.png" height='32'>
            <v-spacer></v-spacer>

            <v-btn dark icon @click="startHandler">
                <v-icon>fullscreen</v-icon>
            </v-btn>
          <v-menu bottom left>
            <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile @click="setBlock(1)">
                    <v-list-tile-title>4 X 4</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="setBlock(2)">
                    <v-list-tile-title>5 X 5</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="setBlock(3)">
                    <v-list-tile-title>6 X 6</v-list-tile-title>
                </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-layout wrap text-xs-center>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                
                <v-card>
                    <v-layout row wrap pa-3 mb-4>
                        <v-flex xs6 text-xs-left style="border-right: 1px solid #ddd;">
                            <h2 class="green--text darken-2">{{score}}</h2>
                        </v-flex> 
                        <v-flex xs6 text-xs-right>
                            <h2 >{{num}}</h2>
                        </v-flex> 
                    </v-layout>
                </v-card>
                <v-card>
                    <v-layout row wrap pa-2>
                        <v-flex v-for="(value, index) in data" :key="index" class="tile text-xs-center" :class="{'zoom-wrap' : isZoom[index], 'xs3' : block == 1, 'custom-xs5' : block == 2, 'xs2': block == 3}" @click="clickHandler(index, value)">
                            <v-card flat tile class="tile-number" :class="{'zoom' : isZoom[index]}" :style="{height:height+'px'}">
                                {{value}}
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
                    <!-- <Adsense 
        data-ad-client="ca-pub-1963334904140891"
        data-ad-slot="5276553934"
        data-ad-format="auto"
        data-full-width-responsive="true">
                    </Adsense> -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style>
.tile{
    background: #81c784!important;
    border: 1px solid #eee;
    cursor:pointer;
}
.tile-number {
    background: #81c784!important;
    color:white!important;
    font-size:32px;
    font-weight: bold;
}

.zoom-wrap {
    opacity:0.68;
}
.zoom {
    transition: transform .4s;
    -ms-transform: scale(0); /* IE 9 */
    -webkit-transform: scale(0); /* Safari 3-8 */
    transform: scale(0);
}
.flex.custom-xs5 {
    flex-basis: 20%;
    flex-grow: 0;
    max-width: 20%;
}
</style>

<script>

export default {
    name: 'oneToFifty',
    data(){
        return{
            isFullScreen: false,
            isStart: false,
            title: '1 TO 50',
            block:1,
            num:1,
            data:[],
            isZoom:[],
            minimum: 1,
            maximum: 16,
            final: 50,
            height:0,
            score:'0.000'
        }
    },
    created(){
        this.init();
    },
    mounted(){
        this.$nextTick(function(){
            window.addEventListener ('resize', this.handleResize);
            this.handleResize();
        })
    },
    watch:{
        maximum(){
            this.init();

            const self = this;
            setTimeout(function(){
                var tiles = document.querySelectorAll('.tile-number');
                for(let tile of tiles){
                    tile.style.height = tile.clientWidth+'px';
                    self.height = tile.clientWidth;
                    tile.style.paddingTop = self.height / 2 - 20 + 'px';
                }
            },10);
        }
    },
    methods:{
        init(){
            var i = 0;
            this.data = [];
            this.isZoom = [];
            while(i<this.maximum){
                let randomNumber = this.getRandomIntInclusive(this.minimum, this.maximum);
                if(!this.include(this.data, randomNumber)){
                    this.data[i] = randomNumber;
                    this.isZoom[i] = false;
                    i++;
                }
            }
        },
        setBlock(value){
            this.block = value;
            this.num = 1;
            this.score = '0.000';
            clearTimeout(this.interval);
            if(value === 1){
                this.maximum = 16;
            } else if(value === 2){
                this.maximum = 25;
            } else if(value === 3){
                this.maximum = 36;
            }
        },
        zoomOut(index){
            var isZoom = this.isZoom,
                maximum = this.maximum,
                num = this.num,
                final = this.final,
                data = this.data,
                interval = this.interval;
            return function(){
                if(maximum+num > final){
                    Vue.set(data, index, '');
                }else{
                    Vue.set(data, index, maximum+num);
                }
                Vue.set(isZoom, index, false);
                
                if(num == final){
                    clearTimeout(interval);
                    alert('Congratulations');
                }
            };
        },
        setScore(){
            const self = this;
            var startScore = (new Date()).getTime();
            this.interval = setInterval(function(){
                let nowScore = (new Date()).getTime();
                self.score = (nowScore - startScore)/1000;
            }, 10);
        },
        clickHandler: function(index, value){
            if(value == this.num){
                if(value == 1){
                    this.setScore();
                }
                Vue.set(this.isZoom, index, true);
                setTimeout(this.zoomOut(index),150);
                this.num++;
            }
        },
        getRandomIntInclusive(min, max) {
           return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        include(arr, value) {
            for(var i=0; i<arr.length; i++) {
                if (arr[i] == value) return true;
            }
            return false;
        },
        handleResize(e){
            var tiles = document.querySelectorAll('.tile-number');
            for(let tile of tiles){
                tile.style.height = tile.clientWidth+'px';
                this.height = tile.clientWidth;
                tile.style.paddingTop = this.height / 2 - 20 + 'px';
            }
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
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}

</script>