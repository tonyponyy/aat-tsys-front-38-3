import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Articulo } from "../models/articulo"
import { FormularioComponent } from "../formulario/formulario.component";

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private editarArticuloSubject = new Subject<Articulo>();  
  registros: Articulo[] = [new Articulo("1", "patatas", "5"), new Articulo("2", "platanos", "8")];

delete(codigo_eliminar:string){
  const index = this.registros.findIndex(registro => registro.codigo === codigo_eliminar);
  this.registros.splice(index,1);
}

edit(codigo_editar: string) {
  const index = this.registros.findIndex(registro => registro.codigo === codigo_editar);
  let articulo: Articulo = this.registros[index];
  this.editarArticuloSubject.next(articulo);
}

getEditarArticuloObservable() {
  return this.editarArticuloSubject.asObservable();
}

  add(registroNuevo: Articulo){
    const index = this.registros.findIndex(registro => registro.codigo === registroNuevo.codigo);
    console.log(index)
    if (index == -1){
      this.registros.push(registroNuevo);
    }else{
      alert("Ya existe articulo con ese codigo")
    }
  }

  update(registroActualizado: Articulo) {
    const index = this.registros.findIndex(registro => registro.codigo === registroActualizado.codigo);
      this.registros[index] = registroActualizado;
  }

  getRegistros(){
    return this.registros;
  }

}
