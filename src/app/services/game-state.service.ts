import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private _gameState$: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(
    GameState.NewGame
  );
  public gameState$ = this._gameState$.asObservable();

  setGameState(value: GameState): void {
    this._gameState$.next(value);
  }
}
