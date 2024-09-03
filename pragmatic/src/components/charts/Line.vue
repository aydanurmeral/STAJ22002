<template>
  <div class="relative w-full h-full">
    <canvas ref="lineChart" class="absolute top-0 left-0"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType } from 'vue';
import { Chart, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default defineComponent({
  name: 'LineChart',
  props: {
    data: {
      type: Array as PropType<number[]>,
      required: true
    }
  },
  setup(props) {
    const lineChart = ref<HTMLCanvasElement | null>(null);

    const createLine = () => {
      if (lineChart.value) {
        new Chart(lineChart.value, {
          type: 'line',
          data: {
            labels: props.data.map((_, i) => `Label ${i + 1}`),
            datasets: [{
              data: props.data,
              borderColor: 'rgba(54, 162, 235, 1)', 
              backgroundColor: 'rgba(54, 162, 235, 0.3)', 
              borderWidth: 2,
              fill: true, 
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                display: false,
                grid: { display: false }
              },
              y: {
                display: false,
                grid: { display: false },
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    onMounted(createLine);

    return { lineChart };
  }
});
</script>
