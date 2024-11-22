drop table if exists Account;
drop table if exists FangroupMember;
drop table if exists Fangroup;

create table Account( 
  Account_id serial primary key,
  Email VARCHAR(255) unique not null,
  Username VARCHAR(50) unique not null,
  Password VARCHAR(255) not null -- hashed password
);

