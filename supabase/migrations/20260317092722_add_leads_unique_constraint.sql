-- Prevent duplicate leads with the same email and meeting_time
ALTER TABLE leads ADD CONSTRAINT leads_email_meeting_time_unique UNIQUE (email, meeting_time);
