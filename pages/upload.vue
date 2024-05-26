<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
    <Header />
    <main class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">
        Upload your PDF file
      </h2>
      <div 
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="['w-full max-w-xl mb-8 border-2 border-dashed rounded-lg p-6', isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50']"
        class="flex flex-col items-center justify-center"
      >
        <p class="text-center text-gray-600 mb-4">
          Drag and drop your PDF here, or click to select a file
        </p>
        <input 
          type="file" 
          @change="handleFileChange" 
          accept="application/pdf" 
          class="hidden" 
          ref="fileInput"
        />
        <button 
          class="button" 
          @click="triggerFileInput"
        >
          Choose File
        </button>
      </div>
      <div v-if="file" class="mb-4 text-gray-700">
        Selected file: {{ file.name }}
      </div>
      <div class="mb-4">
        <button 
          type="button" 
          :disabled="!file" 
          class="button"
          @click="uploadPDF"
        >
          Upload
        </button>
      </div>
      <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded">
        {{ message }}
      </div>
      <div v-if="uploading" class="text-blue-500 mt-4">Uploading...</div>
      <Chat 
        v-if="showChat" 
        :websocketUrl="'wss://pergamentai.onrender.com/ws'"
        class="w-full max-w-xl mt-8"
      />
      <button 
        v-if="showNotionButton" 
        @click="createNotionDoc" 
        class="button mt-4"
      >
        Create Notion Document
      </button>
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
      file: null,
      message: '',
      messageClass: '',
      showChat: false,
      showNotionButton: false,
      uploading: false,
      isDragging: false,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onDragOver() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDrop(event) {
      const files = event.dataTransfer.files;
      if (files.length) {
        this.file = files[0];
      }
      this.isDragging = false;
    },
    async uploadPDF() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append('file', this.file);

      this.uploading = true;

      try {
        const response = await axios.post('https://pergamentai.onrender.com/process-pdf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          this.message = 'Upload successful!';
          this.messageClass = 'bg-green-500 text-white';
          this.showChat = true;
          this.showNotionButton = true;
        }
      } catch (error) {
        this.message = 'Upload failed. Please try again.';
        this.messageClass = 'bg-red-500 text-white';
      } finally {
        this.uploading = false;
      }
    },
    async createNotionDoc() {
      try {
        const response = await axios.post('https://pergamentai.onrender.com/send-to-notion');
        if (response.status === 200) {
          this.message = 'Notion document created successfully!';
          this.messageClass = 'bg-green-500 text-white';
        }
      } catch (error) {
        this.message = 'Failed to create Notion document. Please try again.';
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
