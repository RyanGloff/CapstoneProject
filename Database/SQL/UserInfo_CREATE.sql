-- Table: public."UserInfo"

-- DROP TABLE public."UserInfo";

CREATE TABLE public."UserInfo"
(
  "ID#" integer NOT NULL DEFAULT nextval('"UserInfo_ID#_seq"'::regclass),
  "Username" text,
  "Password" text,
  "LastName" text,
  "FirstName" text,
  "Email" text
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."UserInfo"
  OWNER TO postgres;
