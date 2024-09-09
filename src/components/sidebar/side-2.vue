<template>
  <li
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick">
    <div class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors">
      <i :class="`${localItem.icon} text-gray-600`"></i>
      <span v-if="!isSidebarCollapsed" class="ml-2 truncate text-sm">{{ localItem.name }}</span>
      <svg v-if="showArrow"
           class="w-3 h-3 ml-auto text-gray-500 transform transition-transform duration-300 ease-in-out"
           :class="{ 'rotate-180': localItem.showChildren }"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <ul v-if="localItem.showChildren"
        :class="[
          'fixed bg-white shadow-md z-[1001] overflow-visible',
          { 'block': localItem.showChildren, 'hidden': !localItem.showChildren },
          { 'left-[70px]': isSidebarCollapsed }
        ]"
        class="dropdown-menu">
      <li v-for="subItem in localItem.children" :key="subItem.name"
          class="px-2 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer text-sm">
        {{ subItem.name }}
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';

interface ChildItem {
  name: string;
  icon?: string;
}

interface MenuItem {
  name: string;
  icon: string;
  showChildren?: boolean;
  children?: ChildItem[];
}

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true
    },
    isSidebarCollapsed: {
      type: Boolean,
      required: true
    },
    toggleDropdown: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const localItem = ref({ ...props.item });
    let mouseLeaveTimeout: number | undefined;

    watch(() => props.item, (newItem) => {
      localItem.value = { ...newItem };
    }, { deep: true });

    const onMouseEnter = () => {
      if (props.isSidebarCollapsed) {
        if (mouseLeaveTimeout !== undefined) {
          clearTimeout(mouseLeaveTimeout);
        }
        localItem.value.showChildren = true;
      }
    };

    const onMouseLeave = () => {
      if (props.isSidebarCollapsed) {
        mouseLeaveTimeout = window.setTimeout(() => {
          localItem.value.showChildren = false;
        }, 500);
      }
    };

    const onClick = () => {
      if (!props.isSidebarCollapsed) {
        props.toggleDropdown();
      }
    };

    const showArrow = computed(() => {
      return localItem.value.children && localItem.value.children.length > 0 && !props.isSidebarCollapsed;
    });

    return {
      localItem,
      onMouseEnter,
      onMouseLeave,
      onClick,
      showArrow
    };
  }
});
</script>

<style scoped>
.sidebar-open .dropdown-menu {
  @apply relative;
}
</style>
