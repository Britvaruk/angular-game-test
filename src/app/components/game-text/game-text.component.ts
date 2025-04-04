import { Component, Input } from '@angular/core';
import { TextVariant } from '../../enums';

@Component({
  selector: 'app-game-text',
  templateUrl: './game-text.component.html',
  styleUrl: './game-text.component.scss'
})
export class GameTextComponent {
  @Input() text = TextVariant.NewGame;
  textVariantEnum = TextVariant;
}
