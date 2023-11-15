<template>
    <div class="cont">
        {{ obj }}
    </div>
    <svg></svg>
</template>

<script>
import * as d3 from "d3";

export default {
    name: 'HomeGraf',
    data() {
        return {
            apidata: null,
            obj: ""
        }
    },
    mounted() {
        this.getApiData();
    },
    methods: {
        getApiData() {
            //GET 
            //'https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100' 
            //return data
            fetch('https://trzic.musiclab.si/api/turisticnetakse?page=1&size=100')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.obj = data.results[0];
                console.log(this.obj);
            })
            .then(data => {return data;})
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