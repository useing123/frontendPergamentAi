<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
    <Header />
    <main class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold mb-4">
        Discover Our Amazing Product
      </h2>
      <p class="text-center mb-8">
        Our product will change the way you work and bring unparalleled productivity to your business.
      </p>
      <CTAButton text="Get Started" @click="goToUpload" />
      <nuxt-link to="/upload" class="mt-4 text-blue-500 hover:underline">Upload PDF</nuxt-link>
    </main>
    <footer class="w-full bg-white border-t border-gray-300 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center">
          &copy; 2024 PergamentAI. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import CTAButton from '~/components/CTAButton.vue';
import Header from '../components/Header.vue';

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
/* Additional styles if needed */
</style>
