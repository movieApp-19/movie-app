drop table if exists Account;
drop table if exists FangroupMember;
drop table if exists Fangroup;

create table Account( 
  Account_id serial primary key,
  Email VARCHAR(255) unique not null,
  Username VARCHAR(50) unique not null,
  Password VARCHAR(255) not null -- hashed password
);

create table Fangroup(
  Fangroup_id serial primary key,
  FangroupName VARCHAR(50) unique not null
);

create table FangroupMember(
  FangroupMember_id serial primary key,
  Approved boolean default false,
  IsOwner boolean default false,
  Account_id int,
  Fangroup_id int,

  constraint fk_Account
    foreign key(Account_id)
    references Account(Account_id),
    --on delete cascade -- automatically deleted when Account is deleted
	
  constraint fk_Fangroup
    foreign key(Fangroup_id)
    references Fangroup(Fangroup_id)
    --on delete restrict -- prevent deletion if there are members
);

/* ----- Data to the tables ----- */

insert into Account (Email, Username, Password) values
('user1@mail.com', 'user1', 'Password1'), --password should be hash, this is just a test
('user2@mail.com', 'user2', 'Password2'),
('user3@mail.com', 'user3', 'Password3'),
('user4@mail.com', 'user4', 'Password4'),
('user5@mail.com', 'user5', 'Password5'),
('user6@mail.com', 'user6', 'Password6'),
('user7@mail.com', 'user7', 'Password7'),
('user8@mail.com', 'user8', 'Password8'),
('user9@mail.com', 'user9', 'Password9');

insert into Fangroup (FangroupName) values 
('WesternsGroup'),
('HorrorGroup'),
('HollywoodFans');

insert into Fangroupmember (Approved, IsOwner, Account_id, Fangroup_id) values
(true, true, 1, 1), -- user1 is owner of both WesternGroup and HorrorGroup
(true, true, 1, 2), -- user1
(true, false, 2, 1), -- user2 is a member of WesternGroup but not a owner
(false, false, 3, 1), -- user3 is NOT approved member of WesternGroup nor a owner
(true, true, 9, 3);

/*
select * from account;
select * from fangroupmember;
select * from fangroupmember where fangroup_id = 1 and approved = true;
select * from fangroupmember where fangroup_id = 1;
select * from fangroupmember where fangroup_id = 2;
select * from fangroupmember where fangroup_id = 3;
select * from fangroup;
*/
