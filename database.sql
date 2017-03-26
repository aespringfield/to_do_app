CREATE TABLE "tasks" (
  id SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  complete BOOLEAN
);
