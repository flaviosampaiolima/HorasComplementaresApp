import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { ActivityTypeServiceProxy, ActivityTypeDto, PagedResultDtoOfActivityTypeDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { CreateActivityTypeComponent } from './create-activity-type/create-activity-type.component';
import { EditActivityTypeComponent } from './edit-activity-type/edit-activity-type.component';

@Component({
    templateUrl: './activity-types.component.html',
    animations: [appModuleAnimation()]
})
export class ActivityTypesComponent extends PagedListingComponentBase<ActivityTypeDto> implements OnInit {

    @ViewChild('createActivityTypeModal') createActivityTypeModal: CreateActivityTypeComponent;
    @ViewChild('editActivityTypeModal') editActivityTypeModal: EditActivityTypeComponent;

    activityTypes: ActivityTypeDto[] = [];
    constructor(
        private injector: Injector,
        private activityTypesService: ActivityTypeServiceProxy
    ) {
        super(injector);
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

        this.activityTypesService.getAll('', request.skipCount, request.maxResultCount)
            .pipe(finalize(() => { finishedCallback() }))
            .subscribe((result: PagedResultDtoOfActivityTypeDto) => {
                this.activityTypes = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(activityType: ActivityTypeDto): void {
        abp.message.confirm(
            'Tem certeza que deseja excluir o tipo de atividade \'' + activityType.displayName + '\'?',
            'Excluir este tipo de atividade',
            (result: boolean) => {
                if (result) {
                    this.activityTypesService.delete(activityType.id)
                        .pipe(finalize(() => {
                            abp.notify.info('O tipo de atividade: ' + activityType.displayName + ' foi detetado!');
                            this.refresh();
                        }))
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    createActivityType(): void {
        this.createActivityTypeModal.show();
    }

    editActivityType(activityType: ActivityTypeDto): void {
        this.editActivityTypeModal.show(activityType.id);
    }
}
