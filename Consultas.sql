select * from AbpUsers;

select * from AbpTenants;

select * from Courses;

insert into Courses(Title, [Description], CreationTime, IsDeleted, TenantId) VALUES ('MAT', 'Matemática', GETDATE(), 0, '1')



select * from sys.all_objects order by name asc;

select * from __EFMigrationsHistory