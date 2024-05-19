create table user_entity
(
    id        int auto_increment
        primary key,
    firstName varchar(255)      not null,
    lastName  varchar(255)      not null,
    isActive  tinyint default 1 not null,
    username  varchar(255)      not null,
    version   int               not null
);