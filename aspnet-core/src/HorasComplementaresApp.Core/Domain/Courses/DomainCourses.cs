using Abp.Events.Bus;

namespace HorasComplementaresApp.Domain.Courses
{
    public static class DomainCourses
    {
        public static IEventBus CourseBus { get; set; }

        static DomainCourses()
        {
            CourseBus = Abp.Events.Bus.EventBus.Default;
        }
    }
}
