import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { CourseServiceProxy, CourseDto, PagedResultDtoOfCourseDto, TenantDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateCourseComponent } from 'app/courses/create-course/create-course.component';
import { EditCourseComponent } from 'app/courses/edit-course/edit-course.component';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './courses.component.html',
    animations: [appModuleAnimation()]
})
export class CoursesComponent extends PagedListingComponentBase<CourseDto> implements OnInit {

    @ViewChild('createCourseModal') createCourseModal: CreateCourseComponent;
    @ViewChild('editCourseModal') editCourseModal: EditCourseComponent;

    courses: CourseDto[] = [];
    constructor(
        private injector: Injector,
        private coursesService: CourseServiceProxy
    ) {
        super(injector);
    }

    list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

        this.coursesService.getAll('', request.skipCount, request.maxResultCount)
            .pipe(finalize(() => { finishedCallback() }))
            .subscribe((result: PagedResultDtoOfCourseDto) => {
                this.courses = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(course: CourseDto): void {
        abp.message.confirm(
            'Tem certeza que deseja excluir o curso \'' + course.displayName + '\'?',
            'Excluir este curso',
            (result: boolean) => {
                if (result) {
                    this.coursesService.delete(course.id)
                        .pipe(finalize(() => {
                            abp.notify.info('O curso: ' + course.displayName + ' foi detetado!');
                            this.refresh();
                        }))
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    createCourse(): void {
        this.createCourseModal.show();
    }

    editCourse(course: CourseDto): void {
        this.editCourseModal.show(course.id);
    }
}
