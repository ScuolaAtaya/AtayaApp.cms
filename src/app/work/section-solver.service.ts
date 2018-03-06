import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

const section = [
  { id: 0, name: 'accoglienza' },
  { id: 1, name: 'il-lavoro' },
  { id: 2, name: 'il-cibo' },
  { id: 3, name: 'pronto' },
  { id: 4, name: 'come-sei-come-stai' },
  { id: 5, name: 'la-salute' },
  { id: 6, name: 'la-citta' },
  { id: 7, name: 'mezzi-di-trasporto' },
  { id: 8, name: 'la-cura-della-casa' },
  { id: 9, name: 'il-viaggio' }
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
    return params['section'];
  }

}
