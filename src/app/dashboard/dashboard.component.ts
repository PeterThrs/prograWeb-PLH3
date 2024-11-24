import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TablaPeliculasComponent } from './tabla-peliculas/tabla-peliculas.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { GuardarLocalService } from '../services/guardar-local.service';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { UsuarioLoggedService } from '../services/usuario-logged.service';
import { Usuario } from '../models/usuario';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
    MatButtonModule, 
    MatDialogModule,
    RouterLink,
    MatMenuModule,
    MatSidenavModule,
    MatIcon
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  showFiller = false;
  usuario: Usuario | null;

  constructor(private router: Router, 
    public logeadoService: UsuarioLoggedService
  ){}

  ngOnInit(): void {
    console.log(this.logeadoService.getUsuario()?.avatar);
    this.usuario = this.logeadoService.getUsuario();
  }

  salir(){

    Swal.fire({
      title: "¿Estas seguro de salir?",
      text: "Se cerrara la session",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Se ha cerrado la sesion!",
          text: "Session cerrada.",
          icon: "success"
        });
        this.logeadoService.clearUsuario();
        this.router.navigate(['login']);
      }
    });

    
  }

  

}
