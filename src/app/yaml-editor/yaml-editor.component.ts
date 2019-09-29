import {Component, OnInit} from '@angular/core';
import 'brace/mode/yaml';

@Component({
  selector: 'app-yaml-editor',
  templateUrl: './yaml-editor.component.html',
  styleUrls: ['./yaml-editor.component.css']
})
export class YamlEditorComponent implements OnInit {
  options: any = {
    showLineNumbers: true,
    tabSize: 2
  };
  text = `# An employee record
martin:
    name: Martin D'vloper
    job: Developer
    skill: Elite
---
martin: {name: Martin D'vloper, job: Developer, skill: Elite}
['Apple', 'Orange', 'Strawberry', 'Mango']`;

  constructor() {
  }

  ngOnInit() {
  }

}
