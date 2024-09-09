<template>
  <footer :class="['fixed bottom-0 left-10 right-0 bg-white text-gray-800 p-1 border-t border-gray-300 rounded-l-lg', { 'ml-8': isSidebarCollapsed, 'ml-50': !isSidebarCollapsed }]">
    <div class="flex justify-between items-center">
      <a href="#" @click.prevent class="text-blue-500 hover:underline cursor-pointer">Documentation</a>
      <div class="flex items-center">
        <span class="mr-2">Made with</span>
        <a href="#" @click.prevent class="text-blue-500 hover:underline mr-4 cursor-pointer">D*VERSE Studio</a>
        <button @click.prevent class="flex items-center bg-white text-blue-500 py-1 px-2 rounded border border-blue-500 hover:bg-gray-100 cursor-pointer">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" class="mr-2"/> Purchase Pragmatic
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'FooterPage',
  components: {
    FontAwesomeIcon
  },
  props: {
    isSidebarCollapsed: Boolean
  },
  created() {
    library.add(faShoppingCart);
  }
};
</script>

<style scoped>
@media (max-width: 767px) {
  footer {
    @apply w-auto h-auto ml-0 right-0;
  }
}
</style>
