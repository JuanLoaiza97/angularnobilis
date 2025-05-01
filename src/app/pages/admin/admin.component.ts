import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../layout/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../layout/footer-admin/footer-admin.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
