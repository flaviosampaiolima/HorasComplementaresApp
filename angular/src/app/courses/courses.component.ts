import { Component, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { CourseServiceProxy, CourseDto, PagedResultDtoOfCourseDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateCourseComponent } from 'app/courses/create-course/create-course.component';
import { EditCourseComponent } from 'app/courses/edit-course/edit-course.component';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './courses.component.html',
    animations: [appModuleAnimation()]
})
export class CoursesComponent extends PagedListingComponentBase<CourseDto> {

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
            'Remove Users from Course and delete Course \'' + course.title + '\'?',
            'Permanently delete this Course',
            (result: boolean) => {
                if (result) {
                    this.coursesService.delete(course.id)
                        .pipe(finalize(() => {
                            abp.notify.info('Deleted Course: ' + course.title);
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
