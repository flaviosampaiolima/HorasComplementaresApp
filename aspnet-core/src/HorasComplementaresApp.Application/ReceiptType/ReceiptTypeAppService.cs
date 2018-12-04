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
using HorasComplementaresApp.ReceiptTypes.Dtos;
using HorasComplementaresApp.MultiTenancy;
using HorasComplementaresApp.MultiTenancy.Dto;
using Microsoft.EntityFrameworkCore;

namespace HorasComplementaresApp.ReceiptTypes
{

    [AbpAuthorize(PermissionNames.Pages_ReceiptTypes)]
    public class ReceiptTypeAppService : AsyncCrudAppService<ReceiptType, ReceiptTypeDto>
    {

        public ReceiptTypeAppService(
            IRepository<ReceiptType> repository) 
            : base(repository)
        {
        }
    }
}
