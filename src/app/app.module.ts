import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { StatisticComponent } from './components/kicker/statistic/statistic.component';
import { MatchesComponent } from './components/kicker/matches/matches.component';
import { TournamentsComponent } from './components/kicker/tournaments/tournaments.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddMatchComponent } from './shared/components/add-match/add-match.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoundResultComponent } from './shared/components/add-match/round-result/round-result.component';
import { SelectPlayersComponent } from './shared/components/add-match/select-players/select-players.component';
import { InfoBarComponent } from './shared/components/info-bar/info-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { KickerComponent } from './components/kicker/kicker.component';
import { MatchFinderComponent } from './components/kicker/match-finder/match-finder.component';
import { RegisterComponent } from './components/register/register.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StatisticComponent,
    MatchesComponent,
    TournamentsComponent,
    AddMatchComponent,
    RoundResultComponent,
    SelectPlayersComponent,
    InfoBarComponent,
    DashboardComponent,
    LoginComponent,
    KickerComponent,
    MatchFinderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InfoBarComponent]
})
export class AppModule { }