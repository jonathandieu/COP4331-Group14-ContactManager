-- Create database
CREATE DATABASE yellabook;
USE yellabook;

-- Create tables
CREATE TABLE users (
    login VARCHAR(64) NOT NULL DEFAULT '',
    password VARCHAR(64) NOT NULL DEFAULT '',
    name VARCHAR(255) NOT NULL DEFAULT '',

    PRIMARY KEY (login)
);

CREATE TABLE contacts (
    id INT NOT NULL AUTO_INCREMENT,
    login VARCHAR(64) NOT NULL DEFAULT '',
    cname VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login) REFERENCES users (login)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, cname),
    UNIQUE KEY (id)
);

CREATE TABLE emails (
    login VARCHAR(64) NOT NULL DEFAULT '',
    cname VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    address VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login, cname) REFERENCES contacts (login, cname)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, cname, address)
);

CREATE TABLE phones (
    login VARCHAR(64) NOT NULL DEFAULT '',
    cname VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    number BIGINT NOT NULL DEFAULT 0,
    FOREIGN KEY (login, cname) REFERENCES contacts (login, cname)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, cname, number)
);

CREATE TABLE locations (
    login VARCHAR(64) NOT NULL DEFAULT '',
    cname VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    address VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login, cname) REFERENCES contacts (login, cname)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, cname, address)
);
