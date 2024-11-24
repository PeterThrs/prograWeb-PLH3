import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Pelicula } from '../../models/pelicula';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  pelicula: Pelicula;
  isEditMode: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef: MatDialogRef<ModalComponent>){
    this.pelicula = structuredClone(data.pelicula) || JSON.parse(JSON.stringify(data.pelicula));
    this.isEditMode = data.edicion;
  }

  onSubmit() {
    Swal.fire({
      title: "¡Pelicula Actualizada!",
      text: "¡Datos aceptados!",
      icon: "success"
    }).then(() => {
      // this.data.pelicula = this.pelicula;
      // console.log(this.data.pelicula);
      console.log('Datos guardados:', this.pelicula);
      this.dialogRef.close(this.pelicula);
    });
    
  }

  onClose() {
    this.dialogRef.close();
  }

}
