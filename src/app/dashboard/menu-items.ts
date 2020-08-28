import { Injectable } from '@angular/core';

export class Menu {
    title: string;
    image: string;
    route: string;

    constructor(title: string, image: string, route: string = null) {
        this.image = title;
        this.image = image;
        this.route = route;
    }
}

const MENUDASHBOARD = [
    { title: 'Accoglienza', image: 'assets/img/accoglienza.png', route: 'accoglienza' },
    { title: 'Il lavoro', image: 'assets/img/il_lavoro.png', route: 'il-lavoro' },
    { title: 'Il cibo', image: 'assets/img/il_cibo.png', route: 'il-cibo' },
    { title: 'Pronto?', image: 'assets/img/pronto.png', route: 'pronto' },
    { title: 'Come sei? Come stai?', image: 'assets/img/come_sei_come_stai.png', route: 'come-sei-come-stai' },
    { title: 'La salute', image: 'assets/img/la_salute.png', route: 'la-salute' },
    { title: 'La città e i suoi servizi', image: 'assets/img/la_citta.png', route: 'la-citta' },
    { title: 'I mezzi di trasporto', image: 'assets/img/mezzi_di_trasporto.png', route: 'mezzi-di-trasporto' },
    { title: 'La cura della casa', image: 'assets/img/la_cura_della_casa.png', route: 'la-cura-della-casa' },
    { title: 'Il viaggio', image: 'assets/img/il_viaggio.png', route: 'il-viaggio' },
    { title: 'Lavoro: cartellonistica', image: 'assets/img/cartellonistica.png', route: 'lavoro-cartellonistica' },
    { title: 'Lavoro: rischi e pericoli', image: 'assets/img/rischi_pericoli.png', route: 'lavoro-rischi-pericoli' },
    { title: 'Lavoro: benessere', image: 'assets/img/benessere.png', route: 'lavoro-benessere' },
    { title: 'Patente', image: 'assets/img/patente.png', route: 'patente' }
];

const MENUSUBSECTION = [
    { title: 'Capiamo', image: 'assets/img/sub-section-capiamo.png', route: 'understand' },
    { title: 'Parliamo', image: 'assets/img/sub-section-parliamo.png', route: 'talk' },
    { title: 'Leggiamo', image: 'assets/img/sub-section-leggiamo.png', route: 'read' },
    { title: 'Scriviamo', image: 'assets/img/sub-section-scriviamo.png', route: 'write' },
    // TODO change asset
    { title: 'Verifica finale', image: 'assets/img/sub-section-scriviamo.png', route: 'final' }
];

@Injectable()
export class DashboardItems {
    getAll(): Menu[] {
        return MENUDASHBOARD;
    }
}

@Injectable()
export class SubSections {
    getAll(): Menu[] {
        return MENUSUBSECTION;
    }
}
