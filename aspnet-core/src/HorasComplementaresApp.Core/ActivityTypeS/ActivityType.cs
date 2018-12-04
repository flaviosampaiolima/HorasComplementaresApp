using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;

namespace HorasComplementaresApp.ActivityTypes
{
    [Table("ActivityType")]
    public class ActivityType : FullAuditedEntity<int>, IHasCreationTime, IHasDeletionTime, IHasModificationTime
    {
        public const int MaxNameLength = 30;
        public const int MaxDisplayNameLength = 128;
        public const int MaxDescriptionLength = 5000;

        [Required]
        [StringLength(MaxNameLength)]
        public virtual string Name { get; protected set; }

        [Required]
        [StringLength(MaxDisplayNameLength)]
        public virtual string DisplayName { get; protected set; }

        [StringLength(MaxDescriptionLength)]
        public virtual string Description { get; protected set; }

        public ActivityType()
        {
            CreationTime = Clock.Now;
            DeletionTime = Clock.Now;
        }

    }
}
