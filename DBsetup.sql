-- Create database
CREATE DATABASE 'ContactManager';
USE 'ContactManager';
-- Create tables
CREATE TABLE 'Users' (
    'Login' VARCHAR(64) NOT NULL DEFAULT '',
    'Pass' VARCHAR(64) NOT NULL DEFAULT '',
    PRIMARY KEY ('Login')
);
CREATE TABLE 'Contacts' (
    'Login' VARCHAR(64) NOT NULL DEFAULT '',
    'Name' VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY ('Login') REFERENCES 'Users' ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ('Login', 'Name')
);
CREATE TABLE 'Emails' (
    'Login' VARCHAR(64) NOT NULL DEFAULT '',
    'Name' VARCHAR(255) NOT NULL DEFAULT '',
    'Type' VARCHAR(64) NOT NULL DEFAULT 'Home',
    'Address' VARCHAR(255) NOT NULL DEFAULT '',
    FOREIGN KEY ('Login', 'Name') REFERENCES 'Contacts' ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ('Login', 'Name', 'Address')
);
CREATE TABLE 'Phones' (
    'Login' VARCHAR(64) NOT NULL DEFAULT '',
    'Name' VARCHAR(255) NOT NULL DEFAULT '',
    'Type' VARCHAR(64) NOT NULL DEFAULT 'Home',
    'Number' INT(10) NOT NULL DEFAULT 0,
    FOREIGN KEY ('Login', 'Name') REFERENCES 'Contacts' ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ('Login', 'Name', 'Number')
);
CREATE TABLE 'Locations' (
    'Login' VARCHAR(64) NOT NULL DEFAULT '',
    'Name' VARCHAR(255) NOT NULL DEFAULT '',
    'Type' VARCHAR(64) NOT NULL DEFAULT 'Home',
    'Address' TEXT(65535) NOT NULL DEFAULT '',
    FOREIGN KEY ('Login', 'Name') REFERENCES 'Contacts' ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ('Login', 'Name', 'Address')
);