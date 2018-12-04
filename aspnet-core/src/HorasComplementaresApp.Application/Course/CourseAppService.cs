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

        public CourseAppService(
            IRepository<Course> repository) 
            : base(repository)
        {
        }
    }
}
