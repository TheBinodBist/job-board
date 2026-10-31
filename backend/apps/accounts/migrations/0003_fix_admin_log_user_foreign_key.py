import copy

from django.db import migrations


def repair_admin_log_user_foreign_key(apps, schema_editor):
    log_entry = apps.get_model("admin", "LogEntry")
    user_field = log_entry._meta.get_field("user")
    connection = schema_editor.connection

    with connection.cursor() as cursor:
        constraints = connection.introspection.get_constraints(
            cursor,
            log_entry._meta.db_table,
        )

    current_target = next(
        (
            constraint["foreign_key"][0]
            for constraint in constraints.values()
            if constraint.get("columns") == [user_field.column]
            and constraint.get("foreign_key")
        ),
        None,
    )
    expected_target = user_field.remote_field.model._meta.db_table

    if current_target == expected_target:
        return

    old_field = copy.deepcopy(user_field)
    old_field.remote_field.model = apps.get_model("auth", "User")
    schema_editor.alter_field(log_entry, old_field, user_field)


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0002_alter_user_options_alter_user_managers_and_more"),
        ("admin", "0003_logentry_add_action_flag_choices"),
    ]

    operations = [
        migrations.RunPython(
            repair_admin_log_user_foreign_key,
            migrations.RunPython.noop,
        ),
    ]