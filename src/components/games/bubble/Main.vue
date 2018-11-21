<template>
    <v-app>
        <canvas ref="viewport" style="width:100%; height:600px;"></canvas>
    </v-app>
</template>

<script>
export default {
    name: 'bubble',
    data(){
        return {
            p: null,
            ak: null,
            X: 0,
            z: 0,
            H: 0,
            C: 0,
            s: false,
            l: {
                x: 4,
                y: 83,
                width: 0,
                height: 0,
                columns: 15,
                rows: 14,
                tilewidth: 40,
                tileheight: 40,
                rowheight: 34,
                radius: 20,
                tiles: []
            }
        }
    },
    created(){
    },
    mounted(){
        this.p = this.$refs.viewport;
        this.ak = this.p.getContext("2d");
    }
}
</script>
