import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlToPropertiesConverterComponent } from './yaml-to-properties-converter.component';

describe('YamlToPropertiesConverterComponent', () => {
  let component: YamlToPropertiesConverterComponent;
  let fixture: ComponentFixture<YamlToPropertiesConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamlToPropertiesConverterComponent ]
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
