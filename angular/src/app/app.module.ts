import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AlltrackComponent } from './components/alltrack/alltrack.component';
import { EdittrackComponent } from './components/edittrack/edittrack.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './ui/home/home.component';
import {AuthService} from './service/auth.service';
import { ShowtrackComponent } from './components/showtrack/showtrack.component';
import {AuthGuard} from './guard/auth.guard';
import {Auth1Guard} from './guard/auth1.guard';

const appRoutes: Routes =  [
 {path:'login', component:LoginComponent},
 {path:'alltrack',component:AlltrackComponent, canActivate : [AuthGuard]},
 {path:'register',component:RegisterComponent,canActivate:[Auth1Guard]},
 {path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
 {path:'profile',component:ProfileComponent,canActivate : [AuthGuard]},
 {path:'home',component:HomeComponent},
 {path:'edit/:id', component: EdittrackComponent,canActivate : [AuthGuard]},
 {path:'myapi',component:ShowtrackComponent},
 {path:'',redirectTo:'/home',pathMatch:'full'},
 {path:'**',component:HomeComponent}



]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    ProfileComponent,
    AlltrackComponent,
    EdittrackComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShowtrackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(appRoutes)
  
  ],
  providers: [AuthService,AuthGuard,Auth1Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
