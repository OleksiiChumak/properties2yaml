import {Component} from '@angular/core';
import arrowLeftBold from '@iconify/icons-mdi/arrow-left-bold';
import arrowRightBold from '@iconify/icons-mdi/arrow-right-bold';

// <span class="iconify" data-icon="mdi:arrow-left-bold-circle" data-inline="false"></span>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  yaml2propertiesIcon = arrowLeftBold;
  properties2yamlIcon = arrowRightBold;
}
