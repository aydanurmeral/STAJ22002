<template>
  <div class="mr-[8px] pr-8 pt-16 md:ml-[200px] sm:ml-0 mr-0">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <div class="relative border border-gray-300  bg-white overflow-hidden h-64 w-auto p-4 rounded-lg">
        <div class="absolute bg-gray-100 flex flex-col items-center w-16 h-16 p-2 rounded-md left-2 top-2">
          <div class="text-2xl mb-1">👥</div>
          <p class="text-xs">+16%</p>
          <div class="text-xs">↑</div>
        </div>
        <h3 class="absolute text-lg text-gray-800 left-20 top-0">Users</h3>
        <p class="absolute text-xl text-black right-20 top-16">4,523</p>
        <LineChart :data="[0, 1, 2, 3, 2, 3, 2, 1, 2, 3, 1, 1, 4, 2, 4, 2, 9]" class="w-full h-full" />
      </div>

      <div class="relative border border-gray-300  bg-white overflow-hidden h-64 w-auto p-4 rounded-lg">
        <div class="absolute bg-gray-100 flex flex-col items-center w-16 h-16 p-2 rounded-md left-2 top-2">
          <div class="text-2xl mb-1">👁️</div>
          <p class="text-xs mb-1">-11%</p>
          <div class="text-xs">↓</div>
        </div>
        <h3 class="absolute text-lg text-gray-800  top-0 left-20">Views</h3>
        <p class="absolute text-xl text-black right-20 top-16">2,523</p>
        <BarChart
          :labels="labels(20)"
          :data="randomData(20)"
          :showAxes="false"
          :yAxisMin="0"
          :yAxisMax="20"
          :colors="['#90EE90']"
          :barThickness="8"
          :useGradient="false"
          class="w-full h-full"
        />
      </div>

      <div class="relative border border-gray-300  bg-white overflow-hidden h-64 w-auto p-4 rounded-lg">
        <div class="absolute bg-gray-100 flex flex-col items-center w-16 h-16 p-2 rounded-md left-2 top-2">
          <div class="text-2xl mb-1 text-blue-500">🔄</div>
          <p class="text-xs mb-1">±1%</p>
          <div class="text-xs">→</div>
        </div>
        <h3 class="absolute text-lg text-gray-800 left-20 top-0">Conversions</h3>
        <p class="absolute text-xl text-black right-20 top-16">9,832</p>
        <LineChart :data="[1, 2, 1, 4, 5, 7, 6, 7, 8, 6, 8, 9, 10, 11, 12]" class="w-full h-full" />
      </div>


      <div class="relative border border-gray-300  bg-white overflow-hidden h-64 w-auto p-4 rounded-lg">
        <div class="absolute bg-gray-100 flex flex-col items-center w-16 h-16 p-2 rounded-md left-2 top-2">
          <div class="text-2xl mb-1 text-green-500">💰</div>
          <p class="text-xs mb-1">+0%</p>
          <div class="text-xs">→</div>
        </div>
        <h3 class="absolute text-lg text-gray-800 left-20 top-0">Revenue</h3>
        <p class="absolute text-xl text-black right-20 top-16">6,364</p>
        <BarChart
          :labels="labels(20)"
          :data="randomData(20)"
          :showAxes="false"
          :yAxisMin="0"
          :yAxisMax="30"
          :showLine="false"
          :colors="['#90EE90']"
          :barThickness="8"
          :useGradient="false"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from '../components/charts/Line.vue';
import BarChart from '../components/charts/Bar.vue';

export default defineComponent({
  name: 'CardsComponent',
  components: {
    LineChart,
    BarChart,
  },
  methods: {
    randomData(count: number): number[] {
      return Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);
    },
    labels(count: number): string[] {
      return Array.from({ length: count }, (_, i) => `Label ${i + 1}`);
    },
  },
});
</script>
