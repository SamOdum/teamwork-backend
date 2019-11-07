CREATE TABLE IF NOT EXISTS employees (
        userId UUID PRIMARY KEY,
        firstname VARCHAR (255) NOT NULL,
        lastName VARCHAR (225) NOT NULL,
        email VARCHAR (225) NOT NULL,
        password VARCHAR (225) NOT NULL,
        gender VARCHAR (225) NOT NULL,
        jobRole VARCHAR (225) NOT NULL,
        department VARCHAR (225) NOT NULL,
        address VARCHAR (225) NOT NULL
);

INSERT INTO
        employees (
                firstname,
                lastName,
                email,
                password,
                gender,
                jobrole,
                department,
                address
        )
VALUES
        (
                'Sam',
                'Odum',
                'sam.odum1@yahoo.co.uk',
                'sam.odum1',
                'male',
                'CEO',
                'administration',
                '24 Somewhere Street, Place, Nigeria'
        );

CREATE TABLE IF NOT EXISTS articles (
        articleId UUID PRIMARY KEY,
        title VARCHAR (255) NOT NULL,
        article TEXT NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW (),
        userId VARCHAR,
        FOREIGN KEY (userId) REFERENCES employees (userId) ON
DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gifs (
        gifId UUID PRIMARY KEY,
        imageUrl VARCHAR (255) NOT NULL,
        title VARCHAR (255) NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW (),
        userId VARCHAR (255),
        FOREIGN KEY (userId) REFERENCES employees (userId) ON
DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
        commentId UUID PRIMARY KEY,
        comment TEXT NOT NULL,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW (),
        gifId VARCHAR,
        userId VARCHAR,
        artticleId VARCHAR,
        FOREIGN KEY (gifId) REFERENCES gifs (gifId) ON
DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES employees (userId) ON
DELETE CASCADE,
        FOREIGN KEY (articleId) REFERENCES gifs (articleId) ON
DELETE CASCADE,
)