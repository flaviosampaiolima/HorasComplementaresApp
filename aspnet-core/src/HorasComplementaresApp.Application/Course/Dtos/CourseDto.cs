using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HorasComplementaresApp.Courses.Dtos
{
    [AutoMapFrom(typeof(Course))]
    public class CourseDto : FullAuditedEntityDto<int>, IMustHaveTenant, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {
        public int TenantId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

    }
}
