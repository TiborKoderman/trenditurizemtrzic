<template>
    <div class="cont">
        Mesec: {{obj.month}}  Leto: {{ obj.year }}<br>
        Skupaj noči: {{ obj.nights_total }}<br>
        davki skupaj: {{ obj.taxes_total }}<br>
        kapaciteta: {{ obj.capacity }}<br>
        zasedenost: {{ obj.occupancy }} %<br>
        <svg></svg>
    </div>
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
        },
        drawPercentOccupancy(percentage){
            //use d3
            var svg;
            


            return svg;
        }
    },
    computed:{
        monthName(number){
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
    // border : 1px solid gray;
    background-blend-mode:darken;
    opacity: 90%;
    color: white;
    font-weight: bolder;
    top: 5vh;
    left: 5vw;
    z-index: 999;
    margin:4rem;
    padding: 2rem;
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.9);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.374);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>