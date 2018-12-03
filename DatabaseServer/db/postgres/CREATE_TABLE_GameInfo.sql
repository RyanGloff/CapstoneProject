CREATE TABLE public."GameInfo"
(
  id bigint NOT NULL,
  "startTime" bigint,
  users bigint[],
  results integer[],
  "timeLasted" bigint[],
  CONSTRAINT "GameInfo_pkey" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public."GameInfo"
  OWNER TO postgres;