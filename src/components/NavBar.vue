<!-- Navbar.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/"><font-awesome-icon icon="fa-solid fa-house-chimney"/> </router-link></li>
        <li><router-link to="/correlation"><font-awesome-icon :icon="['fas', 'chart-bar']" /></router-link></li>
        <!-- <li><a href="/about">About</a></li> -->
      </ul>
    </nav>
  </template>
  
  <script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  // You can add any logic specific to the navbar component here
  </script>
  
  <style scoped>
  /* Navbar is on the left side*/
  nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3rem;
    background-color: #333;
    border-right: 1px solid #444;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 1rem 0;
  }

  nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
    justify-content: center;
  }

  nav li {
   margin-bottom: 1rem;
   display: flex;
   font-size: 1.5rem;
   color: #ffffff;
   /* border-bottom: 1px solid #444; */
   width: 100%;
   height: 100%;
   text-align: center;
  }

  router-link {
    color: #ffffff;
    text-decoration: none;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  a {
    color: #666;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }

  a:hover {
    background-color: #444;
    height: 100%;
  }

  .router-link-active {
    color: #fff;
    height: 100%;
  }

  font-awesome-icon {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    color: inherit;
    text-align: center;
  }


  
  </style>
  