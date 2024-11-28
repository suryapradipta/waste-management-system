import { Component } from '@angular/core';
import {ReportService} from "../../../shared/services/report/report.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  filters = { reportType: '', startDate: '', endDate: '', wasteType: '' };
  reportData: any = null;
  reportTitle: string = '';
  errorMessage: string = '';
  chart: any; // Store the Chart.js instance

  constructor(private reportService: ReportService) {}

  onGenerateReport() {
    this.reportService.generateReport(this.filters).subscribe({
      next: (response) => {
        this.reportData = response.data;
        this.reportTitle = this.getReportTitle(response.reportType);
        this.errorMessage = '';

        if (this.chart) this.chart.destroy(); // Destroy existing chart
        this.renderGraph(response.reportType, response.data); // Render the graph
      },
      error: (error) => {
        this.reportData = null;
        this.errorMessage = error.error.message || 'Failed to generate the report.';
        if (this.chart) this.chart.destroy(); // Clear chart on error
      }
    });
  }

  getReportTitle(reportType: string): string {
    switch (reportType) {
      case 'pickup_statistics':
        return 'Pickup Statistics';
      case 'issues_reported':
        return 'Issues Reported';
      case 'recycling_rates':
        return 'Recycling Rates';
      default:
        return 'Report';
    }
  }

  renderGraph(reportType: string, data: any) {
    const ctx = document.getElementById('reportGraph') as HTMLCanvasElement;

    if (reportType === 'pickup_statistics' || reportType === 'issues_reported') {
      const labels = data.map((item: any) => item.wasteType || item.issueType);
      const counts = data.map((item: any) => item.count);

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Count',
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Add more colors if needed
              borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false // Hide legend for simplicity
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else if (reportType === 'recycling_rates') {
      const recyclingRate = data.recyclingRate.toFixed(2);

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Recyclable Waste', 'Other Waste'],
          datasets: [
            {
              data: [data.recyclableCount, data.totalCount - data.recyclableCount],
              backgroundColor: ['#36A2EB', '#FF6384']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }

  protected readonly Array = Array;
}
