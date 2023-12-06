import { Component, OnInit } from '@angular/core';
import { ListadoService } from "./listado.service";

@Component({
  standalone:true,
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public array_registros : any[] = [];
  constructor(public listadoService: ListadoService) {}

  edit(codigo:string){
    this.listadoService.edit(codigo)
  }

  delete_data(codigo_eliminar:string){
    this.listadoService.delete(codigo_eliminar)
  }

  ngOnInit() {
    this.array_registros = this.listadoService.getRegistros();

  }
}