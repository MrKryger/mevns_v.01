import { Line, mixins } from  'vue-chartjs'

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
        this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
    }
}
