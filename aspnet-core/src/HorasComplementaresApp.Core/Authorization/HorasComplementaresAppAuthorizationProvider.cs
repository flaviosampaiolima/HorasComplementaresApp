using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace HorasComplementaresApp.Authorization
{
    public class HorasComplementaresAppAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_Courses, L("Courses"));
            context.CreatePermission(PermissionNames.Pages_ActivityTypes, L("ActivityTypes"));
            context.CreatePermission(PermissionNames.Pages_ReceiptTypes, L("ReceiptTypes"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, HorasComplementaresAppConsts.LocalizationSourceName);
        }
    }
}
