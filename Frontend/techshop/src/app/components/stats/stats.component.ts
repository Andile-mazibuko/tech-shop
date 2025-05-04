import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  
  chartType = "line"
  chartLabels = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
  
  ngOnInit(): void {
    Chart.register(...registerables);
  }
  ngAfterViewInit(): void {
    this.createLineChart(); 
    this.createDoughnut()
  }
   
  createLineChart(){
    new Chart('sales',{
      type: 'line',
      data: {
        labels:this.chartLabels,
        datasets:[
          {
            label: 'Revenue',
            data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56],
            borderColor: 'rgba(66, 165, 245)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(66, 165, 245, 0.2)'
          },
          {
            label: 'Expenses',
            data: [28, 48, 40, 19, 86, 27, 90,40, 19, 86, 27, 90],
            borderColor: 'rgba(255, 0, 0,1)',
            tension: 0.4,
            fill: true,
            backgroundColor:'rgba(255, 0, 0, 0.2)'
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display: true,
            position: "right"
          }
        },
        scales:{
          x:{
            grid:{
              display:false
            },
          },
          y:{
            grid:{
              display:false
            },
            beginAtZero: true,
            
          }
        }
      }
    })
  }

  createDoughnut(){
    new Chart('doughnut',{
      type: 'doughnut',
      data:{
        labels:["Gpu","Cpu","PC","Keyboards"],
        datasets: [
          {
            data: [12,47,55,34],
            backgroundColor:['red','blue','navy','orange']
          }
        ]
      }
    })
  }


}
