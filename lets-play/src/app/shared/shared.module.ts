import { NgModule } from "@angular/core";
import { CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import { MaterialModule } from "../material.module";
import { NavbarComponent } from "./navbar/navbar.component";
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [CommonModule, MaterialModule, NavbarComponent, FormsModule],
  declarations: [NavbarComponent]
})
export class SharedModule { }
