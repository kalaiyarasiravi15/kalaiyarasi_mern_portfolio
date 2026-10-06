-- Portfolio database (XAMPP / MySQL / MariaDB)
-- The server creates this automatically on start; import this file in
-- phpMyAdmin only if you prefer to set it up by hand.

CREATE DATABASE IF NOT EXISTS kalai_portfolio
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE kalai_portfolio;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  service VARCHAR(80) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
