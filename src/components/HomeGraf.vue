<template>
    <div class="cont">
        {{ data }}
    </div>
</template>

<script>
import * as d3 from "d3";
// import { reactive, computed } from 'vue'
import ref from 'vue'
export default {
    setup () {

        const data = ref(getApiData());



        return {data}
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
    width: 50em;
    height: 35em;
    background-color: darkgray;
    border : 1px solid gray;
    border-radius: 40px;
}
</style>