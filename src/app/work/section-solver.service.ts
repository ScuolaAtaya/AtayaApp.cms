import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

const section = [
  { id: 0, name: 'accoglienza', background: '#40ACCC' },
  { id: 1, name: 'il-lavoro', background: '#40ACCC' },
  { id: 2, name: 'il-cibo',background: '#40ACCC' },
  { id: 3, name: 'pronto', background: '#40ACCC' },
  { id: 4, name: 'come-sei-come-stai', background: '#40ACCC' },
  { id: 5, name: 'la-salute', background: '#40ACCC' },
  { id: 6, name: 'la-citta', background: '#40ACCC' },
  { id: 7, name: 'mezzi-di-trasporto', background: '#40ACCC' },
  { id: 8, name: 'la-cura-della-casa', background: '#40ACCC' },
  { id: 9, name: 'il-viaggio', background: '#40ACCC' }
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
