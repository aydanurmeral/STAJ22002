<template>
  <div>
    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-blue-400 z-50"
    >
      <div class="relative">
        <div
          class="spinner-border animate-spin inline-block w-32 h-32 border-4 rounded-full"
        ></div>

        <img
          src="@/assets/logo.jpeg"
          alt="Logo"
          class="absolute inset-0 w-16 h-16 m-auto"
        />
      </div>
    </div>

    <div v-else class="flex h-[calc(450vh-64px)] overflow-hidden">
      <Sidebar
        :isSidebarCollapsed="isSidebarCollapsed"
        @sidebar-toggle="setSidebarVisibility"
      />

      <div
        :class="[
          'flex-1 mt-24 bg-gray-200 h-full overflow-auto transition-all duration-300 ease-in-out',
          { 'ml-0': isSidebarCollapsed, 'md:ml-8': !isSidebarCollapsed },
        ]"
      >
        <HeaderPage />
        <SecondaryHeader />
        <div class="flex-1">
          <DashboardCards :isSidebarCollapsed="isSidebarCollapsed" />
          <Statistic />
          <ProgressBox />

          <Report />
          <ImageComponent />
        </div>
      </div>

      <FooterPage :isSidebarCollapsed="isSidebarCollapsed" />

      <Settings />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted } from "vue";
import HeaderPage from "@/components/Header.vue";
import SecondaryHeader from "@/components/nav-bar.vue";
import Statistic from "@/components/Statistic.vue";
import Sidebar from "@/components/sidebar/side-1.vue";
import DashboardCards from "@/components/Cards.vue";
import ProgressBox from "@/components/Progress.vue";
import Report from "@/components/Report.vue";
import FooterPage from "@/components/Footer.vue";
import ImageComponent from "../components/charts/Radar.vue";
import Settings from "@/components/Settings.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    HeaderPage,
    SecondaryHeader,
    Sidebar,
    DashboardCards,
    ProgressBox,
    Statistic,
    Report,
    FooterPage,
    ImageComponent,
    Settings,
  },
  data() {
    return {
      isSidebarCollapsed: false,
      isLoading: true,
    };
  },
  methods: {
    setSidebarVisibility(collapsed: boolean): void {
      this.isSidebarCollapsed = collapsed;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
});
</script>
<style scoped>
.spinner-border {
  border-top-color: transparent;
  border-bottom-color: #2673a5;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
</style>
