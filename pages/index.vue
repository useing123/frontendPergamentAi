<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <header class="w-full bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Welcome to Our Landing Page
        </h1>
      </div>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-4">
        Discover Our Amazing Product
      </h2>
      <p class="text-center text-gray-600 mb-8">
        Our product will change the way you work and bring unparalleled productivity to your business.
      </p>
      <CTAButton text="Get Started" @click="goToUpload"/>
      <nuxt-link to="/upload" class="mt-4 text-blue-500 hover:underline">Upload PDF</nuxt-link>
    </main>
    <footer class="w-full bg-white shadow py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import CTAButton from '~/components/CTAButton.vue';

export default {
  components: {
    CTAButton,
  },
  methods: {
    goToUpload() {
      this.$router.push('/upload');
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили, если нужно */
</style>
