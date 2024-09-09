<template>
  <div class="progress-box ml-52 my-6 max-w-3xl bg-white text-black p-5 rounded-lg shadow-lg relative top-5 overflow-hidden">
    <h3 class="text-2xl font-semibold">Progress</h3>
    <p class="text-lg mb-5">This month</p>
    <div class="flex gap-2 absolute top-5 right-5">
      <button 
        v-for="period in periods" 
        :key="period"
        :class="buttonStyle(period)"
        @click="selectPeriod(period)"
      >
      {{ period }}
      </button>
    </div>
    <table class="w-full mt-1">
      <thead>
        <tr>
          <th></th>
          <th v-for="header in tableHeaders" :key="header" class="bg-gray-100 text-gray-500 py-2 px-4">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in progressDetails" :key="index">
          <td class="w-1 h-1 rounded-full inline-block mt-2" :style="{ backgroundColor: item.color }"></td>
          <td class="py-2 px-4">{{ item.firstName }}</td>
          <td class="py-2 px-4">{{ item.lastName }}</td>
          <td>
            <div class="flex gap-2">
              <div v-for="i in 5" :key="i" class="w-2.5 h-2.5 bg-blue-200 rounded-full"></div>
            </div>
          </td>
          <td>
            <div class="flex items-center">
              <div class="relative w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="absolute top-0 left-0 h-full" :style="{ width: item.progress + '%', backgroundColor: item.barColor }"></div>
              </div>
              <span v-if="item.progress === 100" class="flex items-center justify-center w-4 h-4 border-2 border-green-200 text-green-400 rounded-full ml-2">
                <span class="text-sm">✓</span>
              </span>
              <span v-else class="ml-2 text-sm">{{ item.progress }}%</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProgressComponent',
  setup() {
    const periods = ['Day', 'Week', 'Month'];
    const selected = ref('Day');

    function selectPeriod(period: string) {
      selected.value = period;
    }

    function buttonStyle(period: string) {
      return [
        'px-4 py-2 rounded-md cursor-pointer transition-colors duration-500 ease-in-out',
        selected.value === period ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
      ];
    }

    const progressDetails = ref([
      { firstName: 'Fidela', lastName: 'MacLaverty', progress: 70, color: '#007bff', barColor: '#007bff' },
      { firstName: 'Garrard', lastName: 'Inge', progress: 55, color: '#fd7e14', barColor: '#fd7e14' },
      { firstName: 'Clayborn', lastName: 'Blencoe', progress: 100, color: '#28a745', barColor: '#28a745' },
      { firstName: 'Elna', lastName: 'Deboick', progress: 12, color: '#dc3545', barColor: '#dc3545' },
      { firstName: 'Sheffie', lastName: 'Fellgett', progress: 0, color: '#6c757d', barColor: '#6c757d' }
    ]);

    const tableHeaders = ['First Name', 'Last Name', 'Activity', 'Progress'];

    return {
      periods,
      selected,
      selectPeriod,
      buttonStyle,
      progressDetails,
      tableHeaders
    };
  }
});
</script>

<style scoped>
@media (max-width: 767px) {
  .progress-box {
    @apply ml-0 w-full h-auto top-10;
  }

  .w-1 {
    @apply w-2 h-2;
  }

  .w-2 {
    @apply w-3 h-3;
  }

  .w-36 {
    @apply w-full;
  }
}

@media (min-width: 767px) and (max-width: 1023px) {
  .progress-box {
    @apply w-auto ml-[200px]  ;
  }
}
</style>
