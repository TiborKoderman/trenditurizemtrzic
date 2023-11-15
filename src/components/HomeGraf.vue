<template>
    <div class="cont">
        {{ apidata }}
    </div>
</template>

<script>
import * as d3 from "d3";

export default {
    name: 'HomeGraf',
    data() {
        return {
            apidata: null
        }
    },
    mounted() {
        this.apidata = this.getApiData();

        console.log(this.apidata);

    },
    methods: {
        getApiData() {
            //GET 
            //'https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100' 
            //return data
            fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }
}

function getApiData() {
    //GET 
    //'https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100' 
    //return data
    fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
    .then(response => response.json())
    .then(data => console.log(data));
}



</script>

<style lang="scss" scoped>
.cont {
    position: absolute;
    width: 50em;
    height: 35em;
    background-color: darkgray;
    border : 1px solid gray;
    border-radius: 40px;
    top: 5vh;
    left: 5vw;
    z-index: 999;
}
</style>