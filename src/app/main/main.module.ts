import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { TableComponent } from './components/table/table.component';
import { MainComponent } from './pages/main/main.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [
    DateFilterComponent,
    TableComponent,
    MainComponent,
    CollectionsComponent,
  ],
  imports: [CommonModule, MainRoutingModule, HeaderComponent],
})
export class MainModule {}
