<template>
  <div class="w-full h-64">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'BarChart',
  props: {
    labels: {
      type: Array as () => string[],
      default: () => []
    },
    data: {
      type: Array as () => number[],
      default: () => []
    },
    showAxes: {
      type: Boolean,
      default: true
    },
    yAxisMax: {
      type: Number,
      default: 100
    },
    showLine: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array as () => string[],
      default: () => ['#FFFFFF']
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    barThickness: {
      type: Number,
      default: 10
    },
    useGradient: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const barChart = ref<HTMLCanvasElement | null>(null);

    const createGradient = (ctx: CanvasRenderingContext2D): CanvasGradient => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
      return gradient;
    };

    const createBar = (ctx: CanvasRenderingContext2D) => {
      new Chart(ctx, {
        type: 'bar' as keyof ChartTypeRegistry,
        data: {
          labels: props.labels,
          datasets: [
            {
              type: 'bar' as keyof ChartTypeRegistry,
              data: props.data,
              backgroundColor: props.useGradient ? createGradient(ctx) : props.colors[0],
              borderRadius: props.borderRadius,
              barThickness: props.barThickness,
            },
            ...(props.showLine ? [{
              type: 'line' as keyof ChartTypeRegistry,
              data: props.data.map((value) => value + 30),
              borderColor: '#FFFFFF',
              borderWidth: 2,
              tension:0.5,
              pointRadius: 3,
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#FFFFFF',
              pointHoverRadius: 6,
              pointStyle: 'circle',
            }] : []),
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
            easing: 'easeInOutQuad',
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: props.showAxes,
              grid: {
                display: false,
              },
            },
            y: {
              display: props.showAxes,
              grid: {
                display: false,
              },
              max: props.yAxisMax + 20,
              ticks: {
                stepSize: 20,
              },
            },
          },
        },
      });
    };

    onMounted(() => {
      if (barChart.value) {
        const ctx = barChart.value.getContext('2d');
        if (ctx) {
          createBar(ctx);
        }
      }
    });

    return { barChart };
  }
});
</script>
