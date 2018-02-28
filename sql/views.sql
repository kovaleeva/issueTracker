select
    `issue_tracker`.`issues`.`id` as `id`,
    `issue_tracker`.`issues`.`title` as `title`,
    `issue_tracker`.`issues`.`description` as `description`,
    `issue_tracker`.`issuetype`.`type` as `type`,
    `issue_tracker`.`issuestatus`.`status` as `status`,
    `issue_tracker`.`users`.`login` as `assignedBy`,
    `issue_tracker`.`issues`.`last_update` as `last_update`
from
    (
        (
            (
                `issue_tracker`.`issues`
            left join `issue_tracker`.`issuetype` on
                (
                    (
                        `issue_tracker`.`issuetype`.`id` = `issue_tracker`.`issues`.`typeID`
                    )
                )
            )
        left join `issue_tracker`.`issuestatus` on
            (
                (
                    `issue_tracker`.`issuestatus`.`id` = `issue_tracker`.`issues`.`statusID`
                )
            )
        )
    left join `issue_tracker`.`users` on
        (
            (
                `issue_tracker`.`users`.`id` = `issue_tracker`.`issues`.`assignedBy`
            )
        )
    )



select
    `issue_tracker`.`users`.`id` as `id`,
    `issue_tracker`.`users`.`login` as `login`,
    `issue_tracker`.`users`.`username` as `username`,
    `issue_tracker`.`users`.`password` as `password`,
    `issue_tracker`.`users`.`email` as `email`,
    `issue_tracker`.`usergroup`.`group` as `groupUser`
from
    (
        `issue_tracker`.`users`
    left join `issue_tracker`.`usergroup` on
        (
            (
                `issue_tracker`.`usergroup`.`id` = `issue_tracker`.`users`.`groupID`
            )
        )
    )

select
    `issue_tracker`.`history`.`id` as `id`,
    `issue_tracker`.`history`.`issueID` as `issueID`,
    `issue_tracker`.`history`.`last_update` as `last_update`,
    `issue_tracker`.`users`.`login` as `assignedOld`,
    `issue_tracker`.`users`.`login` as `assignedNew`,
    `issue_tracker`.`users`.`login` as `changer`,
    `issue_tracker`.`issuestatus`.`status` as `statusNew`,
    `issue_tracker`.`issuestatus`.`status` as `statusOld`
from
    (
        (
            `issue_tracker`.`history`
        left join `issue_tracker`.`users` on
            (
                (
                    (
                        `issue_tracker`.`users`.`id` = `issue_tracker`.`history`.`assignedOldID`
                    )
                    or(
                        `issue_tracker`.`users`.`id` = `issue_tracker`.`history`.`assignedNewID`
                    )
                    or(
                        `issue_tracker`.`users`.`id` = `issue_tracker`.`history`.`changerID`
                    )
                )
            )
        )
    left join `issue_tracker`.`issuestatus` on
        (
            (
                (
                    `issue_tracker`.`issuestatus`.`id` = `issue_tracker`.`history`.`statusNewID`
                )
                or(
                    `issue_tracker`.`issuestatus`.`id` = `issue_tracker`.`history`.`statusOldID`
                )
            )
        )
    )
