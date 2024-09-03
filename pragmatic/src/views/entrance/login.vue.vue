<template>
  <div class="login flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-150 to-blue-200 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <img src="../../assets/logo.jpeg" alt="Logo" class="logo mx-auto mb-4 w-24 h-24 animate-fadeIn" />
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">LOG IN</h2>
      
      <form @submit.prevent="loginUser" class="space-y-4">
        <input 
          type="text" 
          v-model="loginForm.username" 
          placeholder="Username" 
          class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        <input 
          type="password" 
          v-model="loginForm.password" 
          placeholder="Password" 
          class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        
        <div class="flex justify-between items-center text-sm mb-4">
          <label for="rememberMe" class="flex items-center space-x-2 text-gray-700">
            <input 
              type="checkbox" 
              id="rememberMe" 
              v-model="loginForm.rememberMe" 
              class="form-checkbox text-blue-500"
            />
            <span>Remember Me</span>
          </label>
          <a 
            @click="forgotPassword" 
            class="text-blue-500 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
          >
            Forgot Password
          </a>
        </div>

        <button 
          type="submit" 
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-medium transition duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log In
        </button>

        <div class="flex items-center my-4">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-2 text-gray-600">or</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <div class="flex flex-col space-y-2">
          <button 
            @click="redirectTo('google')" 
            class="w-full px-4 py-2 bg-red-500 text-white rounded-md font-medium transition duration-300 hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log In With Google
          </button>
          <button 
            @click="redirectTo('facebook')" 
            class="w-full px-4 py-2 bg-blue-800 text-white rounded-md font-medium transition duration-300 hover:bg-blue-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            Log In With Facebook
          </button>
        </div>
      </form>

      <div v-if="showMessage" class="notification" :class="messageClass">
        <p>{{ notificationMessage }}</p>
      </div>
      
      <p class="text-center mt-4 text-gray-700 text-sm">
        Don't you have an account? 
        <router-link to="/signup" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; 

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const store = useStore(); 
    const showMessage = ref(false);
    const loginForm = ref({ username: '', password: '', rememberMe: false });

    const notificationMessage = computed(() => store.getters.errorAlert || store.getters.successAlert);
    const messageClass = computed(() => (store.getters.errorAlert ? 'error' : 'success'));

    const loginUser = async () => {
      if (loginForm.value.username && loginForm.value.password) {
        store.dispatch('updateErrorMessage', ''); 
        store.dispatch('updateSuccessMessage', 'Login successful!');
        setTimeout(() => router.push('/main'), 1000);
      } else {
        store.dispatch('updateErrorMessage', 'Please fill in all fields');
      }
    };

    const redirectTo = (platform: 'google' | 'facebook') => {
      const urls = {
        google: 'https://accounts.google.com/signin',
        facebook: 'https://www.facebook.com/login',
      };

      window.location.href = urls[platform];
    };

    const forgotPassword = () => {
      router.push('/forgot-password');
    };

    watch([() => store.getters.errorAlert, () => store.getters.successAlert], () => {
      if (notificationMessage.value) {
        showMessage.value = true;
        setTimeout(() => (showMessage.value = false), 2000);
      }
    });

    return {
      loginForm,
      showMessage,
      notificationMessage,
      messageClass,
      loginUser,
      redirectTo,
      forgotPassword,
    };
  },
});
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.logo { animation: fadeIn 1s ease-in-out; }

.notification {
  @apply fixed -translate-x-2/4 text-white z-[1000] px-5 py-2.5 rounded-[5px] left-2/4 top-2.5;
  background: rgba(0, 0, 0, 0.7);
}

.notification.success { background: rgba(121, 188, 121, 0.8); }
.notification.error { background: rgba(255, 0, 0, 0.8); }
</style>
