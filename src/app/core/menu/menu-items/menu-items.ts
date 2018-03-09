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
    state: 'accoglienza',
    name: 'ACCOGLIENZA ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'il-lavoro',
    name: 'IL LAVORO ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'il-cibo',
    name: 'IL CIBO ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'pronto',
    name: 'PRONTO? ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'come-sei-come-stai',
    name: 'COME SEI? COME STAI? ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'la-salute',
    name: 'LA SALUTE ',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'la-citta',
    name: 'LA CITTA E I SUOI SERVIZI',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'mezzi-di-trasporto',
    name: 'I MEZZI DI TRASPORTO',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'la-cura-della-casa',
    name: 'LA CURA DELLA CASA',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]
  }, {
    state: 'il-viaggio',
    name: 'IL VIAGGIO',
    type: 'sub',
    icon: 'chat',
    children: [
      {state: 'write', name: 'Scriviamo'},
      {state: 'read', name: 'Leggiamo'},
      {state: 'understand', name: 'Capiamo'},
      {state: 'talk', name: 'Parliamo'},      
    ]}, {
      state: '',
      name: 'Genera il Libro ',
      type: 'link',
      icon: 'map'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
