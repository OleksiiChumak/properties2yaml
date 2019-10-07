import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.css']
})
export class PropertiesEditorComponent implements OnInit {

  options: any = {
    showLineNumbers: true,
    tabSize: 2
  };
  text = `#Thu Apr 11 17:37:58 SRET 2019
db.user=mkyong
db.password=password
db.url=localhost`;

  constructor() {
  }

  ngOnInit() {
  }

}
