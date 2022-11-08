DROP TABLE IF EXISTS pets;
--if junk or bad data in there, get rid of them

CREATE TABLE pets(
    age integer,
    name varchar(50),
    kind varchar(50),
    id serial
);

-- CREATE TABLE properties(
--    owner_id varchar(50) NOT NULL,
--    property_id varchar(50),
--    property_name text,
--    PRIMARY KEY(property_id),
--    FOREIGN KEY(owner_id)
--       REFERENCES owners(owner_id)
-- );
