import { Injectable } from '@angular/core';

export class Menu {
    title: string;
    image: string;
}

const MENUDASHBOARD = [{
    title: 'Accoglienza',
    image: 'assets/img/accoglienza.png'
}, {
    title: 'Il lavoro',
    image: 'assets/img/il_lavoro.png'
}, {
    title: 'Il cibo',
    image: 'assets/img/il_cibo.png'
}, {
    title: 'Pronto?',
    image: 'assets/img/pronto.png'
}, {
    title: 'Come sei? Come stai?',
    image: 'assets/img/come_sei_come_stai.png'
}, {
    title: 'La salute',
    image: 'assets/img/la_salute.png'
}, {
    title: 'La città e i suoi servizi',
    image: 'assets/img/la_citta.png'
}, {
    title: 'I mezzi di trasporto',
    image: 'assets/img/mezzi_di_trasporto.png'
}, {
    title: 'La cura della casa',
    image: 'assets/img/la_cura_della_casa.png'
}, {
    title: 'Il viaggio',
    image: 'assets/img/il_viaggio.png'
}
]


@Injectable()
export class DashboardItems {
    getAll(): Menu[] {
        return MENUDASHBOARD;
    }
}