import { Component } from '@angular/core';
import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { FormsModule} from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
   //propiedades
   libros: any;
   libro = new Libro();

   //constructor
   constructor(private libroService:LibroService){
    this.getLibros();
   }

   //metodo que hace la peticion a sevice para contener los libros
   async getLibros():Promise<void>{
    this.libros = await firstValueFrom(this.libroService.getLibros());
   }

   //metodo para insertar un libro desde form
   insertLibro(){
    this.libroService.agregarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
   }

   //metodo para seleccionar un libro de la tabla
   selectLibro(libroSeleccionado:Libro){
    this.libro = libroSeleccionado;
   }

   //metodo para modificar un libro
   updateLibro(){
    this.libroService.modificarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
   }

   //metodo para eliminar un libro
   deleteLibro(){
    this.libroService.elimiLibro(this.libro);
    this.libro=new Libro();
    this.getLibros();
   }

}
