import {Component, OnInit} from '@angular/core';
import {PickupService} from "../../../shared/services/pickup/pickup.service";
import {Chart, registerables} from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-pickup-history',
    templateUrl: './pickup-history.component.html',
    styleUrls: ['./pickup-history.component.css'],
    standalone: false
})
export class PickupHistoryComponent implements OnInit {
  private chart: Chart | undefined;
  private pieChart: any;
  private lineChart: any;

  constructor(private pickupService: PickupService) {
    Chart.register(...registerables);
  }



 /* renderChart() {
    const chartData = this.pickups.map((pickup) => ({
      x: new Date(pickup.pickupDate).getTime(),
      y: pickup.wasteTypes.length
    }));


    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('pickupChart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Waste Types Over Time',
          data: chartData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM dd, yyyy',
              displayFormats: {
                day: 'MMM dd, yyyy'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Waste Types'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const date = new Date(context.parsed.x).toLocaleDateString();
                const wasteTypes = context.parsed.y;
                return `Date: ${date}\nWaste Types: ${wasteTypes}`;
              }
            }
          }
        }
      }
    });
  }*/

  pickups: any[] = [];
  filters = {startDate: '', endDate: '', wasteType: '', sortBy: ''};
  errorMessage: string = '';

  ngOnInit() {
    this.fetchPickupHistory();
  }

  fetchPickupHistory() {
    this.pickupService.getPickupHistory(this.filters).subscribe({
      next: (response) => {
        this.pickups = response.pickups;
        this.errorMessage = '';
        // this.renderChart();
        this.renderWasteTypePieChart();
        this.renderWasteTypesOverTimeChart();
      },

      error: (error) => {
        this.pickups = [];
        this.errorMessage = error.error.message || 'Failed to fetch pickup history.';
      }
    });
  }

  onFilter() {
    this.fetchPickupHistory();
  }

  renderWasteTypePieChart() {
    // Calculate the counts of each waste type
    const wasteTypeCounts = {household: 0, recyclable: 0, hazardous: 0};

    this.pickups.forEach((pickup) => {
        pickup.wasteTypes.forEach((type: string) => {
          if (wasteTypeCounts[type as keyof typeof wasteTypeCounts] !== undefined) {
            wasteTypeCounts[type as keyof typeof wasteTypeCounts]++;
          }
        });
      }
    );

    // Prepare data for the chart
    const
      labels = Object.keys(wasteTypeCounts);
    const
      data = Object.values(wasteTypeCounts);

    if (this.pieChart) {
      this.pieChart.destroy();
    }
    // Create the Pie Chart
   this.pieChart =  new Chart(
      'wasteTypePieChart'
      , {
        type: 'pie'
        ,
        data: {
          labels,
          datasets: [
            {
              label: 'Waste Types',
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the slices
            }
          ]
        }
        ,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      }
    )
    ;
  }

  renderWasteTypesOverTimeChart() {
    this.pickupService.getPickupChartData(this.filters).subscribe({
      next: (response) => {
        const serverData = response.chartData;
        console.log('serverData:', serverData);

        // Transform the data for Chart.js
        const labels = serverData.map((entry: { date: any; }) => entry.date);
        const householdData = serverData.map((entry: { household: any; }) => entry.household);
        const recyclableData = serverData.map((entry: { recyclable: any; }) => entry.recyclable);
        const hazardousData = serverData.map((entry: { hazardous: any; }) => entry.hazardous);

        if (this.lineChart) {
          this.lineChart.destroy();
        }
        // Create the Line Chart
        this.lineChart=new Chart('wasteTypeLineChart', {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Household Waste',
                data: householdData,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
              },
              {
                label: 'Recyclable Waste',
                data: recyclableData,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true
              },
              {
                label: 'Hazardous Waste',
                data: hazardousData,
                borderColor: '#FFCE56',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Count of Waste Types'
                },
                beginAtZero: true
              }
            }
          }
        });
      },
      error: (error) => {
        console.error('Error fetching waste types over time:', error);
      }
    });
  }

}
