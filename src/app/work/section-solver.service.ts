import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

const section = [
  { id: 0, name: 'accoglienza', background: '#37ABDF' },
  { id: 1, name: 'il-lavoro', background: '#2C74B6' },
  { id: 2, name: 'il-cibo',background: '#72458E' },
  { id: 3, name: 'pronto', background: '#AE007D' },
  { id: 4, name: 'come-sei-come-stai', background: '#D4145D' },
  { id: 5, name: 'la-salute', background: '#D2262D' },
  { id: 6, name: 'la-citta', background: '#DD6927' },
  { id: 7, name: 'mezzi-di-trasporto', background: '#EAAC12' },
  { id: 8, name: 'la-cura-della-casa', background: '#9ACB2A' },
  { id: 9, name: 'il-viaggio', background: '#139B43' }
]

export class Section {
  id: number;
  name: string;
}

@Injectable()
export class SectionSolverService {

  constructor() { }

  public getByName(name: string): Section {
    return section.find(it => it.name === name);
  }

  public getById(id: number): Section {
    return section.find(it => it.id === id);
  }

  public retrieveSection(params : Params) {
    return this.getByName(params['section']);
  }

}
