CREATE TABLE recipes(
    rec_id SERIAL PRIMARY KEY,
    name   VARCHAR(255),
    describtion TEXT
)

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);