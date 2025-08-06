import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MetaDados } from '../models/metas.model';

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  private metas: MetaDados[] = [
    { categoria: 'Receita', valorMeta: 0 },
    { categoria: 'Despesa', valorMeta: 0 },
    { categoria: 'Lucro', valorMeta: 0 }
  ];

  listarMetas(): Observable<MetaDados[]> {
    return of(this.metas);
  }
}
