<template>
   <div class="categ1" @click="toggle_d = !toggle_d; toggle_l = false">
        {{ drzava_izbrana ?? 'Država' }}
      </div>
      <div id="country_dropdown" class="dropdown" v-if="toggle_d">
        <a class="dropdownElement" id="country_element" @click="[(drzava_izbrana = null), toggle_drzava()]">
          Vse države
        </a>
        <a class="dropdownElement" id="country_element" v-for="drzava in getAllCountries" v-bind:key="drzava"
          @click="[(drzava_izbrana = drzava), toggle_drzava()]">
          {{ drzava }}
        </a>
      </div>
</template>

<script>
export default {
    data() {
        return {
            toggle_d: false,
            izbrana: null
        }
    },

    methods: {
        toggle_drzava() {
            this.toggle_d = !this.toggle_d;
            $this.$emit('drzava_izbrana', this.drzava_izbrana)
        }
    },
    props: {
        
    }
}
</script>

<style>

</style>