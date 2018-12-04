using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HorasComplementaresApp.Courses.Dtos
{
    [AutoMapFrom(typeof(Course))]
    public class CourseDto : FullAuditedEntityDto<int>, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

    }
}
