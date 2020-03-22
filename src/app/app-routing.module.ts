import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class AppRoutingModule {}
