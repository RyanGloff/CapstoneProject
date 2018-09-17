CREATE TABLE public."UserInfo"
(
  id integer NOT NULL,
  username text,
  password text,
  "lastName" text,
  "firstName" text,
  email text
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserInfo"
  OWNER TO postgres;
