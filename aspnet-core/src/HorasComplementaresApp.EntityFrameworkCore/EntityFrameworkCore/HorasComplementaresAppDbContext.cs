using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HorasComplementaresApp.Authorization.Roles;
using HorasComplementaresApp.Authorization.Users;
using HorasComplementaresApp.Courses;
using HorasComplementaresApp.ActivityTypes;
using HorasComplementaresApp.MultiTenancy;
using HorasComplementaresApp.ReceiptTypes;

namespace HorasComplementaresApp.EntityFrameworkCore
{
    public class HorasComplementaresAppDbContext : AbpZeroDbContext<Tenant, Role, User, HorasComplementaresAppDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public virtual DbSet<Course> Courses { get; set; }

        public virtual DbSet<ActivityType> ActivityTypes { get; set; }

        public virtual DbSet<ReceiptType> ReceiptTypes { get; set; }

        public HorasComplementaresAppDbContext(DbContextOptions<HorasComplementaresAppDbContext> options)
            : base(options)
        {
        }
    }
}
