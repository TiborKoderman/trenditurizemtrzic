<template>
    <transition>
        <a>
            {{ nbr }} €
        </a>
    </transition>
    </template>
    
    <script>
    export default {
        data() {
            return {
                nb: 0
            }
        },
        props: ['number'],
        mounted() {
            this.animateNumber()
        },
        methods: {
            animateNumber() {
                //make sure the animation starts from 0 and ends at the number
                //make sure the animation lasts exactly 1 second
                //make sure the animation is smooth
    
                this.nb = 0
                let step = this.number / 60
                let counter = 0
                let interval = setInterval(() => {
                    if(this.nb+step > this.number){
                        clearInterval(interval)
                        return this.nb = this.number
                    }
                    this.nb += step
                    counter++
                    if (counter >= 60) {
                        clearInterval(interval)
                        return this.nb = this.number
                    }
                }, 10)
            }
        },
        computed: {
            nbr() {
                if(this.nb == null)
                   return 0
                if(this.nb > 10000)
                   return Number(this.nb).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                else
                    return Number(this.nb).toFixed(0)
            }
        },
        watch: {
            number() {
                this.animateNumber()
            }
        }
    }
    </script>
    
    <style>
    
    </style>