import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './info/info.component';
import {YamlToPropertiesConverterComponent} from './yaml-to-properties-converter/yaml-to-properties-converter.component';

const routes: Routes = [
  {path: '', component: YamlToPropertiesConverterComponent},
  {path: 'info', component: InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
