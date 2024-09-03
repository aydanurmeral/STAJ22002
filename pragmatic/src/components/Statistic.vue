<template>
  <div class="statistic bg-blue-400 lg:ml-52 text-white p-5 rounded-lg mx-auto max-w-[1200px] h-[500px] relative top-5 sm:w-auto ml-[0px] mr-4 mt-10 h-auto max-w-full">
    <div class="flex flex-col h-full justify-between">
      <header class="text-2xl m-0">
        <h2>Statistics</h2>
        <p class="text-base text-gray-300 mt-2">Revenue</p>
      </header>
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="w-full h-[300px] flex items-center justify-center">
          <BarChart
            :labels="chartLabels"
            :data="chartData"
            :borderColor="borderColor"
            :pointBackgroundColor="pointBackgroundColor"
            :backgroundColor="backgroundColor"
            :showAxes="showAxes"
            :yAxisMin="yAxisMin"
            :yAxisMax="yAxisMax"
            :duration="duration"
            :showLine="showLine"
            :borderRadius="borderRadius"
            :lineColor="lineColor"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarChart from '../components/charts/Bar.vue';

export default defineComponent({
  name: 'StatisticsComponent',
  components: {
    BarChart
  },
  data() {
    return {
      chartLabels: ['2024-8-9', '2024-8-10', '2024-8-11', '2024-8-12', '2024-8-13', '2024-8-14'],
      chartData: [200, 100, 150, 50, 143, 21],
      borderColor: 'white',
      pointBackgroundColor: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      showAxes: true,
      yAxisMin: 0,
      yAxisMax: 300,
      showLine: true,
      duration:1000,
      borderRadius: 15,
      lineColor: '#000000'
    };
  },
  methods: {
    beforeEnter(el: Element) {
      (el as HTMLElement).style.opacity = '0';
    },
    enter(el: Element, done: () => void) {
      (el as HTMLElement).style.opacity = '1';
      done();
    },
    leave(el: Element, done: () => void) {
      (el as HTMLElement).style.opacity = '0';
      done();
    }
  }
});
</script>
<style scoped>
@media (min-width: 768px) and (max-width: 1023px){
.statistic{
@apply ml-50;
}
}
</style>