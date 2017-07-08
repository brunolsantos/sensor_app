import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ChartistModule } from 'ng-chartist';
import { FlashMessagesModule } from 'angular2-flash-messages';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'charts', component: ChartsComponent},
  {path:'reports', component: ReportsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChartsComponent,
    ReportsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartistModule,
    FlashMessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
