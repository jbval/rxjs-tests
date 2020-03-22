import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { watch } from 'rxjs-watcher';

@Component({
  selector: 'app-simple-reactive-form',
  templateUrl: './simple-reactive-form.component.html',
  styleUrls: ['./simple-reactive-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleReactiveFormComponent implements OnInit {
  formGroup: FormGroup;
  permissions$: Observable<string[]>;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      isOrganization: false
    });
    this.permissions$ = this.formGroup.get('isOrganization').valueChanges.pipe(
      watch('formChange', 10),
      map(isOrg => (isOrg ? ['View', 'Edit'] : ['View'])),
      watch('permissions', 10)
    );
  }
}
