create database jobportal;
use jobportal;

create table jobseeker_user_account(
user_id varchar(10),
password varchar(10),
email varchar(20),
primary key (user_id)
);

create table company_user_account(
company_id varchar(10),
password varchar(10),
email varchar(20),
primary key (company_id)
);


create table company(
company_id varchar(10),
company_name varchar(20),
profile_description varchar(100),
business_stream varchar(10),
company_website_url varchar(50),
primary key (company_id),
foreign key (company_id) references company_user_account(company_id)
);

create table seeker_profile(
user_id varchar(10),
first_name varchar(15),
last_name varchar(15),
gender varchar(10),
phone_no varchar(10),
primary key (user_id),
foreign key(user_id) references jobseeker_user_account(user_id));

create table education_details(
user_id varchar(10),
educational_level varchar(15),
major varchar(15),
institute_name varchar(20),
starting_date varchar(10),
completion_date varchar(10),
percentage numeric(5,2),
primary key (user_id, educational_level, major),
foreign key (user_id) references seeker_profile(user_id)
);


create table experience_details(
user_id varchar(10),
job_title varchar(10),
starting_date varchar(10),
completion_date varchar(10),
company_name varchar(15),
description varchar(100),
primary key (user_id,job_title,company_name),
foreign key (user_id) references seeker_profile(user_id)
);

create table skill_set(
skill_name varchar(20),
primary key (skill_name)
);

create table seeker_skill_set(
user_id varchar(10),
skill_name varchar(10),
primary key (user_id,skill_name),
foreign key (skill_name) references skill_set(skill_name)
);

create table job_post(
job_post_id varchar(10),
company_id varchar(10),
job_type varchar(10),
created_date varchar(10),
end_date varchar(10),
job_description varchar(200),
job_location varchar(20),
primary key (job_post_id,company_id),
foreign key (company_id) references company(company_id)
);

create table job_post_activity(
user_id varchar(10),
job_post_id varchar(10),
company_id varchar(10),
apply_date varchar(20),
primary key (user_id, job_post_id, company_id),
foreign key (user_id) references seeker_profile(user_id),
foreign key (job_post_id) references job_post(job_post_id),
foreign key (company_id) references company(company_id)
);
