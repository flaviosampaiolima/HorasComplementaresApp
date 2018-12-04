using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HorasComplementaresApp.ActivityTypes.Dtos
{
    [AutoMapFrom(typeof(ActivityType))]
    public class ActivityTypeDto : FullAuditedEntityDto<int>, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

    }
}
