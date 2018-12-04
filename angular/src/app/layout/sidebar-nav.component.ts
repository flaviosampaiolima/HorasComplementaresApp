import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('Activity'), '', 'add_circle', '/app/home'),
        new MenuItem(this.l('HomePage'), '', 'dashboard', '/app/home'),
        new MenuItem(this.l('Delivery'), '', 'move_to_inbox', '/app/home'),
        new MenuItem(this.l('Report'), '', 'report', '/app/home'),
        new MenuItem(this.l('Configurações'), '', 'menu', '', [
            new MenuItem('Cadastro de Regras', '', 'keyboard_arrow_right', '', [
                new MenuItem('Regras Gerais', '', 'build', '#')
            ]),
            new MenuItem('Cadastro de Usuários', '', 'keyboard_arrow_right', '', [
                new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
                new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
            ]),
            new MenuItem('Cadastro de Paramêtros', '', 'keyboard_arrow_right', '', [
                new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
                new MenuItem(this.l('Courses'), 'Pages.Courses', 'school', '/app/courses'),
                new MenuItem(this.l('ActivityTypes'), '', 'loyalty', '/app/activity-types'),
                new MenuItem(this.l('ReceiptTypes'), '', 'receipt', '/app/receipt-types')
            ])
        ]),
        new MenuItem(this.l('About'), '', 'info', '/app/about')

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
