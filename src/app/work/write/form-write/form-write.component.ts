import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from 'environments/environment';
import { Router } from '@angular/router'
import { Write } from './../write';
import { Section, SectionSolverService } from '../../section-solver.service'
import { WriteService } from './../write.service';
import {ActivatedRoute} from "@angular/router"
import { AuthenticationService } from './../../../authentication/authentication.service';

@Component({
  selector: 'ms-form-write',
  templateUrl: './form-write.component.html',
  styleUrls: ['./form-write.component.scss'], encapsulation: ViewEncapsulation.None,
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class FormWriteComponent implements OnInit {

  public cardTitle: string
  public cardSubmitButtonTitle: string
  public section: Section;

  public id: string
  public write: Write

  public form: FormGroup;
  public picture: string
  public letters: string[];

  constructor(private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private writeService: WriteService,
    private route: ActivatedRoute,
    private sectionService: SectionSolverService,
    private router: Router,
    public auth: AuthenticationService) { }

  ngOnInit() {
    this.cardTitle = 'Carica il nuovo esercizio'
    this.cardSubmitButtonTitle = 'Carica esercizio'

    this.route.params.subscribe(params => {
      this.pageTitleService.setTitle("Scriviamo");
      this.section = this.sectionService.retrieveSection(params);
      this.id = String(params['id'])

      if (this.id !== 'undefined') {
        this.cardTitle = 'Modifica l\'esercizio'
        this.cardSubmitButtonTitle = 'Modifica esercizio'
        this.writeService.getOne(this.id).subscribe(
          res => {
            this.write = res as Write
            this.objToForm(this.write)
          },
          err => console.log('Error occured : ' + err)
        )
      }

      this.form = this.fb.group({
        title: [null, Validators.compose([Validators.required])],
        word: [null, Validators.compose([Validators.required])]
      });

      this.letters = []
    })
  }

  onFileNameChanged(fileName: string) {
    this.picture = fileName
  }

  public onSubmit() {
    if (this.isFormValid()) {
      if (this.id !== 'undefined') {
        this.writeService.update(this.formToObj(), this.id).subscribe(
          res => {
            console.log(res)
            this.goToListPage()
          },
          err => console.log('Error occured : ' + err)
        )
      }
      else {
        this.writeService.create(this.formToObj()).subscribe(
          res => {
            console.log(res)
            this.goToListPage()
          },
          err => console.log('Error occured : ' + err)
        )
      }
    }
  }

  isFormValid() {
    return (this.form.valid && this.picture !== undefined)
  }

  public goToListPage() {
    this.router.navigate([this.section.name + '/write'])
  }

  public objToForm(write: Write) {
    this.form.controls.title.setValue(write.title)
    this.form.controls.word.setValue(write.word)
    this.letters = write.letters
    this.picture = write.picture
  }

  public formToObj() {
    let write = new Write()
    write.unit_id = this.section.id
    if (this.write) {
      write = this.write
    }
    write.title = this.form.controls.title.value
    write.word = this.form.controls.word.value
    write.picture = this.picture
    write.letters = this.letters
    return write
  }
}
