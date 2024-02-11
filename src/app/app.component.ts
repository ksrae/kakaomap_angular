import { KakaomapService } from './../services/kakaomap.service';
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'kakaomap';
  kakaomapService = inject(KakaomapService);
}
