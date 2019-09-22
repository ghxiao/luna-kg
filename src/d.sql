
CREATE OR REPLACE VIEW v_accomodationsopen AS
SELECT id, data->'Beds' AS Beds, data->'Units' AS Units
FROM accommodationsopen;



CREATE OR REPLACE VIEW v_accomodationsopen_features AS
SELECT id AS accomodationsopen_id, data->'Features'->>'id' --->>'Id' AS feature_id
FROM accommodationsopen;


WITH t (id, data)
         AS (VALUES
             (1, '{"name":"a","points":[{"x":1, "y":2}, {"x":2, "y":3}]}'::jsonb),
             (2, '{"name":"b","points":[{"x":1, "y":2}, {"x":2, "y":3}]}'::jsonb)
    ),
     t1 (id, name, data) AS
         (SELECT id, data->'name', jsonb_array_elements(data->'Features')::jsonb FROM t)
SELECT name, data->'x' AS x, data->'y' AS y
FROM t1;


CREATE OR REPLACE VIEW v_accomodationsopen_features AS
    WITH t (id, feature) AS (
        SELECT id, jsonb_array_elements(data -> 'Features') AS "Feature"
        FROM accommodationsopen
        WHERE data -> 'Features' != 'null')
    SELECT id, feature -> 'Id' AS "FeatureId", feature->'Name' AS "Name"
    FROM t;

DROP VIEW v_accommodationsopen;





SELECT data->'Beds' AS Beds, data->'Units' AS Units, data->'Latitude' AS Latitude,
       data->'Longitude' AS Longitude, data->'Altitude' AS Altitude,
       data->'AccoDetail'->'de'->'Name' AS Name
FROM accommodationsopen
WHERE (data->'Beds')::integer > 5;

CREATE OR REPLACE VIEW v_poisopen_OperationSchedule_OperationScheduleTime AS
    WITH t (id, "data") AS (
        SELECT id, jsonb_array_elements("data" -> 'OperationSchedule_OperationScheduleTime') AS "Feature"
        FROM poisopen
        WHERE data -> 'OperationSchedule_OperationScheduleTime' != 'null')
    SELECT id AS "parent_Id", CAST("data"->>'End' As varchar) AS "End",
           CAST("data"->>'Start' As varchar) AS "Start",
           CAST("data"->>'State' As integer) AS "State",
           CAST("data"->>'Friday' As bool) AS "Friday",
           CAST("data"->>'Monday' As bool) AS "Monday",
           CAST("data"->>'Sunday' As bool) AS "Sunday",
           CAST("data"->>'Tuesday' As bool) AS "Tuesday",
           CAST("data"->>'Saturday' As bool) AS "Saturday",
           CAST("data"->>'Timecode' As integer) AS "Timecode",
           CAST("data"->>'Thuresday' As bool) AS "Thuresday",
           CAST("data"->>'Wednesday' As bool) AS "Wednesday"
    FROM t;
