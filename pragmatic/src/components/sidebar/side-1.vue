
<template>
  <div :class="['sidebar fixed h-[calc(100vh_-_100px)] bg-[white] z-[1000] overflow-auto left-0 top-[100px]', { 'w-16 sidebar-collapsed': isSidebarCollapsed, 'sidebar-open': !isSidebarCollapsed }]">
    <nav v-show="isSidebarOpen" class="overflow-x-hidden ml-2 relative">

      <ul>
        <li class="text-gray-600 text-sm px-4 py-2">Apps</li>
        <ul>
          <Item
            v-for="(item, index) in menuData.apps"
            :key="item.name"
            :item="item"
            :isSidebarCollapsed="isSidebarCollapsed"
            :toggleDropdown="() => toggleDropdown('apps', index)"
          />
        </ul>
        
      
        <li class="text-gray-600 text-sm px-4 py-2">UI</li>
        <ul>
          <Item
            v-for="(item, index) in menuData.ui"
            :key="item.name"
            :item="item"
            :isSidebarCollapsed="isSidebarCollapsed"
            :toggleDropdown="() => toggleDropdown('ui', index)"
          />
        </ul>
        
    
        <li class="text-gray-600  text-sm px-4 py-2">Components</li>
        <ul>
          <Item
            v-for="(item, index) in menuData.components"
            :key="item.name"
            :item="item"
            :isSidebarCollapsed="isSidebarCollapsed"
            :toggleDropdown="() => toggleDropdown('components', index)"
          />
        </ul>
        
        
        <li class="text-gray-600 text-sm px-4 py-4">Pages</li>
        <ul>
          <Item
            v-for="(item, index) in menuData.pages"
            :key="item.name"
            :item="item"
            :isSidebarCollapsed="isSidebarCollapsed"
            :toggleDropdown="() => toggleDropdown('pages', index)"
          />
        </ul>
        
       
        <div class="flex justify-center mb-4">
          <button @click="toggleCollapse" class="bg-gray-700 text-white rounded-md p-2 w-8 h-8 ">
            <svg v-if="isSidebarCollapsed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </ul>
      </nav>
    </div>
    <button class="bar" @click="toggleCollapse">
      <font-awesome-icon :icon="['fas', 'bars']" class=" lg:hidden text-gray-500 hover:text-blue-500 cursor-pointer" />
    </button>
  </template>

  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import Item from '../../components/sidebar/side-2.vue';
  import Data from '../../store/side';

  export default defineComponent({
    name: 'SidebarComponent', 
    components: { Item },
    props: {
      isSidebarCollapsed: {
        type: Boolean as PropType<boolean>,
        default: false
      }
    },

    data() {
      return {
        isSidebarOpen: true,
        menuData: Data,
        openDropdown: { menuType: '', index: -1 }
      };
    },
    methods: {
      toggleCollapse() {
        this.$emit('sidebar-toggle', !this.isSidebarCollapsed);
      },
      toggleDropdown(menuType: 'apps' | 'ui' | 'components' | 'pages', index: number) {
        if (this.openDropdown.menuType !== menuType || this.openDropdown.index !== index) {
          this.closeAllDropdowns();
        }

        const menu = this.menuData[menuType];
        if (menu[index]) {
          menu[index].showChildren = !menu[index].showChildren;
          this.openDropdown = menu[index].showChildren ? { menuType, index } : { menuType: '', index: -1 };
        }
      },
      closeAllDropdowns() {
        const menuTypes: (keyof typeof this.menuData)[] = ['apps', 'ui', 'components', 'pages'];
        for (const menuType of menuTypes) {
          const menu = this.menuData[menuType];
          for (const item of menu) {
            item.showChildren = false;
          }
        }
        this.openDropdown = { menuType: '', index: -1 };
      }
    }
  });
  </script>
  
  <style scoped>
@media (max-width: 767px) {
  .sidebar {
    @apply hidden;
  }
  .bar {
    @apply flex z-[1002] cursor-pointer fixed ml-2.5 mt-[70px];
  }
}
</style>