<template>
  <div class="categoryContainer">
    <div class="categorySelection" ref="categorySelection">
      <horizontal-scroll>
        <Pill text="Vse" :isSelected="isCatSelected('all')" @click="selectCategory('all')"></Pill>
        <Pill
          v-for="category in categories"
          :key="category"
          :text="category"
          :isSelected="isCatSelected(category)"
          @click="selectCategory(category)"
        ></Pill>

      </horizontal-scroll>
      <!-- <div class="navArrow" @click="scrollCategories('left')">❮</div> -->
      <!-- <div class="navArrow" @click="scrollCategories('right')">❯</div> -->
    </div>
  </div>
</template>

<script>
import Pill from './Pill.vue'
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'
export default {
  name: 'CategorySelection',
  data() {
    return {
      selected: 'all',
      visibleCategories: [],
      currentPage: 1,
      categoriesPerPage: 5
    }
  },
  components: { Pill, HorizontalScroll },
  props: {
    categories: Array
  },
  methods: {
    selectCategory(category) {
      this.selected = category
      this.$emit('category-selected', category);
    },
    scrollCategories(direction) {
      const maxPage = Math.ceil(this.categories.length / this.categoriesPerPage);
      if (direction === 'left') {
        this.currentPage = Math.max(1, this.currentPage - 1);
      } else if (direction === 'right') {
        this.currentPage = Math.min(maxPage, this.currentPage + 1);
      }
      this.updateVisibleCategories();
    },
    updateVisibleCategories() {
      const startIdx = (this.currentPage - 1) * this.categoriesPerPage;
      const endIdx = startIdx + this.categoriesPerPage;
      this.visibleCategories = this.categories.slice(startIdx, endIdx);
    }
  },
  watch: {
    categories: {
      immediate: true,
      handler() {
        this.updateVisibleCategories();
      }
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
.categoryContainer {
  position: absolute;
  top: 0;
  width: 50vw;
  z-index: 999;

  text-align: center;
}
.categorySelection {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 0.5rem;
  padding: 0.5rem;
  position: relative;
  justify-content: center;
}
.navArrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
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