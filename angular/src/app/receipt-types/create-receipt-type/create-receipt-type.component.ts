import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ReceiptTypeServiceProxy, ReceiptTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-create-receipt-type-modal',
    templateUrl: './create-receipt-type.component.html'
})
export class CreateReceiptTypeComponent extends AppComponentBase {
    @ViewChild('createReceiptTypeModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    active = false;
    saving = false;

    receiptType: ReceiptTypeDto = null;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _receiptTypeService: ReceiptTypeServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.receiptType = new ReceiptTypeDto();
        this.receiptType.init({ isStatic: false });
        this.modal.show();
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {

        this.saving = true;
        this._receiptTypeService.create(this.receiptType)
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
