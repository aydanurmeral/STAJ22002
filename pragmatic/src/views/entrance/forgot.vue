<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-150 to-blue-200 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <img src="../../assets/logo.jpeg" alt="Logo" class="w-24 h-24 mx-auto mb-4 animate-fadeIn" />
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">FORGOT PASSWORD</h2>
      <form @submit.prevent="handleReset" class="space-y-4">
        <input
          v-model="forgotPasswordForm.email"
          type="email"
          placeholder="Enter your email"
          class="w-full border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-medium transition duration-300 hover:bg-blue-600 hover:shadow-lg"
        >
          Reset Password
        </button>
      </form>
      <div v-if="showMessage" :class="['fixed left-1/2 transform -translate-x-1/2 top-10 p-2 rounded-md text-white z-50', notificationStyle]">
        <p>{{ errorMessage || successMessage }}</p>
      </div>
      <p class="text-center mt-4 text-gray-700 text-sm">
        Remember your password?
        <router-link
          to="/login"
          class="text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Log In
        </router-link>
      </p>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ForgotPasswordComponent',
  setup() {
    const store = useStore();
    const router = useRouter();

    const forgotPasswordForm = ref({ email: '' });
    const errorMessage = computed(() => store.getters.errorAlert);
    const successMessage = computed(() => store.getters.successAlert);
    const showMessage = computed(() => !!errorMessage.value || !!successMessage.value);

    const notificationStyle = computed(() => {
      return errorMessage.value
        ? 'bg-red-600'
        : 'bg-green-500';
    });

    const handleReset = () => {
      if (forgotPasswordForm.value.email) {
        store.dispatch('updateErrorMessage', '');
        store.dispatch('updateSuccessMessage', 'Password reset link sent to your email!');
        setTimeout(() => router.push('/login'), 1000);
      } else {
        store.dispatch('updateErrorMessage', 'Please enter your email address');
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
      forgotPasswordForm,
      errorMessage,
      successMessage,
      showMessage,
      notificationStyle,
      handleReset
    };
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}
</style>
