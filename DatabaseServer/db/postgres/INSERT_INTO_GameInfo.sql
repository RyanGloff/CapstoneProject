INSERT INTO public."UserInfo"(
            id, username, password, "lastName", "firstName", email)
    VALUES (1, 'testing', 'testPass', 'Test Last Name', 'Test First Name', 'Test Email@email.com');
INSERT INTO public."GameInfo"(
            id, "timeStarted", users, results, "timeLasted")
    VALUES (1, 165000, 'test names', 'test results', 70000);