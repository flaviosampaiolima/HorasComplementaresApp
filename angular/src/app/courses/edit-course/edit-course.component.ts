import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CourseDto, TenantDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-edit-course-modal',
    templateUrl: './edit-course.component.html'
})
export class EditCourseComponent extends AppComponentBase {
    @ViewChild('editCourseModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active = false;
    saving = false;

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

    save(): void {
        const course = this.model;

        /* let tenantId;
        $(this.modalContent.nativeElement).find('[name=tenant]').each(
            function (index: number, elem: Element) {
                if ($(elem).is(':checked') === true) {
                    // tenants.push(elem.getAttribute('value').valueOf());
                    tenantId = elem.getAttribute('value').valueOf();
                }
            }
        ) */

        this.saving = true;
        const input = new CourseDto();

        input.name = course.name;
        input.displayName = course.displayName
        input.description = course.description;
        input.id = course.id;

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
