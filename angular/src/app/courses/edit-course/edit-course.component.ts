import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CourseDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

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

    checkPermission(permissionName: string): string {
        if (this.model.grantedPermissionNames.indexOf(permissionName) !== -1) {
            return 'checked';
        } else {
            return '';
        }
    }

    save(): void {
        const course = this.model.course;

        const permissions = [];
        $(this.modalContent.nativeElement).find('[name=permission]').each(
            function (index: number, elem: Element) {
                if ($(elem).is(':checked') == true) {
                    permissions.push(elem.getAttribute('value').valueOf());
                }
            }
        )

        this.saving = true;
        const input = new CourseDto();

        input.name = course.name;
        input.displayName = course.displayName;
        input.description = course.description;
        input.id = course.id;
        input.isStatic = course.isStatic;
        input.permissions = permissions;


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
