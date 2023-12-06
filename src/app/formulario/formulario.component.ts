import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatPercent } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ListadoService } from '../listado/listado.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  constructor(public listadoService: ListadoService) {}
  protected validation_name: string = '';
  protected validation_email: string = '';
  protected validation_mensaje: string = '';
  protected validation_suma: string = '';
  protected num1: number = Math.trunc(Math.random() * 9);
  protected num2: number = Math.trunc(Math.random() * 9);
  protected form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mensaje: new FormControl(''),
    suma: new FormControl(''),
  });

  validate() {
    let validation = true;
    Object.keys(this.form.controls).forEach((controlName) => {
      let valor = this.form.get(controlName);
      let res = valor ? valor.value : '';

      if (controlName == 'suma') {
        if (parseInt(res) != this.num1 + this.num2) {
          this.validation_suma = 'Esta suma es incorrecta';
          validation = false;
        } else {
          this.validation_suma = '';
        }
      }
      if (res == '') {
        validation = false;
        switch (controlName) {
          case 'name':
            this.validation_name = 'Introduzca nombre';
            break;
          case 'email':
            this.validation_email = 'Introduzca correo valido';
            break;
          case 'mensaje':
            this.validation_mensaje = 'Mensaje no puede estar vacío';
            break;
          default:
            break;
        }
      } else {
        switch (controlName) {
          case 'name':
            this.validation_name = '';
            break;
          case 'email':
            this.validation_email = '';
            break;
          case 'mensaje':
            this.validation_mensaje = '';
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
  send_data() {
    var tmp_arr: any = [];
    if (this.validate()) {
      Object.keys(this.form.controls).forEach((controlName) => {
        let valor = this.form.get(controlName);
        let res = valor ? valor.value : '';
        tmp_arr.push(res);
      });
      this.listadoService.add(tmp_arr);
      this.clean();
    }
  }
}
