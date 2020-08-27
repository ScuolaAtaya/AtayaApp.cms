import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Ng2DeviceService } from 'ng2-device-detector';
import * as Ps from 'perfect-scrollbar';
import { AuthenticationService, User } from '../authentication/authentication.service';
import { UtilsService } from '../common/utils.service';
import { ApiService } from '../common/api.service';
import { LogService } from '../common/log.service';
declare var $: any;
const screenfull = require('screenfull');

@Component({
    selector: 'gene-layout',
    templateUrl: './main-material.html',
    styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav: any;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    dark = true;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn = false;
    root = 'ltr';
    chatpanelOpen = false;
    deviceInfo = null;
    user: User;
    sidenavOpen = true;
    sidenavMode = 'side';
    isMobile = false;
    isFullscreen = false;
    private _router: Subscription;
    private _mediaSubscription: Subscription;
    private _routerEventsSubscription: Subscription;

    constructor(
        public menuItems: MenuItems,
        public authenticationService: AuthenticationService,
        public translate: TranslateService,
        private router: Router,
        private media: ObservableMedia,
        private deviceService: Ng2DeviceService,
        private pageTitleService: PageTitleService,
        private utils: UtilsService,
        private api: ApiService,
        private logger: LogService
    ) {
        this.user = authenticationService.getUser();
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.pageTitleService.title.subscribe((val: string) => this.header = val);
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(
            (event: NavigationEnd) => this.url = event.url
        );
        if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
            }
        }
        this.deviceInfo = this.deviceService.getDeviceInfo();
        console.log(this.deviceInfo.device);
        if (this.deviceInfo.device === 'ipad' || this.deviceInfo.device === 'iphone' || this.deviceInfo.device === 'android') {
            this.sidenavMode = 'over';
            this.sidenavOpen = false;
        } else {
            this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
                const isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');
                this.isMobile = isMobile;
                this.sidenavMode = (isMobile) ? 'over' : 'side';
                this.sidenavOpen = !isMobile;
            });
            this._routerEventsSubscription = this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd && this.isMobile) {
                    this.sidenav.close();
                }
            });
        }
        if (this.dark) {
            $('body').addClass('dark-theme-active');
        }
    }

    ngOnDestroy() {
        this._router.unsubscribe();
        this._mediaSubscription.unsubscribe();
    }

    menuMouseOver(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this.sidenav.mode = 'over';
        }
    }

    menuMouseOut(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this.sidenav.mode = 'side';
        }
    }

    toggleFullscreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
            this.isFullscreen = !this.isFullscreen;
        }
    }

    customizerFunction() {
        this.customizerIn = !this.customizerIn;
    }

    addClassOnBody(event: any) {
        if (event.checked) {
            $('body').addClass('dark-theme-active');
        } else {
            $('body').removeClass('dark-theme-active');
        }
    }

    onActivate(scrollContainer: any) {
        scrollContainer.scrollTop = 0;
    }

    createBook() {
        this.utils.confirm('Sei sicuro di voler continuare?').subscribe(result => {
            if (result) {
                this.api.createBook().subscribe(
                    () => this.translate.get('Libro generato correttamente').subscribe((text: string) => this.logger.success(text))
                );
            }
        })
    }
}
