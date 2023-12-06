import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  registros: any[] = [["Cliente 1","B 123","C/ la la la","1"],["Cliente 2","A 334","Av.lo lo lo","2"]];

  add(registro: any[]){
    this.registros.push(registro);
  }

  getRegistros(){
    return this.registros;
  }

}
