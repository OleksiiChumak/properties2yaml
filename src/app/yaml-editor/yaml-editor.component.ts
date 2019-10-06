import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() text: string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(code) {
    this.textChange.emit(code);
  }
}
