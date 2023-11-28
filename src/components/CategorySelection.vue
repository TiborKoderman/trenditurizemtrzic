<template>
  <div class="categorySelection">
    <Pill text="Vse" :isSelected="isCatSelected('all')" @click="selectCategory('all')"></Pill>
    <Pill v-for="category in categories" :key="category" :text="category" :isSelected="isCatSelected(category)" @click="selectCategory(category)"></Pill>
  </div>
</template>

<script>
import Pill from './Pill.vue';
export default {
    name: 'CategorySelection',
    data() {
        return {
            selected: "all",
        };
    },
    components: { Pill },
    props: {
        categories: Array,
    },
    methods: {

        selectCategory(category) {
            this.selected = category;
            // this.$emit('category-selected', category);
        }
    },
    computed: {
        isCatSelected() {
            return (category) => this.selected === category;
        }
    }
}
</script>

<style>
.categorySelection {
    display: block;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;
    height: 100px;
    padding: 0.5rem;
}
</style>