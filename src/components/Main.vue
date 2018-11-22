<template>
  <v-container grid-list-md>
    <v-slide-y-transition mode="out-in" v-if="category != 'favorite'">
        <v-layout row wrap>
            <v-flex xs12 xl8 offset-xl2>
                <v-layout row wrap>
                    <v-carousel height="400" :hide-delimiters=true>
                        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.thumb" :lazy=true v-if="item.is_header">
                            <a :href="`${item.link}/A-G5H37`" target="_blank">
                                <div class="v-carousel__controls">
                                    <div class="white--text display-1">
                                        {{item.name}}
                                    </div>
                                </div>
                            </a>
                        </v-carousel-item>
                    </v-carousel>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-slide-y-transition>
    <v-slide-y-transition mode="out-in" v-if="category != 'favorite'">
        <v-layout row wrap>
            <v-flex xs12 xl8 offset-xl2>
                <Adsense 
     data-ad-client="ca-pub-1963334904140891"
     data-ad-slot="5276553934"
     data-ad-format="auto"
     data-full-width-responsive="true">
                </Adsense>
            </v-flex>
        </v-layout>
    </v-slide-y-transition>
    <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
            <v-flex v-for="(item, index) in items" v-if="index <= 3" :key="item.package_id" xs6 sm3 md3 lg3 xl2 :class="{'offset-xl2': index% 4 ==0}">
                <v-card>
                    <a :href="`${item.link}/A-G5H37`" target="_blank">
                        <v-img :src="item.thumb_180">
                            <div class="v-carousel__controls">
                                <div class="white--text title">
                                    {{item.name}}
                                    <v-btn absolute :color="fIcon[item.package_id]" dark fab small right top @click.prevent="favorite(item.package_id)">
                                        <v-icon>favorite</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-img>
                    </a>
                </v-card>
            </v-flex>
            <v-flex xs12 xl8 offset-xl2>
                <Adsense 
                    data-ad-client="ca-pub-1963334904140891"
                    data-ad-slot="5276553934"
                    data-ad-format="auto"
                    data-full-width-responsive="true">
                </Adsense>
            </v-flex>
            <v-flex v-for="(item, index) in items" v-if="index > 3" :key="item.package_id" xs6 sm3 md3 lg3 xl2 :class="{'offset-xl2': index% 4 ==0}">
                <v-card>
                    <a :href="`${item.link}/A-G5H37`" target="_blank">
                        <v-img :src="item.thumb_180">
                            <div class="v-carousel__controls">
                                <div class="white--text title">
                                    {{item.name}}
                                    <v-btn absolute :color="fIcon[item.package_id]" dark fab small right top @click.prevent="favorite(item.package_id)">
                                        <v-icon>favorite</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </v-img>
                    </a>
                </v-card>
            </v-flex>
        </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import dataCategories from '../assets/json/categories.json'
import dataGames from '../assets/json/games.json'
export default {
    name: 'Main',
    props:['category'],
    data(){
        return{
            items:[],
            categories:[],
            favorites:[],
            fIcon:[]
        }
    },
    methods:{
        favorite(id){
            if(this.favorites.indexOf(id) === -1){
                this.favorites.push(id);
                this.$set(this.fIcon, id, 'green');
            } else {
                let index = this.favorites.indexOf(id);
                this.favorites.splice(index, 1);
                this.$set(this.fIcon, id, 'orange');
            }
            localStorage.favorites = this.favorites.join(",");
            this.register();
        },
        register(){
            if(localStorage.favorites !== undefined){
                this.favorites = localStorage.favorites.split(",");
            }
            this.vCategory = this.category === undefined ? 'best' : this.category;
            var lists = dataGames.games;
            var cList = dataCategories.categories;
            var categories =  new Array(cList.length);
            for(let i in cList){
                categories[cList[i].category] = [];
            }
            for(var i in lists){
                let ctr = lists[i].categories;
                for(var j in ctr){
                    var package_id = lists[i].package_id;
                    categories[ctr[j]].push(lists[i]);
                    if(this.favorites.indexOf(lists[i].package_id) !== -1){
                        if(this.isRegister(categories['favorite'], package_id)){
                            continue;
                        }
                        categories['favorite'].push(lists[i]);
                        this.$set(this.fIcon, package_id, 'green');
                    } else {
                        this.$set(this.fIcon, package_id, 'orange');
                    }
                }
            }
            this.categories = categories;
        },
        isRegister(obj, package_id){
            for(let k in obj){
                if(obj[k].package_id === package_id){
                    return true;
                }
            }
            return false;
        }
    },
    created(){
        this.register();
    },
    mounted(){
        this.items = this.categories[this.category];
    },
    watch:{
        category(value){
            this.items = this.categories[value];
        }
    }
}
</script>