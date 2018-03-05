import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation, AnimationTransitionEvent }      from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import { Ng2DeviceService } from 'ng2-device-detector';
import * as Ps from 'perfect-scrollbar';
declare var $ : any;

const screenfull = require('screenfull');

@Component({
    selector: 'gene-layout',
  	templateUrl:'./main-material.html',
  	styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy{
    
    private _router: Subscription;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    dark: boolean = true;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    root = 'ltr';
    chatpanelOpen: boolean = false;
    deviceInfo = null;
    
    private _mediaSubscription: Subscription;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    
    @ViewChild('sidenav') sidenav;

	constructor( public menuItems: MenuItems, private breadcrumbService: BreadcrumbService, private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router, private media: ObservableMedia, private deviceService: Ng2DeviceService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');



        breadcrumbService.addFriendlyNameForRoute('/dashboard', 'Dashboard');
        breadcrumbService.addFriendlyNameForRoute('/dashboard/dashboard-v1', 'Dashboard V1');
        breadcrumbService.addFriendlyNameForRoute('/dashboard/dashboard-v2', 'Dashboard V2');
        breadcrumbService.addFriendlyNameForRoute('/file-manager', 'File Manager');
        breadcrumbService.addFriendlyNameForRoute('/inbox', 'Apps / Inbox');
        breadcrumbService.addFriendlyNameForRoute('/chat', 'Apps / Chat');
        breadcrumbService.addFriendlyNameForRoute('/calendar', 'Apps / Calendar');
        breadcrumbService.addFriendlyNameForRoute('/editor', 'Editor');
        breadcrumbService.addFriendlyNameForRoute('/editor/wysiwyg', 'Wysiwyg');
        breadcrumbService.addFriendlyNameForRoute('/editor/ckeditor', 'Ckeditor');
        breadcrumbService.addFriendlyNameForRoute('/icons', 'Material Icons');
        breadcrumbService.addFriendlyNameForRoute('/components', 'Components');
        breadcrumbService.addFriendlyNameForRoute('/components/buttons', 'Buttons');
        breadcrumbService.addFriendlyNameForRoute('/components/cards', 'Cards');
        breadcrumbService.addFriendlyNameForRoute('/components/grid', 'Grid');
        breadcrumbService.addFriendlyNameForRoute('/components/list', 'List');
        breadcrumbService.addFriendlyNameForRoute('/components/menu', 'Menu');
        breadcrumbService.addFriendlyNameForRoute('/components/slider', 'Slider');
        breadcrumbService.addFriendlyNameForRoute('/components/snackbar', 'Snackbar');
        breadcrumbService.addFriendlyNameForRoute('/components/dialog', 'Dialog');
        breadcrumbService.addFriendlyNameForRoute('/components/select', 'Select');
        breadcrumbService.addFriendlyNameForRoute('/components/input', 'Input');
        breadcrumbService.addFriendlyNameForRoute('/components/colorpicker', 'Colorpicker');
        breadcrumbService.addFriendlyNameForRoute('/checkbox', 'Checkbox');
        breadcrumbService.addFriendlyNameForRoute('/components/radio', 'Radio');
        breadcrumbService.addFriendlyNameForRoute('/components/toolbar', 'Toolbar');
        breadcrumbService.addFriendlyNameForRoute('/components/progress', 'Progress');
        breadcrumbService.addFriendlyNameForRoute('/components/tabs', 'Tabs');
        breadcrumbService.addFriendlyNameForRoute('/dragndrop', 'Drag and Drop');
        breadcrumbService.addFriendlyNameForRoute('/dragndrop/dragula', 'Dragula');
        breadcrumbService.addFriendlyNameForRoute('/dragndrop/sortable', 'SortableJS');
        breadcrumbService.addFriendlyNameForRoute('/chart', 'Charts');
        breadcrumbService.addFriendlyNameForRoute('/chart/ng2-charts', 'NG2 Charts');
        breadcrumbService.addFriendlyNameForRoute('/chart/easy-pie-chart', 'Easy Pie');
        breadcrumbService.addFriendlyNameForRoute('/tables', 'Table');
        breadcrumbService.addFriendlyNameForRoute('/tables/fullscreen', 'Full Screen');
        breadcrumbService.addFriendlyNameForRoute('/tables/selection', 'Selection');
        breadcrumbService.addFriendlyNameForRoute('/tables/pinning', 'Pinning');
        breadcrumbService.addFriendlyNameForRoute('/tables/sorting', 'Sorting');
        breadcrumbService.addFriendlyNameForRoute('/tables/Paging', 'Paging');
        breadcrumbService.addFriendlyNameForRoute('/tables/editing', 'Editing');
        breadcrumbService.addFriendlyNameForRoute('/tables/filter', 'Filter');
        breadcrumbService.addFriendlyNameForRoute('/tables/responsive', 'Responsive');
        breadcrumbService.addFriendlyNameForRoute('/forms', 'Forms');
        breadcrumbService.addFriendlyNameForRoute('/forms/form-wizard', 'Form Wizard');
        breadcrumbService.addFriendlyNameForRoute('/forms/form-validation', 'Form Validation');
        breadcrumbService.addFriendlyNameForRoute('/forms/form-upload', 'Form Upload');
        breadcrumbService.addFriendlyNameForRoute('/forms/form-tree', 'Tree');
        breadcrumbService.addFriendlyNameForRoute('/maps', 'Maps');
        breadcrumbService.addFriendlyNameForRoute('/maps/googlemap', 'Google Map');
        breadcrumbService.addFriendlyNameForRoute('/maps/leaflet', 'Leaflet Map');
        breadcrumbService.addFriendlyNameForRoute('/pages', 'Pages');
        breadcrumbService.addFriendlyNameForRoute('/pages/media', 'Gallery');
        breadcrumbService.addFriendlyNameForRoute('/pages/pricing', 'Pricing');
        breadcrumbService.addFriendlyNameForRoute('/pages/blank', 'Blank');
        breadcrumbService.addFriendlyNameForRoute('/users', 'Users');
        breadcrumbService.addFriendlyNameForRoute('/users/userprofile', 'User Profile');
        breadcrumbService.addFriendlyNameForRoute('/users/userlist', 'User List');
        breadcrumbService.addFriendlyNameForRoute('/session', 'Session');
        breadcrumbService.addFriendlyNameForRoute('/session/login', 'Login');
        breadcrumbService.addFriendlyNameForRoute('/session/register', 'Register');
        breadcrumbService.addFriendlyNameForRoute('/session/forgot-password', 'Forgot');
        breadcrumbService.addFriendlyNameForRoute('/session/lockscreen', 'Lock Screen');
    }

    ngOnInit() {
        this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
        });
        
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.url = event.url;
        });
        
        if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
           

            if (window.matchMedia(`(min-width: 960px)`).matches) {
                Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });  
            }
        }
        
        this.deviceInfo = this.deviceService.getDeviceInfo();
        console.log(this.deviceInfo.device);
        if(this.deviceInfo.device == 'ipad' || this.deviceInfo.device == 'iphone' || this.deviceInfo.device == 'android' ){
            this.sidenavMode = 'over';
            this.sidenavOpen = false;
        }else{
            this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
                let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

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
    }

    ngOnDestroy() {
        this._router.unsubscribe();
        this._mediaSubscription.unsubscribe();
    }

	isFullscreen: boolean = false;
    
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
    
    addClassOnBody(event) {
        if(event.checked){
            $('body').addClass('dark-theme-active');
        }else{
            $('body').removeClass('dark-theme-active');
        }
    }

    addMenuItem(): void {
        this.menuItems.add({
            state: 'pages',
            name: 'GENE MENU',
            type: 'sub',
            icon: 'trending_flat',
            children: [
                {state: 'blank', name: 'SUB MENU1'},
                {state: 'blank', name: 'SUB MENU2'}
            ]
        });
    }
    
    onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

}


