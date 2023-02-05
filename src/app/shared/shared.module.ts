import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [HomePageComponent, AboutPageComponent, SidebarComponent],

  // mismo module xq ya se importo 1 vez
  imports: [CommonModule, RouterModule],

  exports: [HomePageComponent, AboutPageComponent, SidebarComponent],
})
export class SharedModule {}
