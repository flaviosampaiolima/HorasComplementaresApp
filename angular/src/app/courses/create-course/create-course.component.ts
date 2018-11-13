import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CreateCourseDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-course-modal',
    templateUrl: './create-course.component.html'
})
export class CreateCourseComponent extends AppComponentBase implements OnInit {
    @ViewChild('createCourseModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active: boolean = false;
    saving: boolean = false;

    permissions: ListResultDtoOfPermissionDto = null;
    course: CreateCourseDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _courseService: CourseServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._courseService.getAllPermissions()
            .subscribe((permissions: ListResultDtoOfPermissionDto) => {
                this.permissions = permissions;
            });
    }

    show(): void {
        this.active = true;
        this.course = new CreateCourseDto();
        this.course.init({ isStatic: false });

        this.modal.show();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        const permissions = [];
        $(this.modalContent.nativeElement).find('[name=permission]').each(
            (index: number, elem: Element) => {
                if ($(elem).is(':checked')) {
                    permissions.push(elem.getAttribute('value').valueOf());
                }
            }
        );

        this.course.permissions = permissions;

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
