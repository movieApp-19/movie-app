drop table if exists FangroupMember;
drop table if exists Fangroup;
drop table if exists Favourite;
drop table if exists Review;
drop table if exists Session;
drop table if exists Account;

create table Account( 
  Account_id serial primary key,
  Email VARCHAR(255) unique not null,
  Username VARCHAR(50) unique not null,
  Password VARCHAR(255) not null -- hashed password
);

create table Session(
  Session_id serial primary key,
  Account_id INT not null,
  Token VARCHAR(255) not null,

  constraint fk_Account
    foreign key(Account_id)
    references Account(Account_id)
    on delete cascade
);

create table Fangroup(
  Fangroup_id serial primary key,
  FangroupName VARCHAR(50) unique not null
);

create table FangroupMember(
  FangroupMember_id serial primary key,
  Approved boolean default false,
  IsOwner boolean default false,
  Account_id INT not null,
  Fangroup_id int not null,

  --on delete cascade -- automatically deleted when Account is deleted
  --on delete restrict -- prevent deletion if there are members
  constraint fk_Account
    foreign key(Account_id)
    references Account(Account_id)
    on delete cascade,
	
  constraint fk_Fangroup
    foreign key(Fangroup_id)
    references Fangroup(Fangroup_id)
    on delete cascade
);

create table Review(
  Review_id serial primary key,
  Text VARCHAR(500) not null,
  Date TIMESTAMP not null default current_timestamp,
  Movie_id INT not null,
  Account_id INT not null,
  Stars INT not null,

  constraint fk_Account
    foreign key(Account_id)
    references Account(Account_id)
    on delete cascade
);

create table Favourite(
  Favourite_id serial primary key,
  Movie_id INT not null,
  Account_id INT not null,
  MovieTitle VARCHAR(300) not null,

  constraint fk_Account
    foreign key(Account_id)
    references Account(Account_id)
    on delete cascade

);

/* ----- Data to the tables ----- */
/* ------ use if you want ------ */

/*

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

insert into Review (ReviewText, ReviewDate, Movie_id, Account_id) values
('A great movie to watch, kept me entertained throughout!', '2024-11-01', 101, 1),
('The storyline was decent, but the pacing could have been better.', '2024-11-05', 102, 2),
('An amazing cast and stunning visuals, highly recommended!', '2024-11-10', 103, 3),
('It was okay, but nothing too memorable about it.', '2024-11-15', 104, 4),
('A fantastic experience from start to finish, truly loved it!', '2024-11-18', 104, 5);

insert into Favourite (Movie_id, Account_id) values
(101, 1),
(102, 1),
(102, 2),
(104, 4),
(104, 3);

*/

/*
select * from account;
select * from favourite;
select * from favourite where account_id = 1;
select * from fangroupmember;
select * from fangroupmember where fangroup_id = 1 and approved = true;
select * from fangroupmember where fangroup_id = 1;
select * from fangroupmember where fangroup_id = 2;
select * from fangroupmember where fangroup_id = 3;
select * from fangroup;
*/
