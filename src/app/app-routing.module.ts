import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SimpleReactiveFormComponent } from './simple-reactive-form/simple-reactive-form.component';
import { SharedReplayComponent } from './shared-replay/shared-replay.component';

const routes: Routes = [
  {
    path: 'reactiveForm',
    component: SimpleReactiveFormComponent
  },
  {
    path: 'shareReplay',
    component: SharedReplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AppRoutingModule {}
