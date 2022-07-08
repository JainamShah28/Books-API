CREATE DATABASE Book_Store;
USE Book_Store;

CREATE TABLE Books(
	bookID int AUTO_INCREMENT,
    bookName varchar(100) NOT NULL,
    authorName varchar(50) NOT NULL,
    bookDesc LONGTEXT NOT NULL,
    price int NOT NULL,
    bookImg varchar(200) NOT NULL,
    PRIMARY KEY (bookID)
);

ALTER TABLE Books 
ADD CONSTRAINT check_price CHECK (price > 0);

DROP TABLE Books;

SELECT * FROM Books;