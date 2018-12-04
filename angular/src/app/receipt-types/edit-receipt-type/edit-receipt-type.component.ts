import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ReceiptTypeServiceProxy, ReceiptTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-edit-receipt-type-modal',
    templateUrl: './edit-receipt-type.component.html'
})
export class EditReceiptTypeComponent extends AppComponentBase {

    @ViewChild('editReceiptTypeModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    model: ReceiptTypeDto = null;

    constructor(
        injector: Injector,
        private _receiptTypeService: ReceiptTypeServiceProxy
    ) {
        super(injector);
    }

    show(id: number): void {
        console.log('Id do Tipo de Atividade: ' + id);

        console.log(this.modal);

       this._receiptTypeService.get(id)
            .pipe(finalize(() => {
                this.active = true;
                this.modal.show();
            }))
            .subscribe((result: ReceiptTypeDto) => {
                this.model = result;
            });

    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        const receiptType = this.model;

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
        const input = new ReceiptTypeDto();

        input.name = receiptType.name;
        input.displayName = receiptType.displayName
        input.description = receiptType.description;
        input.id = receiptType.id;

        this._receiptTypeService.update(input)
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
