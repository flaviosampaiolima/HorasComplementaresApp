using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using Abp.UI;
using HorasComplementaresApp.Authorization;
using HorasComplementaresApp.ActivityTypes.Dtos;
using HorasComplementaresApp.MultiTenancy;
using HorasComplementaresApp.MultiTenancy.Dto;
using Microsoft.EntityFrameworkCore;

namespace HorasComplementaresApp.ActivityTypes
{

    [AbpAuthorize(PermissionNames.Pages_ActivityTypes)]
    public class ActivityTypeAppService : AsyncCrudAppService<ActivityType, ActivityTypeDto>
    {

        public ActivityTypeAppService(
            IRepository<ActivityType> repository) 
            : base(repository)
        {
        }
    }
}
