import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlEditorComponent } from './yaml-editor.component';
import {AceEditorModule} from 'ng2-ace-editor';

describe('YamlEditorComponent', () => {
  let component: YamlEditorComponent;
  let fixture: ComponentFixture<YamlEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamlEditorComponent ],
      imports: [AceEditorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
