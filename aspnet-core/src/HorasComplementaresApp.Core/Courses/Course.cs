using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;

namespace HorasComplementaresApp.Courses
{
    //[Table("Courses")]
    public class Course : FullAuditedEntity<int>, IMustHaveTenant, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {
        public const int MaxTitleLength = 128;
        public const int MaxDescriptionLength = 2048;

        public virtual int TenantId { get; set; }

        [Required]
        [StringLength(MaxTitleLength)]
        public virtual string Title { get; protected set; }

        [StringLength(MaxDescriptionLength)]
        public virtual string Description { get; protected set; }

        public Course()
        {
            CreationTime = Clock.Now;
            DeletionTime = Clock.Now;
        }

    }
}
