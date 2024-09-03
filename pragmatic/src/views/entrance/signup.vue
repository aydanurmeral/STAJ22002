<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-150 to-blue-200 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <img src="../../assets/logo.jpeg" class="mx-auto mb-4 w-24 h-24 animate-fadeIn" alt="Logo" />
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">SIGN UP</h2>
      <form @submit.prevent="signupUser" class="space-y-4">
        <div class="relative">
          <input
            v-model="signUpForm.fullName"
            type="text"
            placeholder="Name and Surname"
            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div class="relative">
          <input
            v-model="signUpForm.username"
            type="text"
            placeholder="Username"
            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
            autocomplete="off"
          />
        </div>
        <div class="relative">
          <input
            v-model="signUpForm.password"
            type="password"
            placeholder="Password"
            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div class="relative">
          <input
            v-model="signUpForm.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-medium transition duration-300 hover:bg-blue-600 hover:shadow-lg"
        >
          Sign Up
        </button>
      </form>
      <div v-if="showMessage" class="fixed left-1/2 transform -translate-x-1/2 top-10 bg-opacity-80 text-white px-4 py-2 rounded shadow-lg z-50" :class="{'bg-green-500': !errorMessage, 'bg-red-500': errorMessage}">
        <p>{{ errorMessage || successMessage }}</p>
      </div>
      <p class="text-center mt-4 text-gray-700 text-sm">
        Already have an account? 
        <router-link to="/login" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignUpComponent',
  setup() {
    const store = useStore();
    const router = useRouter();

    const signUpForm = ref({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
    });

    const errorMessage = computed(() => store.getters.errorAlert);
    const successMessage = computed(() => store.getters.successAlert);
    const showMessage = computed(() => !!errorMessage.value || !!successMessage.value);

    const signupUser = () => {
      if (signUpForm.value.password === signUpForm.value.confirmPassword) {
        store.dispatch('updateErrorMessage', '');
        store.dispatch('updateSuccessMessage', 'Sign Up successful!');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        store.dispatch('updateErrorMessage', 'Passwords do not match');
      }
    };

    watch([errorMessage, successMessage], () => {
      if (errorMessage.value || successMessage.value) {
        setTimeout(() => {
          store.dispatch('updateErrorMessage', '');
          store.dispatch('updateSuccessMessage', '');
        }, 2000);
      }
    });

    return {
      signUpForm,
      errorMessage,
      successMessage,
      showMessage,
      signupUser
    };
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}
</style>
