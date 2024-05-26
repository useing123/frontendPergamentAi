<template>
  <header class="w-full bg-white border-b border-gray-300">
    <div
      class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <h1 class="text-3xl font-bold">
        <router-link to="/">PergamentAI</router-link>
      </h1>
      <div>
        <router-link to="/youtubesummary" class="button mr-2">
          Summary YouTube
        </router-link>
        <router-link to="/" class="button-pdf"> Summary PDF </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
/* Consistent button styling inspired by Notion */
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

a.button {
  text-decoration: none;
}
.button-pdf {
  background-color: #2c5282;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
}
.button-pdf:hover {
  background-color: #2c5280;
}
</style>
