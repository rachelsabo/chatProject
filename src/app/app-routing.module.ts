import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [{path:'',component: HomeComponent},
                        {path:'chat', component:ChatContainerComponent,canActivate:[AuthGuardService]},  
                        {path:'chat/:roomId', component:ChatContainerComponent,canActivate:[AuthGuardService]},
                        {path:'**', redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
