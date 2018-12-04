using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace HorasComplementaresApp.ReceiptTypes.Dtos
{
    [AutoMapFrom(typeof(ReceiptType))]
    public class ReceiptTypeDto : FullAuditedEntityDto<int>, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {

        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string IconName { get; set; }

        public string Description { get; set; }

    }
}
