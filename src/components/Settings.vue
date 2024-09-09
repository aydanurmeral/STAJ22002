<template>
  <div class="fixed right-0 top-1/2 hidden md:block">
    <div class="w-12 h-12 bg-white rounded-full overflow-hidden relative transition-all duration-300 ease-in-out clip-half hover:clip-full flex items-center justify-center">
      <i class="fa fa-cog text-gray-300 text-2xl animate-spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage'
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .clip-half {
    clip-path: inset(0 50% 0 0);
  }
  .clip-full {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
