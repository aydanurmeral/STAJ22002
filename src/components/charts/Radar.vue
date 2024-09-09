<template>
  <div class="radar-container bg-black w-[350px] h-[380px] mt-[-630px] ml-[1050px] p-5 rounded-[10px] ">
    <RadarChart :data="currentData" :options="options"/>
    <div class="mt-4 flex items-center justify-center w-full">
      <div v-for="(dataset, index) in datasets" :key="index">
        <button
          @click="changeData(index)"
          :style="{ backgroundColor: dataset.backgroundColor }"
          class="w-10 h-4 rounded-lg text-white font-medium"
        ></button>
        <span class="text-white ml-2">{{ dataset.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, LineElement,  } from 'chart.js';
import { data1, data2 } from '../../store/radar'; // Veri dosyasından veri import

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, LineElement);

export default defineComponent({
  name: 'RadarChartComponent',
  components: { RadarChart: Radar },
  setup() {
    const activeData = ref(0);
    const changeData = (index: number) => { activeData.value = index; };
    const currentData = computed(() => activeData.value === 0 ? data1 : data2);

    const datasets = computed(() => [
      { ...data1.datasets[0], label: 'Data 1',fill: true, // Bu satırı ekleyin
    },
      { ...data2.datasets[0], label: 'Data 2' , fill: true, // Bu satırı ekleyin
    }
    ]);

    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.2)' },
          ticks: { display: false },
        }
      },
      elements: { line: { borderWidth: 0.1 }, point: { radius: 0 } },
      plugins: { legend: { display: false } }
    }));

    return { currentData, options, datasets, changeData };
  }
});
</script>

<style scoped>
@media (min-width: 768px) and (max-width: 1023px) {
  .radar-container {
    @apply w-9/12 mx-[200px] -mt-[650px];
  }
}
@media (max-width: 768px) {
  .radar-container {
    @apply w-full mt-[-570px] h-[300px] ml-0 mr-[100px];
  }
}
</style>
