import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CourseDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-course-modal',
    templateUrl: './create-course.component.html'
})
export class CreateCourseComponent extends AppComponentBase {
    @ViewChild('createCourseModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active = false;
    saving = false;

    course: CourseDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _courseService: CourseServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.course = new CourseDto();
        this.course.init({ isStatic: false });
        this.modal.show();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {

        this.saving = true;
        this._courseService.create(this.course)
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
