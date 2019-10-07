import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesEditorComponent } from './properties-editor.component';
import {AceEditorModule} from 'ng2-ace-editor';

describe('PropertiesEditorComponent', () => {
  let component: PropertiesEditorComponent;
  let fixture: ComponentFixture<PropertiesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesEditorComponent ],
      imports: [AceEditorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
