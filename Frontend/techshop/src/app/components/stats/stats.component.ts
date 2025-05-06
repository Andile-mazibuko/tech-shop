import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CategorySum, Product } from '../../interfaces/models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit {
  constructor(private prodServ: ProductService) {}
  categorySummary: CategorySum[] = [];
  products: Product[] = [];

  chartLabels = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  ngOnInit(): void {
    Chart.register(...registerables);
    this.prodServ.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.categorySummary = this.fetchCategories()
  }
  ngAfterViewInit(): void {
    this.createLineChart();
    this.createDoughnut();
    
  }

  createLineChart() {
    new Chart('sales', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Revenue',
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
            borderColor: 'rgba(66, 165, 245)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
          },
          {
            label: 'Expenses',
            data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90],
            borderColor: 'rgba(255, 0, 0,1)',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          title:{
            display: true,
            text:'Revenue and Expenses Per Month'
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  createDoughnut() {
    const labels = this.categorySummary.map(sum => sum.category)
    const data = this.categorySummary.map(sum => sum.total)
    new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['red', 'blue', 'navy', 'orange'],
          },
        ],
      },
      options:{
        plugins:{
          legend:{
            display: true,
            position: 'right'
          },
          title:{
            display:true,
            text: 'Total Quantity by Category'
          }
        }
      }
    });
  }

  /**
   *
   * @returns Unique categories of products with a total their quantity in total
   */
  fetchCategories(): CategorySum[] {
    let categories: string[] = [];
    let summary: CategorySum[] = [];
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (!categories.includes(prod.category)) {
        categories.push(prod.category);
        const sum: CategorySum = {
          category: prod.category,
          total: this.quantityPerCategory(prod.category),
        };
        summary.push(sum);
      }
    }
    return summary;
  }
  /**
   * 
   * @param category category of products e.g GPU, Desktop, Laptop etc
   * @returns the total number of products available based on the catergory
   */
  quantityPerCategory(category: string): number {
    let quantity = 0;
    this.products.forEach((prod) => {
      if (prod.category.includes(category)) {
        quantity += prod.quantity;
      }
    });
    return quantity;
  }
}
