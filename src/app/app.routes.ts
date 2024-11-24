import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablaUsuariosComponent } from './dashboard/tabla-usuarios/tabla-usuarios.component';
import { TablaPeliculasComponent } from './dashboard/tabla-peliculas/tabla-peliculas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', redirectTo: 'peliculas', pathMatch: 'full' },
        { path: 'usuarios', component: TablaUsuariosComponent },
        { path: 'peliculas', component: TablaPeliculasComponent },
    ]},
];
