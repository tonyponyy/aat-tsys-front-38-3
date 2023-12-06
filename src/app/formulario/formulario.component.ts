import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatPercent } from '@angular/common';
import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { ListadoService } from '../listado/listado.service';
import { Articulo } from "../models/articulo"


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent implements OnInit {
  constructor(public listadoService: ListadoService) {}
  protected validation_codigo: string = '';
  protected validation_descripcion: string = '';
  protected validation_precio: string = '';
  protected form: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
  });

  
  ngOnInit() {
    this.listadoService.getEditarArticuloObservable().subscribe(articulo => {
      this.edit(articulo);
    });
  }

  validate() {
    let validation = true;
    Object.keys(this.form.controls).forEach((controlName) => {
      let valor = this.form.get(controlName);
      let res = valor ? valor.value : '';

      if (res == '') {
        validation = false;
        switch (controlName) {
          case 'codigo':
            this.validation_codigo = 'Introduzca codigo';
            break;
          case 'descripcion':
            this.validation_descripcion = 'Introduzca descripcion';
            break;
          case 'precio':
            this.validation_precio = 'Precio no puede estar vacío';
            break;
          default:
            break;
        }
      } else {
        switch (controlName) {
          case 'codigo':
            this.validation_codigo = '';
            break;
          case 'descripcion':
            this.validation_descripcion = '';
            break;
          case 'precio':
            this.validation_precio = '';
            break;
          default:
            break;
        }
      }
    });
    return validation;
  }

  clean() {
 this.form.reset();
  }

  edit(articulo :Articulo){
    this.form.get("codigo")?.setValue(articulo.codigo);
    this.form.get("descripcion")?.setValue(articulo.descripcion);
    this.form.get("precio")?.setValue(articulo.precio);
  }
  send_data() {
    if (this.validate()) {
      var codigo  = this.form.get("codigo")?.value;
      var descripcion  = this.form.get("descripcion")?.value;
      var precio  = this.form.get("precio")?.value;
      }
      this.listadoService.add(new Articulo(codigo,descripcion,precio));
      this.clean();
    }

    update_data() {
      if (this.validate()) {
        var codigo  = this.form.get("codigo")?.value;
        var descripcion  = this.form.get("descripcion")?.value;
        var precio  = this.form.get("precio")?.value;
        console.log(new Articulo(codigo,descripcion,precio))
        this.listadoService.update(new Articulo(codigo,descripcion,precio));
        this.clean();
      }
      }

}
