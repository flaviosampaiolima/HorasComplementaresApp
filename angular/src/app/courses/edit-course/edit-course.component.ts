import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CourseDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { TenantChangeComponent } from 'account/tenant/tenant-change.component';

@Component({
    selector: 'app-edit-course-modal',
    templateUrl: './edit-course.component.html'
})
export class EditCourseComponent extends AppComponentBase {
    @ViewChild('editCourseModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active: boolean = false;
    saving: boolean = false;

    model: CourseDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _courseService: CourseServiceProxy
    ) {
        super(injector);
    }

    show(id: number): void {
        this._courseService.get(id)
            .pipe(finalize(() => {
                this.active = true;
                this.modal.show();
            }))
            .subscribe((result: CourseDto) => {
                this.model = result;
            });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    /* checkPermission(permissionName: string): string {
        if (this.model.grantedPermissionNames.indexOf(permissionName) !== -1) {
            return 'checked';
        } else {
            return '';
        }
    } */

    save(): void {
        const course = this.model;

        let tenantId;
        $(this.modalContent.nativeElement).find('[name=tenant]').each(
            function (index: number, elem: Element) {
                if ($(elem).is(':checked') === true) {
                    // tenants.push(elem.getAttribute('value').valueOf());
                    tenantId = elem.getAttribute('value').valueOf();
                }
            }
        )

        this.saving = true;
        const input = new CourseDto();

        input.title = course.title;
        input.description = course.description;
        input.id = course.id;
        input.tenantId = tenantId;


        this._courseService.update(input)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
