import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SortablejsModule, SortablejsOptions } from "angular-sortablejs";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { CKEditorModule } from 'ng2-ckeditor';
import { ColorPickerModule } from 'ngx-color-picker';
import { MdNativeDateModule } from '@angular/material';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { TreeModule as NgTreeModule } from 'ng2-tree';
import { TreeModule } from 'angular-tree-component';
import 'hammerjs';

import { GeneAppComponent } from './app.component';
import { RoutingModule } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';
import { D3ChartService } from "./core/nvD3/nvD3.service";
import { nvD3 } from "./core/nvD3/nvD3.component";

import { DashboardComponent } from './dashboard/dashboard.component';

import { InboxComponent } from './inbox/inbox.component';
import { MailService } from "./inbox/mail.service";
import { InboxComposeComponent } from './inbox/inbox-compose/inbox-compose.component';

import { ChatComponent } from './chat/chat.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditorComponent } from './editor/wysiwyg-editor/editor.component';
import { Ckeditor } from './editor/ckeditor/ckeditor.component';
import { MaterialIconComponent } from './material-icons/icons.component';
import { ChartComponent } from './chart/ng2-charts/chart.component';
import { EasyPieChartComponent } from './chart/easy-pie-chart/easy-pie-chart.component';

import { CardsComponent } from './components/cards/cards.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GridListComponent } from './components/grid-list/gridlist.component';
import { ListOverviewComponent } from './components/list/list.component';
import { MenuOverviewComponent } from './components/menu/menu.component';
import { SliderOverviewComponent } from './components/slider/slider.component';
import { SnackbarOverviewComponent } from './components/snackbar/snackbar.component';
import { TooltipOverviewComponent } from './components/tooltip/tooltip.component';
import { DialogOverviewComponent, DemoDialog } from './components/dialog/dialog.component';
import { SelectComponent } from './components/select/select.component';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProgressComponent } from './components/progress/progress.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ColorpickerComponent } from './components/colorpicker/colorpicker.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

import { DragulaDemoComponent } from './drag-and-drop/dragula/dragula.component';
import { SortableDemoComponent } from './drag-and-drop/sortablejs/sortable.component';

import { FullscreenTableComponent } from './tables/table-fullscreen/table-fullscreen.component';
import { EditingTableComponent } from './tables/table-editing/table-editing.component';
import { FilterTableComponent } from './tables/table-filter/table-filter.component';
import { PagingTableComponent } from './tables/table-paging/table-paging.component';
import { SortingTableComponent } from './tables/table-sorting/table-sorting.component';
import { PinningTableComponent } from './tables/table-pinning/table-pinning.component';
import { SelectionTableComponent } from './tables/table-selection/table-selection.component';
import { ResponsiveTableComponent } from './tables/table-responsive/table-responsive.component';

import { FormWizardComponent } from './forms/form-wizard/formwizard.component';
import { FormValidationComponent } from './forms/form-validation/formvalidation.component';
import { FormUploadComponent } from './forms/form-upload/formupload.component';
import { FormTreeComponent } from './forms/form-tree/formtree.component';

import { GoogleMapComponent } from './maps/google-map/googlemap.component';
import { LeafletMapComponent } from './maps/leaflet-map/leafletmap.component';

import { MediaComponent } from './custom-pages/media/media.component';
import { PricingComponent } from './custom-pages/pricing/pricing.component';
import { BlankComponent } from './custom-pages/blank/blank.component';

import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserListComponent } from './users/user-list/userlist.component';

import { LoginComponent } from './session/login/login.component';
import { RegisterComponent } from './session/register/register.component';
import { ForgotPasswordComponent } from './session/forgot-password/forgot-password.component';
import { LockScreenComponent } from './session/lockscreen/lockscreen.component';

import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
import { StackedAreaChartComponent } from './widgets/stacked-area-chart/stacked-area-chart.component';

import { FileManagerComponent } from './file-manager/file-manager.component'
import { WriteComponent } from './work/write/write.component';
import { ReadComponent } from './work/read/read.component';
import { TalkComponent } from './work/talk/talk.component';
import { UnderstandComponent } from './work/understand/understand.component';
import { FormWriteComponent } from './work/write/form-write/form-write.component';
import { DashboardItems } from './dashboard/dashboard-items';
import { FormTalkComponent } from './work/talk/form-talk/form-talk.component';
import { WriteModule } from './work/write/write.module';
import { ReadModule } from './work/read/read.module';
import { UnderstandModule } from './work/understand/understand.module';
import { TalkModule } from './work/talk/talk.module';
import { WorkModule } from './work/work.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token-interceptor';
import { WorkListMenuItems } from './work/work-list-menu-items';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

const sortablejsConfig: SortablejsOptions = {
	animation: 300
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		Ng2DeviceDetectorModule.forRoot(),
		RoutingModule,
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		CalendarModule.forRoot(),
		AgmCoreModule.forRoot({ apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk' }),
		QuillModule,
		CKEditorModule,
		DragulaModule,
		SortablejsModule,
		FileUploadModule,
		NgxDatatableModule,
		MdNativeDateModule,
		TreeModule,
		NgTreeModule,
		ChartsModule,
		EasyPieChartModule,
		ColorPickerModule,
		PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
		MenuToggleModule,
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
		WorkModule,
		AuthenticationModule
	],
	declarations: [
		GeneAppComponent,
		MainComponent,
		DashboardComponent,
		InboxComponent,
		InboxComposeComponent,
		ChatComponent,
		CalendarComponent,
		EditorComponent,
		Ckeditor,
		MaterialIconComponent,
		ChartComponent,
		EasyPieChartComponent,
		ButtonsComponent,
		CardsComponent,
		GridListComponent,
		ListOverviewComponent,
		MenuOverviewComponent,
		SliderOverviewComponent,
		SnackbarOverviewComponent,
		TooltipOverviewComponent,
		DialogOverviewComponent,
		DemoDialog,
		SelectComponent,
		InputComponent,
		CheckboxComponent,
		RadioComponent,
		ToolbarComponent,
		ProgressComponent,
		TabsComponent,
		ColorpickerComponent,
		DatepickerComponent,
		DragulaDemoComponent,
		SortableDemoComponent,
		FullscreenTableComponent,
		EditingTableComponent,
		FilterTableComponent,
		PagingTableComponent,
		SortingTableComponent,
		PinningTableComponent,
		SelectionTableComponent,
		ResponsiveTableComponent,
		FormWizardComponent,
		FormValidationComponent,
		FormUploadComponent,
		FormTreeComponent,
		GoogleMapComponent,
		LeafletMapComponent,
		MediaComponent,
		UserListComponent,
		PricingComponent,
		BlankComponent,
		UserProfileComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		LockScreenComponent,
		LineChartComponent,
		PieChartComponent,
		StackedAreaChartComponent,
		nvD3,
		FileManagerComponent,
		ConfirmDialogComponent
	],
	entryComponents: [
		DemoDialog,
		InboxComposeComponent,
		ConfirmDialogComponent
	],
	bootstrap: [GeneAppComponent],
	providers: [
		MailService,
		D3ChartService,
		MenuItems,
		WorkListMenuItems,
		PageTitleService,
		DashboardItems,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class GeneAppModule { }
