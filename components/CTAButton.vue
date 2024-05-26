<template>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        default: 'Get Started'
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
  /* Дополнительные стили, если нужно */
  </style>
  