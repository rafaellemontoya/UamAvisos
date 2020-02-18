import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { VerRegistroComponent } from './pages/ver-registro/ver-registro.component';
import { EditarRegistroComponent } from './pages/editar-registro/editar-registro.component';
import { VerParticipanteComponent } from './pages/ver-participante/ver-participante.component';
import { CodigosPromoComponent } from './pages/codigos-promo/codigos-promo.component';
import { AgregarDatosFacturaComponent } from './pages/agregar-datos-factura/agregar-datos-factura.component';
import { NuevaCortesiaComponent } from './pages/nueva-cortesia/nueva-cortesia.component';

const routes: Routes = [{path: '', component: LoginComponent },
{path: 'login', component: LoginComponent },
{path: 'ver-registro', component: VerRegistroComponent },
{path: 'editar-registro/:id', component: EditarRegistroComponent },
{path: 'ver-participante/:id', component: VerParticipanteComponent },
{path: 'codigos-descuento', component: CodigosPromoComponent },
{path: 'agregar-datos-factura', component: AgregarDatosFacturaComponent },
{path: 'nueva-cortesia', component: NuevaCortesiaComponent },

{ path: '**', pathMatch: 'full', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
