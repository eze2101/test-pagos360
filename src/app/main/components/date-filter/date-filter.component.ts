import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment';
import * as moment from 'moment';

import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DateFilterComponent implements OnInit {
  @Output() date = new EventEmitter<string>();
  dateForm!: FormGroup;
  limitDate: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.limitDate.setDate(this.limitDate.getDate() - 1);
    this.createForm();
    this.emitDate();
  }

  createForm(): void {
    this.dateForm = this.fb.group({
      date: [],
    });
  }

  emitDate() {
    this.dateForm.get('date')?.valueChanges.subscribe((resp) => {
      this.date.emit(moment(resp._d).format('DD-MM-YYYY'));
    });
  }
}
