<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      <Header />
      <main class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">
          Enter YouTube Video URL
        </h2>
        <div class="w-full max-w-xl mb-8 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
          <p class="text-center text-gray-600 mb-4">
            Paste the YouTube video URL here
          </p>
          <input 
            type="text" 
            v-model="youtubeUrl" 
            placeholder="Enter YouTube URL" 
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
          />
          <button class="button" @click="summaryYouTube">
            Get Summary
          </button>
        </div>
        <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded">
          {{ message }}
        </div>
        <div v-if="summary" class="mt-4 p-4 rounded bg-gray-50 w-full max-w-xl">
          <h3 class="text-xl font-bold mb-2">Video Summary</h3>
          <p>{{ summary }}</p>
          <button class="button mt-4" @click="downloadMarkdown">
            Download Markdown
          </button>
        </div>
        <Chat 
          v-if="showChat" 
          :websocketUrl="'wss://pergamentai.onrender.com/ws'"
          class="w-full max-w-xl mt-8"
        />
      </main>
      <footer class="w-full bg-white border-t border-gray-300 py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chat from '../components/Chat.vue';
  import Header from '../components/Header.vue';
  
  export default {
    components: {
      Chat,
      Header
    },
    data() {
      return {
        youtubeUrl: '',
        message: '',
        messageClass: '',
        summary: '',
        showChat: false,
      };
    },
    methods: {
      isValidYouTubeUrl(url) {
        const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        return regex.test(url);
      },
      async summaryYouTube() {
        if (!this.youtubeUrl || !this.isValidYouTubeUrl(this.youtubeUrl)) {
          this.message = 'Please enter a valid YouTube URL.';
          this.messageClass = 'bg-red-500 text-white';
          return;
        }
  
        const formData = new URLSearchParams();
        formData.append('youtube_url', this.youtubeUrl);
  
        try {
          const response = await axios.post('https://pergamentai.onrender.com/process-youtube/', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
  
          if (response.status === 200) {
            this.summary = response.data.summary;
            this.message = 'Summary fetched successfully!';
            this.messageClass = 'bg-green-500 text-white';
            this.showChat = true;
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            this.message = 'Invalid YouTube URL. Please check the URL and try again.';
          } else {
            this.message = 'Failed to fetch summary. Please try again.';
          }
          this.messageClass = 'bg-red-500 text-white';
        }
      },
      async downloadMarkdown() {
        try {
          const response = await axios.get('https://pergamentai.onrender.com/download-markdown/', { responseType: 'blob' });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'summary.md');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          this.message = 'Failed to download Markdown. Please try again.';
          this.messageClass = 'bg-red-500 text-white';
        }
      }
    }
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
  </style>
  