import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sentiment', pathMatch: 'full' },
  { path: 'sentiment', 
  component: SentimentComponent, 
  canActivate: [AuthGuard]},
  { path: 'login', 
  component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
