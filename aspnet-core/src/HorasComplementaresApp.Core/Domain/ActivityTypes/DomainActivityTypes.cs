using Abp.Events.Bus;

namespace HorasComplementaresApp.Domain.ActivityTypes
{
    public static class DomainActivityTypes
    {
        public static IEventBus ActivityTypeBus { get; set; }

        static DomainActivityTypes()
        {
            ActivityTypeBus = Abp.Events.Bus.EventBus.Default;
        }
    }
}
