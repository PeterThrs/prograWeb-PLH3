import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';
import { UsuarioLoggedService } from '../services/usuario-logged.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  usuarios: Usuario[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private logeadoService: UsuarioLoggedService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Usuario:', email);
      console.log('Contraseña:', password);
      // Aquí puedes agregar la lógica para autenticar al usuario
      let entrada = false;

      this.usuarios.forEach(usuario => {
        if (usuario.email === email && usuario.password === password) {
          entrada = true;
          this.logeadoService.setUsuario(usuario);
        }
      })


      if (entrada) {
        console.log("Se ingreso correctamente")
        Swal.fire({
          title: "Credenciales Correctas",
          text: "Has iniciado Sesion correctamente",
          icon: "success"
        }).then( () => {
          this.router.navigate(['dashboard']);
        })
        
      } else {
        console.log("datos erroneos");
        Swal.fire({
          icon: "error",
          title: "Credencial Erronea",
          text: "Verifica tu Email & Password!",
        });
      }
    }
  }

  obtenerUsuarios() {
    console.log('entramos al metodo')
    this.usuarioService.obtenerUsuario().subscribe(
      {
        next: (datos) => {
          this.usuarios = datos;
        },
        error: (errores) => {
          console.log(errores)
        }
      }
    );
  }

}
