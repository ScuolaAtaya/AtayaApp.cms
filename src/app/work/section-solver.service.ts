import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

const section = [
  { id: 0, name: 'accoglienza', title: 'Accoglienza' },
  { id: 1, name: 'il-lavoro', title: 'Il lavoro' },
  { id: 2, name: 'il-cibo', title: 'Il cibo' },
  { id: 3, name: 'pronto', title: 'Pronto?' },
  { id: 4, name: 'come-sei-come-stai', title: 'Come sei? Come stai?' },
  { id: 5, name: 'la-salute', title: 'La salute' },
  { id: 6, name: 'la-citta', title: 'La città e i suoi servizi' },
  { id: 7, name: 'mezzi-di-trasporto', title: 'I mezzi di trasporto' },
  { id: 8, name: 'la-cura-della-casa', title: 'La cura della casa' },
  { id: 9, name: 'il-viaggio', title: 'Il viaggio' },
  { id: 10, name: 'lavoro-cartellonistica', title: 'Lavoro: cartellonistica' },
  { id: 11, name: 'lavoro-rischi-pericoli', title: 'Lavoro: rischi e pericoli' },
  { id: 12, name: 'lavoro-benessere', title: 'Lavoro: benessere' },
  { id: 13, name: 'patente', title: 'Patente' }
];

export class Section {
  id: number;
  name: string;
  title: string;
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

  public retrieveSection(params: Params) {
    return this.getByName(params['section']);
  }
}
