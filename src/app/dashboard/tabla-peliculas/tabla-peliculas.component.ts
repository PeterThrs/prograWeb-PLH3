import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { map } from 'rxjs';
import { Pelicula } from '../../models/pelicula';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import Swal from 'sweetalert2'
import { GuardarLocalService } from '../../services/guardar-local.service';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatSortModule
  ],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css'
})
export class TablaPeliculasComponent implements OnInit, AfterViewInit {

  peliculas: Pelicula[] = [];
  peliculasEliminadas: Pelicula[] = [];
  displayedColumns: string[] = ['numero', 'nombre', 'poster', 'accion'];
  dataSource = new MatTableDataSource<Pelicula>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private peliculaService: PeliculaService,
    private localService: GuardarLocalService
  ) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Pelicula, filter: string) => {
      return data.titulo.toLowerCase().includes(filter.trim().toLowerCase());
    };
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.peliculaService.getNowPlaying().pipe(
      map(response => response.results.map((data: any) => new Pelicula(data)))
    ).subscribe({
      next: (datos) => {
        this.peliculas = datos;
        this.dataSource.data = this.peliculas;
        console.log(this.peliculas);
        //this.actualizarContenido();
      },
      error: (errores) => {
        console.log(errores);
      }
    });
  }

  actualizarContenido(){
    console.log('actualizar contenido')
    this.peliculasEliminadas = this.localService.getList('peliculas-eliminadas');
    console.log(this.peliculasEliminadas)
    this.peliculas = this.peliculas.filter(
      pelicula => !this.peliculasEliminadas.some(eliminada => eliminada.id === pelicula.id)
    );
    this.dataSource.data = this.peliculas;
    
    console.log(this.peliculas)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  readonly dialog = inject(MatDialog);

  masDetalles(pelicula: Pelicula) {
    let edicion: boolean = false;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { pelicula, edicion }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editar(pelicula: Pelicula) {
    let edicion: boolean = true;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { pelicula, edicion }
    });

    dialogRef.afterClosed().subscribe((peliculaActualizada: Pelicula | undefined) => {
      console.log(`Dialog result: ${peliculaActualizada}`);
      if (peliculaActualizada) {
        const index = this.peliculas.findIndex(p => p.id === peliculaActualizada.id);
        this.peliculas[index] = peliculaActualizada;
      }
      console.log(this.peliculas);
      this.dataSource.data = this.peliculas;
    });
  }

  eliminar(pelicula: Pelicula) {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "¡No podras Revertir la accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El elemento fue borrado.",
          icon: "success"
        });
        
        this.peliculasEliminadas.push(pelicula);
        this.peliculas = this.peliculas.filter(
          pelicula => !this.peliculasEliminadas.some(eliminada => eliminada.id === pelicula.id)
        );
        this.dataSource.data = this.peliculas;
        // this.localService.removeList('peliculas-eliminadas');
        // this.localService.saveList('peliculas-eliminadas', this.peliculasEliminadas);
        // console.log(this.peliculasEliminadas)
        // this.actualizarContenido();

      }
    });

  }

}
