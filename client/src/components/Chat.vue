<template>
    <div>
        <h1>Диаграммы</h1>
        <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
        <div class="grid">
            <div class="grid__item">
                <base-charts :chart-data="basecollection" :width="400"
                             :height="300"></base-charts>
            </div>
            <div class="grid__item">
                <line-example :chart-data="linecollection" :width="400"
                              :height="300"></line-example>
            </div>
            <div class="grid__item">
                <pie-example :chart-data="piecollection" :width="400"
                             :height="300"></pie-example>
            </div>
            <div class="grid__item">
                <doughnut-example :chart-data="dougcollection" :width="400"
                                  :height="300"></doughnut-example>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseCharts from './Charts/BaseCharts'
  import LineExample from './Charts/LineExample'
  import PieExample from './Charts/PieExample'
  import DoughnutExample from './Charts/DoughnutExample'
  import Authentication from '@/components/pages/Authentication'
  import Axios from 'axios'

  const BudgetManagerAPI = 'http://localhost:3000';


  export default {
    name: 'Chat',
    components: {
      BaseCharts,
      LineExample,
      PieExample,
      DoughnutExample
    },
    data() {
      return {
        gradient: '#FC2525ab',
        gradient2: '#05CBE1ab',
        piecollection: null,
        basecollection: null,
        linecollection: null,
        dougcollection: null,
        datas: [],
        datanull: {
          counts: [],
          message: []
        }
    }
    },
    created: function () {
      this.fillData();
      this.Start();
    },
    methods: {
      fillData(data = this.datanull) {
        this.piecollection = {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16'
              ],
              data: [40, 20, 80, 10]
            }
          ]
        };
        this.basecollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Пользователь',
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: this.gradient,
              data: this.datas.message1
            }, {
              label: 'Общие данные',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: data.message
            }
          ]
        };
        this.linecollection = {
          labels: data.counts,
          datasets: [
            {
              label: 'Пользователь',
              borderColor: this.gradient,
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: '#ffffff05',
              data: this.datas.message2
            }, {
              label: 'Общие данные',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: data.message
            }
          ]
        };
        this.dougcollection = {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16'
              ],
              data: [40, 20, 80, 10]
            }
          ]
        };
      },
      Start() {
        Axios.get(`${BudgetManagerAPI}/api/v1/ping`, {
          headers: {'Authorization': Authentication.getAuthenticationHeader(this)},
          params: {user_id: this.$cookie.get('user_id')}
        }).then(({data}) => {
          this.datas = data
      }).
        catch(error => {
          this.errorHandler(error)
      })
      },
      submitSignout() {
        Authentication.signout(this, '/login')
      }
    },
    sockets: {
      connect() {
        console.log('connected to chat server')
      },
      message(data) {
        this.fillData(data)
      }
    },
  }
</script>

<style lang="scss" scoped>
    h1 {
        margin-top: 0;
        padding: 15px 0;
        color: #2c3e50;
        border-bottom: 1px solid #2c3e50;
    }

    .grid {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto;
        &__item {
            background: #212733;
            border-radius: 15px;
            box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
            margin: 25px 25px;
        }
    }

    @media (max-width: 692px) {
        .grid {
            grid-template-columns: 100%;
            grid-template-rows: auto;
        }
    }

</style>
