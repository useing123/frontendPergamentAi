<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <header class="w-full bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Upload PDF and Chat
        </h1>
      </div>
    </header>
    <main class="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-4">
        Upload your PDF file
      </h2>
      <form @submit.prevent="uploadPDF" class="w-full max-w-md mb-8">
        <div class="mb-4">
          <input 
            type="file" 
            @change="handleFileChange" 
            accept="application/pdf" 
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <button 
            type="submit" 
            :disabled="!file" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </form>
      <div v-if="message" :class="messageClass" class="mt-4 p-4 rounded">
        {{ message }}
      </div>
      <div v-if="showChat" class="mt-8 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Chat</h3>
        <div class="border p-4 rounded mb-4 h-64 overflow-y-auto bg-white" ref="chatContainer">
          <div v-for="(msg, index) in chatMessages" :key="index" class="mb-2">
            <span class="font-semibold">{{ msg.sender }}:</span> {{ msg.text }}
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="flex items-center">
          <input 
            type="text" 
            v-model="newMessage" 
            placeholder="Type a message" 
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none"
          />
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </form>
      </div>
      <button 
        v-if="showNotionButton" 
        @click="createNotionDoc" 
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Notion Document
      </button>
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
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      message: '',
      messageClass: '',
      chatMessages: [],
      newMessage: '',
      showChat: false,
      showNotionButton: false,
      websocket: null
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadPDF() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append('file', this.file);

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
          this.connectWebSocket();
        }
      } catch (error) {
        this.message = 'Upload failed. Please try again.';
        this.messageClass = 'bg-red-500 text-white';
      }
    },
    connectWebSocket() {
      this.websocket = new WebSocket('wss://pergamentai.onrender.com/ws');

      this.websocket.onmessage = (event) => {
        this.chatMessages.push({ sender: 'Server', text: event.data });
        this.scrollToBottom();
      };
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      this.chatMessages.push({ sender: 'You', text: this.newMessage });
      this.websocket.send(this.newMessage);
      this.newMessage = '';
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
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
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили, если нужно */
</style>
