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
    name VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login) REFERENCES users (login)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, name)
);

CREATE TABLE emails (
    login VARCHAR(64) NOT NULL DEFAULT '',
    name VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    address VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login, name) REFERENCES contacts (login, name)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, name, address)
);

CREATE TABLE phones (
    login VARCHAR(64) NOT NULL DEFAULT '',
    name VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    number INT(10) NOT NULL DEFAULT 0,
    FOREIGN KEY (login, name) REFERENCES contacts (login, name)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, name, number)
);

CREATE TABLE locations (
    login VARCHAR(64) NOT NULL DEFAULT '',
    name VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(64) NOT NULL DEFAULT 'home',
    address VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY (login, name) REFERENCES contacts (login, name)
		ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (login, name, address)
);
