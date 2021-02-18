import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlotlyHTMLElement } from 'plotly.js';
declare var Plotly: any;

@Component({
  selector: 'app-chart-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.css'],
})
export class ChartDemoComponent implements OnInit {
  @ViewChild('Graph', { static: true })
  private Graph: ElementRef | undefined;

  constructor() {}

  ngOnInit(): void {
    if (this.Graph) {
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
      ).then((elt: PlotlyHTMLElement) => {
        console.log('Plotly element:', elt);
      });
    }
  }
}
