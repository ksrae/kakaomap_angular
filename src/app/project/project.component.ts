import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapComponent } from './map/map.component';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MapComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

}
