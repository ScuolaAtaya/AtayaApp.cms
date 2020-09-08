import { Option } from './../../options';
import { Observable } from 'rxjs/Observable';
import { Media } from './../../media';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../../core/route-animation/route.animation';
import { Read } from '../read';
import { Section, SectionSolverService } from '../../section-solver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadService } from './../read.service';
import { TranslateService } from 'ng2-translate';
import { environment } from 'environments/environment';
import { Marker } from 'app/work/marker';

@Component({
  selector: 'ms-form-read',
  templateUrl: './form-read.component.html',
  styleUrls: ['./form-read.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class FormReadComponent implements OnInit {
  form: FormGroup;
  cardTitle: string;
  cardSubmitButtonTitle: string;
  id: string;
  read: Read;
  picture: Media;
  section: Section;
  options: Option[];
  url: string;
  markers: Marker[];

  constructor(
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private readService: ReadService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.picture = new Media();
    this.options = [];
    this.markers = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.translate.get('Leggiamo').subscribe((translatedText: string) => this.pageTitleService.setTitle(translatedText));
      this.section = this.sectionService.retrieveSection(params);
      this.id = params['id'];
      this.cardTitle = !!this.id ? 'Modifica l\'esercizio' : 'Carica il nuovo esercizio';
      this.cardSubmitButtonTitle = !!this.id ? 'Modifica esercizio' : 'Carica esercizio';
      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])]
      });
      if (!!this.id) {
        this.readService.getOne(this.id).subscribe(
          res => {
            this.read = res as Read;
            this.objToForm(this.read);
          },
          err => console.log('Error occured : ' + err)
        );
      }
    });
  }

  onPictureChanged(event: Media) {
    this.picture = event;
    this.markers = [];
    this.url = this.getMediaUr(this.picture.value);
  }

  onSubmit() {
    if (this.isFormValid()) {
      const observable$ = !!this.id ? this.readService.update(this.formToObj(), this.id) : this.readService.create(this.formToObj());
      this.handleRequest(observable$);
    }
  }

  isFormValid() {
    return this.form.valid && !!this.picture.value;
  }

  addMarker() {
    const newId = this.markers.length + 1;
    this.markers = this.markers.concat({ x: 0, y: 0, id: newId });
  }

  deleteLastMarker() {
    this.markers = this.markers.slice(0, this.markers.length - 1);
  }

  goToListPage() {
    this.router.navigate([this.section.name + '/read']);
  }

  private objToForm(read: Read) {
    this.form.controls.title.setValue(read.title);
    this.picture = read.picture;
    this.options = read.options;
    this.markers = read.markers;
    this.url = this.getMediaUr(read.picture.value);
  }

  private formToObj() {
    let read = new Read();
    read.unit_id = this.section.id;
    if (!!this.read) {
      read = this.read;
    }
    read.title = this.form.controls.title.value;
    read.picture = this.picture;
    read.options = this.options;
    read.markers = this.markers;
    return read;
  }

  private handleRequest(observable$: Observable<any>) {
    observable$.subscribe(
      () => this.goToListPage(),
      (err: any) => console.log('Error occured : ' + err)
    );
  }

  private getMediaUr(url: string): string {
    return environment.baseUrlImage + '/' + url;
  }
}
