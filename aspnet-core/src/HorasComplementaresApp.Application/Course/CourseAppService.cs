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
using HorasComplementaresApp.Courses.Dtos;
using HorasComplementaresApp.MultiTenancy;
using HorasComplementaresApp.MultiTenancy.Dto;
using Microsoft.EntityFrameworkCore;

namespace HorasComplementaresApp.Courses
{

    [AbpAuthorize(PermissionNames.Pages_Courses)]
    public class CourseAppService : AsyncCrudAppService<Course, CourseDto>
    {

        private readonly IRepository<Tenant> _tenantRepository;


        public CourseAppService(
            IRepository<Course> repository,
            IRepository<Tenant> tenantRepository) 
            : base(repository)
        {
            _tenantRepository = tenantRepository;
        }

        public async Task<ListResultDto<TenantDto>> GetTenants()
        {
            var tenants = await _tenantRepository.GetAllListAsync();
            return new ListResultDto<TenantDto>(ObjectMapper.Map<List<TenantDto>>(tenants));
        }
    }
}
