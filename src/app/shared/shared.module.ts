import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';

import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SearchBoxComponent,
    SidebarComponent,
  ],

  // mismo module xq ya se importo 1 vez
  imports: [CommonModule, RouterModule],

  exports: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SearchBoxComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
