import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { LoginadminComponent } from './pages/loginadmin/loginadmin.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MiperfilComponent } from './pages/miperfil/miperfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminaddComponent } from './pages/adminadd/adminadd.component';
import { InmuebleinfoComponent } from './pages/inmuebleinfo/inmuebleinfo.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'propiedades', component: PropiedadesComponent },
  { path: 'loginadmin', component: LoginadminComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'miperfil', component: MiperfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'adminadd', component: AdminaddComponent },
  { path: 'inmuebleinfo/:id', component: InmuebleinfoComponent },
];

  