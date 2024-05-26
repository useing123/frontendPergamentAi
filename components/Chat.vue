<template>
  <div class="mt-8 w-full max-w-md">
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
</template>

<script>
export default {
  props: {
    websocketUrl: String
  },
  data() {
    return {
      chatMessages: [],
      newMessage: '',
      websocket: null
    };
  },
  methods: {
    connectWebSocket() {
      this.websocket = new WebSocket(this.websocketUrl);

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
    }
  },
  mounted() {
    this.connectWebSocket();
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
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
