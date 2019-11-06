CREATE TABLE
    employees ( 
        userId SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastName VARCHAR(225) NOT NULL,
        email VARCHAR(225) NOT NULL,
        password VARCHAR(225) NOT NULL,
        gender VARCHAR(225) NOT NULL,
        jobRole VARCHAR(225) NOT NULL,
        department VARCHAR(225) NOT NULL,
        address VARCHAR(225) NOT NULL );

INSERT INTO employees ( firstname, lastName, email, password, gender, jobrole, department, address ) VALUES ( 'Sam', 'Odum', 'sam.odum1@yahoo.co.uk', 'sam.odum1', 'male', 'CEO', 'administration', '24 Somewhere Street, Place, Nigeria' );
