import {Component, OnInit} from '@angular/core';
import {versions} from '../../environments/versions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  versions: any = versions;

  ngOnInit() {
  }

}
