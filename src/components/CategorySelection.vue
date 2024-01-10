<template>
  <div class="categoryContainer">
    <div class="categorySelection" ref="categorySelection" >
      <Pill text="Vse" :isSelected="isCatSelected('all')" @click="selectCategory('all')" @scroll="scrollHorizontally"></Pill>
      <Pill
        v-for="category in categories"
        :key="category"
        :text="category"
        :isSelected="isCatSelected(category)"
        @click="selectCategory(category)"
      ></Pill>
    </div>
  </div>
</template>

<script>
import Pill from './Pill.vue'
export default {
  name: 'CategorySelection',
  data() {
    return {
      selected: 'all',
      visibleCategories: [],
      currentPage: 1,
      categoriesPerPage: 2
    }
  },
  components: { Pill },
  props: {
    categories: Array
  },
  methods: {
    selectCategory(category) {
      this.selected = category
      this.$emit('category-selected', category);
    },
  },

  watch: {
  },

  computed: {
    isCatSelected() {
      return (category) => this.selected === category;
    }
  },

  scrollHorizontally(event) {
      console.log(event)
    }
}
</script>

<style>
.categoryContainer {
  position: absolute;
  top: -7vh;
  left: 0vw;
  width: 50em;
  height: 50px;;
  z-index: 999;
  text-align: center;
  overflow: auto;
}

.categorySelection {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.0);
  position: relative;
  scroll-behavior: smooth;
}

.navArrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  padding: 5px;
  cursor: pointer;
  color: white;
}
.navArrow:hover {
  color: #e0e0e0;
}
.navArrow:first-child {
  left: 0;
}
.navArrow:last-child {
  right: 0;
}
</style>