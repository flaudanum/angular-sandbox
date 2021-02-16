import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var Plotly: any;

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.css'],
})
export class ChartDemoComponent implements OnInit {
  @ViewChild('Graph', { static: true })
  private Graph: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log(this.Graph);
    Plotly.newPlot(
      this.Graph.nativeElement,
      [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 2, 4, 8, 16],
        },
      ],
      {
        margin: { t: 0 },
      }
    );
  }
}
