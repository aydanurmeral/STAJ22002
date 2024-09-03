<template>
  <header class="fixed top-0 left-0 w-full bg-gray-800 p-4 flex justify-between items-center z-50 h-16">
    <div>
      <div class=" text-white text-lg mb-3">
        <span class="font-bold">envato</span>
        <span class="ml-1">market</span>
      </div>
    </div>
    <button class="bg-green-600 text-white px-2 py-1 text-sm rounded-md mb-2">
      Buy Now
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent'
});
</script>
