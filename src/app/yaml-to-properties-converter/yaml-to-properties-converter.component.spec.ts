import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YamlToPropertiesConverterComponent} from './yaml-to-properties-converter.component';
import {PropertiesEditorComponent} from '../properties-editor/properties-editor.component';
import {YamlEditorComponent} from '../yaml-editor/yaml-editor.component';
import {IconModule} from '@visurel/iconify-angular';
import {AceEditorModule} from 'ng2-ace-editor';

describe('YamlToPropertiesConverterComponent', () => {
  let component: YamlToPropertiesConverterComponent;
  let fixture: ComponentFixture<YamlToPropertiesConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YamlToPropertiesConverterComponent,
        PropertiesEditorComponent,
        YamlEditorComponent
      ],
      imports: [AceEditorModule, IconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamlToPropertiesConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
