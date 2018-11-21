import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l("HomePage"), "", "home", "/app/home"),

        new MenuItem(this.l("Tenants"), "Pages.Tenants", "business", "/app/tenants"),
        new MenuItem(this.l("Users"), "Pages.Users", "people", "/app/users"),
        new MenuItem(this.l("Roles"), "Pages.Roles", "local_offer", "/app/roles"),
        new MenuItem(this.l("Courses"), "Pages.Courses", "school", "/app/courses"),

        new MenuItem(this.l("Configurações"), "", "menu", "", [
            new MenuItem("Definição de Regras", "", "", "", [
                new MenuItem("Quantidade de horas por Atividade", "", "", "#"),
                new MenuItem("Atividades por Curso", "", "", "#"),
                new MenuItem("Definição de SLA", "", "", "#"),
                new MenuItem("Regras Gerais", "", "", "#")
            ]),
            new MenuItem("Cadastro de Paramêtros", "", "", "", [
                new MenuItem("Tipo de Curso", "", "", "#"),
                new MenuItem("Tipo de Comprovante", "", "", "#"),
                new MenuItem("Tipo de Documento", "", "", "#"),
                new MenuItem("Tipo de Atividade", "", "", "#"),
                new MenuItem("Tipo de Relatório", "", "", "#")
            ])
        ]),
        new MenuItem(this.l("About"), "", "info", "/app/about")

    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}