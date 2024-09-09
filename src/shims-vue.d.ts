/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.svg';
declare module '@canvasjs/vue-charts' {
  import { Component } from 'vue';
  const CanvasJSChart: Component;
  export default CanvasJSChart;
}
