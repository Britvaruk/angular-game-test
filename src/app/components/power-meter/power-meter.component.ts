import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-power-meter',
  templateUrl: './power-meter.component.html',
  styleUrl: './power-meter.component.scss'
})
export class PowerMeterComponent {
  @Input() power: number = 0;
}
