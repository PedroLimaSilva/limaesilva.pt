import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from '../pages/resume/resume.component';
import { AboutComponent } from '../pages/about/about.component';
import { UnderConstructionComponent } from '../pages/under-construction/under-construction.component';

const routes: Routes = [
    { path: 'resume', component: ResumeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'projects', component: UnderConstructionComponent },
    { path: 'contact', component: UnderConstructionComponent },
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: '**', redirectTo: '/about' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
