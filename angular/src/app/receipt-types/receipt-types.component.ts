import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ReceiptTypeServiceProxy, ReceiptTypeDto, PagedResultDtoOfReceiptTypeDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { CreateReceiptTypeComponent } from './create-receipt-type/create-receipt-type.component';
import { EditReceiptTypeComponent } from './edit-receipt-type/edit-receipt-type.component';

@Component({
    templateUrl: './receipt-types.component.html',
    animations: [appModuleAnimation()]
})
export class ReceiptTypesComponent extends PagedListingComponentBase<ReceiptTypeDto> implements OnInit {

    @ViewChild('createReceiptTypeModal') createReceiptTypeModal: CreateReceiptTypeComponent;
    @ViewChild('editReceiptTypeModal') editReceiptTypeModal: EditReceiptTypeComponent;

    receiptTypes: ReceiptTypeDto[] = [];
    constructor(
        private injector: Injector,
        private receiptTypesService: ReceiptTypeServiceProxy
    ) {
        super(injector);
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

        this.receiptTypesService.getAll('', request.skipCount, request.maxResultCount)
            .pipe(finalize(() => { finishedCallback() }))
            .subscribe((result: PagedResultDtoOfReceiptTypeDto) => {
                this.receiptTypes = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(receiptType: ReceiptTypeDto): void {
        abp.message.confirm(
            'Tem certeza que deseja excluir o tipo de comprovante \'' + receiptType.displayName + '\'?',
            'Excluir este tipo de comprovante',
            (result: boolean) => {
                if (result) {
                    this.receiptTypesService.delete(receiptType.id)
                        .pipe(finalize(() => {
                            abp.notify.info('O tipo de comprovante: ' + receiptType.displayName + ' foi detetado!');
                            this.refresh();
                        }))
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    createReceiptType(): void {
        this.createReceiptTypeModal.show();
    }

    editReceiptType(receiptType: ReceiptTypeDto): void {
        this.editReceiptTypeModal.show(receiptType.id);
    }
}
