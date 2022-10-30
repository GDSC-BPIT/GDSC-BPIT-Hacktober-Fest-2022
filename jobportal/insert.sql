use jobportal;

insert into jobseeker_user_account values('1j','1j','1j@gmail.com');
insert into jobseeker_user_account values('2j','2j','2j@gmail.com');

insert into company_user_account values('3c','3c','3c@gmail.com');
insert into company_user_account values('4c','4c','4c@gmail.com');


insert into company values('3c','IBM', 'IBM description', '101', 'www.IBM.com');
insert into company values('4c','SRM', 'SRM description', '102', 'www.SRM.com');

insert into seeker_profile values('1j','Vyshnavi', 'Kavali', 'female', '8688695744');
insert into seeker_profile values('2j','Sahaja', 'Nandyala', 'female', '9989280199');

insert into education_details values('2j','Intermidiate', 'MPC', 'srichaitanya', '20-10-2019','20-10-2020','99');
insert into education_details values('2j','undergraduate', 'CSE', 'IIT Dharwad', '1-12-2020','1-12-2022','87');

insert into education_details values('1j','Intermidiate', 'MPC', 'narayana', '22-7-2019','9-10-2020','96');
insert into education_details values('1j','undergraduate', 'CSE', 'IIT Dharwad', '1-12-2020','1-12-2022','99');

insert into experience_details values('1j','SDE intern', '1-7-2022', '1-10-2022','flipkart', 'job description');
insert into experience_details values('1j','SDE intern', '1-10-2022', '1-11-2022','google', 'job description');
insert into experience_details values('2j','SDE intern', '1-11-2022', '1-12-2022','amazon', 'job description');

insert into skill_set values('python');
insert into skill_set values('C');
insert into skill_set values('soft skills');

insert into seeker_skill_set values('1j','python');
insert into seeker_skill_set values('1j','C');
insert into seeker_skill_set values('2j','python');
insert into seeker_skill_set values('2j','C');


insert into job_post values('job1','3c','Intern','12-10-2022','20-11-2022','job1 description', 'location1');
insert into job_post values('job2','4c','Teacher','10-9-2022','5-12-2022','job2 description', 'location2');

insert into job_post_activity values('1j','job1','3c','15-10-2022');
insert into job_post_activity values('1j','job2','4c','15-10-2022');
insert into job_post_activity values('2j','job1','3c','28-10-2022');
