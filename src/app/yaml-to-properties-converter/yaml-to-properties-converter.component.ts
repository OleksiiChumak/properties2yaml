import {Component, OnInit} from '@angular/core';
import arrowLeftBold from '@iconify/icons-mdi/arrow-left-bold';
import arrowRightBold from '@iconify/icons-mdi/arrow-right-bold';
import {safeLoad} from 'js-yaml';

@Component({
  selector: 'app-yaml-to-properties-converter',
  templateUrl: './yaml-to-properties-converter.component.html',
  styleUrls: ['./yaml-to-properties-converter.component.css']
})
export class YamlToPropertiesConverterComponent implements OnInit {
  yaml2propertiesIcon = arrowLeftBold;
  properties2yamlIcon = arrowRightBold;
  yamlText = `# An employee record
martin:
    name: Martin D'vloper
    job: Developer
    skill: Elite
---
martin: {name: Martin D'vloper, job: Developer, skill: Elite}`;
  yamlAlert: string;

  constructor() {
  }

  ngOnInit() {
  }

  convertYamlToProperties() {
    try {
      const yamlObj = safeLoad(this.yamlText);
      this.yamlAlert = null;
      console.log(yamlObj);
    } catch (e) {
      this.yamlAlert = e.message;
    }
  }
}
