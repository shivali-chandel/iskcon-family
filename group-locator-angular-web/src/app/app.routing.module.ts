import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {GroupMapComponent} from './group-map/group-map.component';
import {TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
import {GroupMapIskconComponent} from './group-map-iskcon/group-map-iskcon.component';

const appRoutes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'group-locator-builder', component: GroupMapComponent},
      {path: 'terms-and-condition', component: TermsAndConditionComponent}]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
