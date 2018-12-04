import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivityTypeServiceProxy, ActivityTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-activity-type-modal',
    templateUrl: './create-activity-type.component.html'
})
export class CreateActivityTypeComponent extends AppComponentBase {
    @ViewChild('createActivityTypeModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active = false;
    saving = false;

    activityType: ActivityTypeDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _activityTypeService: ActivityTypeServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.activityType = new ActivityTypeDto();
        this.activityType.init({ isStatic: false });
        this.modal.show();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {

        this.saving = true;
        this._activityTypeService.create(this.activityType)
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
