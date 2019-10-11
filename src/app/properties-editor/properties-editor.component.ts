import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
