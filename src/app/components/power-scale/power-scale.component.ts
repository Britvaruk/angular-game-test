import { Component, Input } from '@angular/core';
import { finalize, take, timer } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';
import { GameState } from '../../enums';

@Component({
  selector: 'app-power-scale',
  templateUrl: './power-scale.component.html',
  styleUrl: './power-scale.component.scss'
})
export class PowerScaleComponent {
  @Input({ required: true }) blocksHit!: number;

  starVisible = false;

  scaleBlocks = [
    {
      class: 'scale__block_b8',
      isVisible: false
    },
    {
      class: 'scale__block_b7',
      isVisible: false
    },
    {
      class: 'scale__block_b6',
      isVisible: false
    },
    {
      class: 'scale__block_b5',
      isVisible: false
    },
    {
      class: 'scale__block_b4',
      isVisible: false
    },
    {
      class: 'scale__block_b3',
      isVisible: false
    },
    {
      class: 'scale__block_b2',
      isVisible: false
    },
    {
      class: 'scale__block_b1',
      isVisible: false
    }
  ];

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.gameStateService.gameState$.subscribe((state) => {
      if (state === GameState.ScaleAnimation) {
        timer(0, 200)
          .pipe(
            take(this.blocksHit === 7 ? 8 : this.blocksHit),
            finalize(() =>
              setTimeout(() => this.gameStateService.setGameState(GameState.EndGame), 300)
            )
          )
          .subscribe((index) => {
            this.scaleBlocks[this.scaleBlocks.length - index - 1].isVisible = true;
            if (index === 7) {
              this.starVisible = true;
            }
          });
      } else if (state === GameState.HitWaiting) {
        this.scaleBlocks.map((item) => (item.isVisible = false));
        this.starVisible = false;
      }
    });
  }
}
