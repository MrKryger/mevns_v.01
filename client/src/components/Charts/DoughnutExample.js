import { Doughnut, mixins} from 'vue-chartjs'
export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted: function mounted() {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
  }
};