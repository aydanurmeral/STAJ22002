<template>
  <div class="report-box bg-white p-5 rounded-lg relative flex flex-col ml-52 mt-8 mr-8">
    <div class="relative mb-12">
      <h3 class="text-xl ">Report</h3>
      <p class="text-sm text-gray-400 absolute top-10 left-1">This week</p>
    </div>

    <div class="absolute right-5 flex gap-2">
      <button
        v-for="period in periods"
        :key="period"
        :class="{
          'bg-blue-500 text-white': selected === period,
          'bg-gray-300 text-black': selected !== period
        }"
        @click="selectItem(period)"
        class="py-2 px-4 rounded transition-colors duration-300"
      >
        {{period}}
      </button>
    </div>

      <div>
        <div
          v-for="(data, index) in reportData"
          :key="index"

        >
          <span class="text-md">{{ data.label }}</span>

          <div class="flex items-center gap-2">
            <div
              class="w-full bg-gray-300 h-2 rounded relative overflow-hidden flex-1"
            >
              <div :class="data.barClass" :style="{ width: data.percentage }"></div>
            </div>

            <div
              v-if="data.icon"
              class=" flex w-4 h-4 rounded-full border-2"
              :class="data.iconClass"
            >
              <span :class="data.iconClass" class="text-sm">{{ data.icon }}</span>
            </div>

            <span
              v-if="!data.icon"
              class="text-gray-800 text-sm"
            >
              {{ data.percentage }}
            </span>
          </div>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ReportComponnet',
  setup() {
    const periods = ['Day', 'Week', 'Month'];
    const selected = ref('Day');
    const reportData = [
      {
        label: 'New Users',
        percentage: '100%',
        barClass: 'bg-green-500 h-full',
        icon: '✔',
        iconClass: 'border-green-300 text-green-300',
      },
      {
        label: 'Views',
        percentage: '70%',
        barClass: 'bg-blue-500 h-full',
      },
      {
        label: 'Conversions',
        percentage: '12%',
        barClass: 'bg-red-500 h-full',
        icon: '✘',
        iconClass: 'border-red-600 text-red-600',
      },
    ];

    function selectItem(period: string) {
      selected.value = period;
    }

    return {
      selected,
      selectItem,
      periods,
      reportData,
    };
  },
});
</script>

<style scoped>
@media (max-width: 767px) {
  .report-box {
    @apply w-full ml-0 mt-120 h-auto;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .report-box {
    @apply w-9/12;
    margin-top: 30rem; 
    padding-top: 30px;
  }
}
</style>
