import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { PowerMeterComponent } from '../../components/power-meter/power-meter.component';
import { PowerScaleComponent } from '../../components/power-scale/power-scale.component';
import { GameStateService } from '../../services/game-state.service';
import { CommonModule } from '@angular/common';
import { GameTextComponent } from '../../components/game-text/game-text.component';
import { GameState, TextVariant } from '../../enums';

@Component({
  selector: 'app-game-page',
  imports: [CommonModule, PowerMeterComponent, PowerScaleComponent, GameTextComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  currentState$: Observable<GameState>;
  gameStateEnum = GameState;
  gameText = TextVariant.NewGame;

  hitPower: number = 0; // Текущее значение измерителя силы
  scaleDirection: 1 | -1 = 1; // Направление измерителя силы
  scaleSpeed: number = 5; // Скорость измерителя силы
  blocksHit: number = 0; // Количество блоков шкалы силы
  intervalSubscription: Subscription | undefined;

  constructor(private gameStateService: GameStateService) {
    this.currentState$ = this.gameStateService.gameState$;
  }

  startPowerMeter(): void {
    this.gameStateService.setGameState(GameState.HitWaiting);
    this.gameText = TextVariant.Hit;

    this.intervalSubscription = interval(30).subscribe(() => {
      this.hitPower += this.scaleDirection * this.scaleSpeed;

      if (this.hitPower >= 100) {
        this.scaleDirection = -1;
        this.hitPower = 100;
      } else if (this.hitPower <= 0) {
        this.scaleDirection = 1;
        this.hitPower = 0;
      }
    });
  }

  hit(): void {
    this.stopPowerMeter();

    this.blocksHit = Math.round(this.hitPower / (100 / 7));
    if (this.hitPower > 90) {
      this.gameText = TextVariant.Win;
    } else {
      this.gameText = TextVariant.Loss;
    }

    this.gameStateService.setGameState(GameState.HitAnimation);
    setTimeout(() => {
      this.gameStateService.setGameState(GameState.ScaleAnimation);
    }, 1300);
  }

  stopPowerMeter(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopPowerMeter();
  }
}
