<template>
  <div class="bg-gray-200 fixed top-12 left-0 w-full z-50">
    <div class="md:px-6 lg:px-8 relative flex h-14 items-center justify-between">
      <div class="flex items-center space-x-2 ml-0">
        <img
          src="@/assets/logo.jpeg"
          alt="Logo"
          class="h-6 w-6 md:h-8 md:w-8 ml-6 sm:ml-8"
        />
        <span class="text-xl font-bold hidden md:inline">Pragmatic</span>
      </div>

      <div class="relative hidden md:flex md:w-[350px] md:ml-16 md:mr-auto search-container">
        <input
          type="text"
          v-model="input"
          placeholder="Search..."
          class="w-full pl-8 bg-transparent focus:outline-none"
          @focus="showSearchDropdown = true"
        />
        <i class="fa-solid fa-search absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        <div v-if="filteredSuggestions.length && showSearchDropdown" class="absolute mt-1 bg-white max-h-50 top-full overflow-y-auto">
          <ul>
            <li
              v-for="(item, index) in filteredSuggestions"
              :key="index"
              class="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <span class="text-blue-400">{{ item.suggestion }}</span>
              <span class="text-gray-300 text-sm">{{ item.path }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="relative flex items-center space-x-4 md:space-x-4">
        <div class="relative country-flag-container">
          <img
            :src="selectedFlag"
            alt="Country Flag"
            class="h-6 w-6 rounded-full cursor-pointer"
            @click="toggleDropdown"
          />
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-32 bg-white rounded-md">
            <div
              v-for="(flag, country) in countries"
              :key="country"
              class="flex items-center p-2 hover:bg-gray-200 cursor-pointer space-x-2"
              @click="selectCountry(country)"
            >
              <img :src="flag" alt="Country Flag" class="h-4 w-4 rounded-full" />
              <span class="text-base">{{ country }}</span>
            </div>
          </div>
        </div>

        <!-- Additional Actions -->
        <button type="button" class="relative p-1 text-gray-400 hover:text-blue-500">
          <i class="fa-solid fa-compress"></i>
        </button>
        <button type="button" class="relative p-1 text-gray-400 hover:text-blue-500">
          <BellIcon class="h-5 w-5"/>
        </button>
        <span class="cursor-pointer hover:text-blue-500">Aurora Shenton</span>
        <div class="relative profile-photo-container">
          <img
            :src="profilePhotoSrc"
            alt="Profile Photo"
            class="h-8 w-8 rounded-full cursor-pointer"
            @click="handleProfileDropdown"
          />
          <div v-if="showProfileDropdown" class="absolute right-0 mt-2 w-40 bg-white border rounded-md">
            <a href="#" class="block px-3 py-2 hover:bg-gray-100">Profile</a>
            <a href="#" class="block px-3 py-2 hover:bg-gray-100">Calendar</a>
            <a href="#" class="block px-3 py-2 hover:bg-gray-100">Contacts</a>
            <div class="border-t border-gray-200 my-1"></div>
            <a href="#" class="block px-3 py-2 hover:bg-gray-100">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import americaFlag from '@/assets/bayrak/Abd.jpeg'
import italyFlag from '@/assets/bayrak/İtalya.jpeg'
import franceFlag from '@/assets/bayrak/Fransa.jpeg'
import spainFlag from '@/assets/bayrak/İspanya.jpeg'
import chinaFlag from '@/assets/bayrak/Çin.jpeg'
import germanyFlag from '@/assets/bayrak/Almanya.jpeg'
import japanFlag from '@/assets/bayrak/Japonya.jpeg'
import profilePhotoSrc from '@/assets/foto.jpeg'
import menuData from '../store/side'

interface MenuItem {
  name: string
  icon?: string
  showChildren?: boolean
  children?: Array<MenuItem>
}

interface MenuData {
  apps: Array<MenuItem>
  ui: Array<MenuItem>
  components: Array<MenuItem>
  pages: Array<MenuItem>
}

const input = ref<string>('')
const suggestions = ref<{ suggestion: string, path: string }[]>([])

const searchSuggestions = () => {
  const getChildren = (items: MenuItem[], path: string): { suggestion: string, path: string }[] => {
    return items.flatMap(item =>
      item.children
        ? getChildren(item.children, `${path} > ${item.name}`)
        : [{ suggestion: item.name, path }]
    )
  }

  suggestions.value = [
    ...getChildren(menuData.apps, 'apps'),
    ...getChildren(menuData.ui, 'ui'),
    ...getChildren(menuData.components, 'components'),
    ...getChildren(menuData.pages, 'pages')
  ]
}

searchSuggestions()

const filteredSuggestions = computed(() =>
  input.value
    ? suggestions.value.filter(item =>
        item.suggestion.toLowerCase().includes(input.value.toLowerCase())
      )
    : []
)

const showDropdown = ref(false)
const showSearchDropdown = ref(false)
const selectedCountry = ref<string>('USA')
const countries = {
  USA: americaFlag,
  Italy: italyFlag,
  France: franceFlag,
  Spain: spainFlag,
  China: chinaFlag,
  Germany: germanyFlag,
  Japan: japanFlag,
}
const selectedFlag = computed(() => countries[selectedCountry.value])

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectCountry = (country: string) => {
  selectedCountry.value = country
  showDropdown.value = false
}

const showProfileDropdown = ref(false)

const handleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (
    !target.closest('.country-flag-container') &&
    !target.closest('.profile-photo-container') &&
    !target.closest('.search-container')
  ) {
    showDropdown.value = false
    showProfileDropdown.value = false
    showSearchDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>
