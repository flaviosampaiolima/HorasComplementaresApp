import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CourseServiceProxy, CourseDto, ListResultDtoOfTenantDto, TenantDto } from '@shared/service-proxies/service-proxies';
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

    course: CourseDto = null;
    tenants: TenantDto[] = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _courseService: CourseServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this._courseService.getTenants()
        .subscribe((result) => {
            this.tenants = result.items;
        });
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
        /* const permissions = [];
        $(this.modalContent.nativeElement).find('[name=permission]').each(
            (index: number, elem: Element) => {
                if ($(elem).is(':checked')) {
                    permissions.push(elem.getAttribute('value').valueOf());
                }
            }
        );
        this.course.permissions = permissions;
        */

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
