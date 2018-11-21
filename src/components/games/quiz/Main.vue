<template>
  <v-container grid-list-md align-content-center>
    <v-slide-y-transition mode="out-in" v-if="category != 'favorite'">
        <v-layout row wrap>
            <v-flex hidden-md-and-down lg2>
            </v-flex>
            <v-flex md12 lg8>
                <v-card>
                    <div>
                    <img src="https://i.ytimg.com/vi/7b7QaVjqTZ8/maxresdefault.jpg" style="width:100%" />
                    </div>

                    <div class="pa-4 text-lg-center">
                        <v-btn v-for="item in items.length" :key="item" fab dark small color="grey lighten-2"></v-btn>
                    </div>

                    <div class="pa-5 text-lg-center">
                        <v-btn fab dark small color="primary" @click="add('말')"><strong>말</strong></v-btn>
                        <v-btn fab dark small color="primary" @click="add('죽')">죽</v-btn>
                        <v-btn fab dark small color="primary" @click="add('거')">거</v-btn>
                        <v-btn fab dark small color="primary" @click="add('리')">리</v-btn>
                        <v-btn fab dark small color="primary" @click="add('잔')">잔</v-btn>
                        <v-btn fab dark small color="primary" @click="add('혹')">혹</v-btn>
                        <v-btn fab dark small color="primary" @click="add('사')">사</v-btn>
                    </div>


                </v-card>
                <!-- <div class="text-xs-center">
                    <v-progress-circular
                    :size="100"
                    color="pink lighten-2"
                    indeterminate
                    >Loading</v-progress-circular>
                </div> -->
            </v-flex>
            <v-flex hidden-md-and-down lg2>
            </v-flex>
        </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
    name: 'quiz-main',
    data(){
        return {
            items:[]
        }
    },
    created(){
        let t = {};
        t.id = 0;
        t.images = "https://i.ytimg.com/vi/7b7QaVjqTZ8/maxresdefault.jpg";
        t.length = 7;
        t.space = [4];
        t.answer = "말죽거리 잔혹사";
        this.items.push(t);
    },
    motuned(){
    },
    methods:{
        add(value){
            
        },
        remove(){

        }
    }
}
</script>