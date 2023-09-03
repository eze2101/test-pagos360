import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { PageComingSoonComponent } from '../shared/components/page-coming-soon/page-coming-soon.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cobranzas',
      },
      {
        path: 'cobranzas',
        component: CollectionsComponent,
      },
      {
        path: 'reversiones',
        component: PageComingSoonComponent,
      },
      {
        path: 'devoluciones',
        component: PageComingSoonComponent,
      },
      {
        path: 'rendición',
        component: PageComingSoonComponent,
      },
      {
        path: 'retenciones-percepciones',
        component: PageComingSoonComponent,
      },
      {
        path: 'profile',
        component: PageComingSoonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
