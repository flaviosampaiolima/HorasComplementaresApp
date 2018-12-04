import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivityTypeServiceProxy, ActivityTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-edit-activity-type-modal',
    templateUrl: './edit-activity-type.component.html'
})
export class EditActivityTypeComponent extends AppComponentBase {

    @ViewChild('editActivityTypeModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    model: ActivityTypeDto = null;

    constructor(
        injector: Injector,
        private _activityTypeService: ActivityTypeServiceProxy
    ) {
        super(injector);
    }

    show(id: number): void {
        console.log('Id do Tipo de Atividade: ' + id);

        console.log(this.modal);

       this._activityTypeService.get(id)
            .pipe(finalize(() => {
                this.active = true;
                this.modal.show();
            }))
            .subscribe((result: ActivityTypeDto) => {
                this.model = result;
            });

    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        const activityType = this.model;

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
        const input = new ActivityTypeDto();

        input.name = activityType.name;
        input.displayName = activityType.displayName
        input.description = activityType.description;
        input.id = activityType.id;

        this._activityTypeService.update(input)
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
