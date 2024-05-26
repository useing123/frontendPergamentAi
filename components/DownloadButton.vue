<template>
    <button
      class="button"
      @click="handleClick"
    >
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        default: 'Download Markdown'
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Consistent button styling */
  .button {
    background-color: #2b6cb0;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s ease-in-out;
  }
  
  .button:hover {
    background-color: #2c5282;
  }
  </style>
  