-- Create the database
CREATE DATABASE IF NOT EXISTS `spuxx-api`;

-- Create the user
CREATE USER IF NOT EXISTS 'spuxx-api'@'%' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON `spuxx-api`.* TO 'spuxx-api'@'%';

-- Flush privileges to ensure they take effect
FLUSH PRIVILEGES;
