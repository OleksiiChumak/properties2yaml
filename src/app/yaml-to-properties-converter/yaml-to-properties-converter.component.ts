import {Component, OnInit} from '@angular/core';
import arrowLeftBold from '@iconify/icons-mdi/arrow-left-bold';
import arrowRightBold from '@iconify/icons-mdi/arrow-right-bold';
import {safeLoad} from 'js-yaml';
import {PropertiesUtils} from '../utils/properties-utils';

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
    skill: Elite`;
  yamlAlert: string;
  propertiesText: string;

  constructor() {
  }

  ngOnInit() {
    this.convertYamlToProperties();
  }

  convertYamlToProperties() {
    try {
      const yamlObj = safeLoad(this.yamlText);
      this.yamlAlert = null;
      this.propertiesText = PropertiesUtils.stringify(yamlObj);
    } catch (e) {
      this.yamlAlert = e.message;
    }
  }
}
