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
    { title: 'Presentazione', image: 'assets/img/presentazione.png', route: 'presentazione' },
    { title: 'Lavoro', image: 'assets/img/lavoro.png', route: 'lavoro' },
    { title: 'Cibo', image: 'assets/img/cibo.png', route: 'cibo' },
    { title: 'Telefono', image: 'assets/img/telefono.png', route: 'telefono' },
    { title: 'Come sei? Come stai?', image: 'assets/img/come_sei_come_stai.png', route: 'come-sei-come-stai' },
    { title: 'Salute', image: 'assets/img/salute.png', route: 'salute' },
    { title: 'Città e servizi', image: 'assets/img/citta.png', route: 'citta' },
    { title: 'Mezzi di trasporto', image: 'assets/img/mezzi_di_trasporto.png', route: 'mezzi-di-trasporto' },
    { title: 'Cura della casa', image: 'assets/img/cura_della_casa.png', route: 'cura-della-casa' },
    { title: 'Viaggio', image: 'assets/img/viaggio.png', route: 'viaggio' },
    { title: 'Cartellonistica', image: 'assets/img/cartellonistica.png', route: 'cartellonistica' },
    { title: 'Rischi e pericoli', image: 'assets/img/rischi_pericoli.png', route: 'rischi-pericoli' },
    { title: 'Benessere al lavoro', image: 'assets/img/benessere.png', route: 'benessere-al-lavoro' },
    { title: 'Patente di guida', image: 'assets/img/patente.png', route: 'patente' },
    { title: 'Edilizia', image: 'assets/img/edilizia.png', route: 'edilizia' },
    { title: 'Edilizia 2', image: 'assets/img/edilizia_2.png', route: 'edilizia-2' },
    { title: 'Assistenza alla persona', image: 'assets/img/assistenza_persona.png', route: 'assistenza-alla-persona' },
    { title: 'Pulizie', image: 'assets/img/pulizie.png', route: 'pulizie' }
];

const MENUSUBSECTION = [
    { title: 'Capiamo', image: 'assets/img/sub-section-capiamo.png', route: 'understand' },
    { title: 'Parliamo', image: 'assets/img/sub-section-parliamo.png', route: 'talk' },
    { title: 'Leggiamo', image: 'assets/img/sub-section-leggiamo.png', route: 'read' },
    { title: 'Scriviamo', image: 'assets/img/sub-section-scriviamo.png', route: 'write' },
    { title: 'Verifica finale', image: 'assets/img/sub-section-verifica_finale.png', route: 'final' }
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
