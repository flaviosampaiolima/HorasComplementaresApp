/*
mssql getting started:
-----------------------------
1. Change language mode to SQL: Open a .sql file or press Ctrl+K M (Cmd+K M on Mac) and choose 'SQL'.
2. Connect to a database: Press F1 to show the command palette, type 'sqlcon' or 'sql' then click 'Connect'.
3. Use the T-SQL editor: Type T-SQL statements in the editor using T-SQL IntelliSense or type 'sql' to see a list of code snippets you can tweak & reuse.
4. Run T-SQL statements: Press F1 and type 'sqlex' or press Ctrl+Shift+e (Cmd+Shift+e on Mac) to execute all the T-SQL code in the editor.

Tip #1: Put GO on a line by itself to separate T-SQL batches.
Tip #2: Select some T-SQL text in the editor and press `Ctrl+Shift+e` (`Cmd+Shift+e` on Mac) to execute the selection
*/

-- Get a list of tables and views in the current database
SELECT table_catalog [database], table_schema [schema], table_name name, table_type type
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME LIKE '%type%'
GO

select * from AbpTenants;
select * from AbpUsers;
select * from ActivityType;
select * from Courses;


select * from __EFMigrationsHistory