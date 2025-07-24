import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'DASHBOARD',
    type: 'link',
    icon: 'explore'
  }, {
    state: 'presentazione',
    name: 'PRESENTAZIONE',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'lavoro',
    name: 'LAVORO ',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'cibo',
    name: 'CIBO ',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'telefono',
    name: 'TELEFONO ',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'come-sei-come-stai',
    name: 'COME SEI? COME STAI? ',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'salute',
    name: 'SALUTE ',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'citta',
    name: 'CITTA SERVIZI',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'mezzi-di-trasporto',
    name: 'MEZZI DI TRASPORTO',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'cura-della-casa',
    name: 'CURA DELLA CASA',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'viaggio',
    name: 'VIAGGIO',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'cartellonistica',
    name: 'CARTELLONISTICA',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'rischi-pericoli',
    name: 'RISCHI E PERICOLI',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'benessere-al-lavoro',
    name: 'BENESSERE AL LAVORO',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'patente',
    name: 'PATENTE DI GUIDA',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  },  {
    state: 'edilizia-1',
    name: 'EDILIZIA 1',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  }, {
    state: 'edilizia-2',
    name: 'EDILIZIA 2',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  },  {
    state: 'assistenza-alla-persona',
    name: 'ASSISTENZA ALLA PERSONA',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  },{
    state: 'pulizie',
    name: 'PULIZIE',
    type: 'sub',
    icon: 'chat',
    children: [
      { state: 'write', name: 'Scriviamo' },
      { state: 'read', name: 'Leggiamo' },
      { state: 'understand', name: 'Capiamo' },
      { state: 'talk', name: 'Parliamo' },
      { state: 'final', name: 'Verifica finale' }
    ]
  },{
    state: '',
    name: 'Genera il Libro ',
    type: 'createBook',
    icon: 'map'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
