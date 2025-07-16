import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

const section = [
  { id: 0, name: 'presentazione', title: 'Presentazione' },
  { id: 1, name: 'lavoro', title: 'Lavoro' },
  { id: 2, name: 'cibo', title: 'Cibo' },
  { id: 3, name: 'telefono', title: 'Telefono' },
  { id: 4, name: 'come-sei-come-stai', title: 'Come sei? Come stai?' },
  { id: 5, name: 'salute', title: 'Salute' },
  { id: 6, name: 'citta', title: 'Città e servizi' },
  { id: 7, name: 'mezzi-di-trasporto', title: 'Mezzi di trasporto' },
  { id: 8, name: 'cura-della-casa', title: 'Cura della casa' },
  { id: 9, name: 'viaggio', title: 'Viaggio' },
  { id: 10, name: 'cartellonistica', title: 'Cartellonistica' },
  { id: 11, name: 'rischi-pericoli', title: 'Rischi e pericoli' },
  { id: 12, name: 'benessere-al-lavoro', title: 'Benessere al lavoro' },
  { id: 13, name: 'patente', title: 'Patente di guida' },
  { id: 14, name: 'edilizia', title: 'Edilizia' },
  { id: 15, name: 'edilizia-2', title: 'Edilizia 2' },
  { id: 16, name: 'assistenza-alla-persona', title: 'Assistenza alla persona' },
  { id: 17, name: 'pulizie', title: 'Pulizie' }
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
