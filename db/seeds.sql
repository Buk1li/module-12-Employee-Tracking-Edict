USE company_db;

-- Populate departments
INSERT INTO department (name) VALUES
    ('First Circle - Limbo'),
    ('Second Circle - Lust'),
    ('Third Circle - Gluttony'),
    ('Fourth Circle - Greed'),
    ('Fifth Circle - Wrath'),
    ('Sixth Circle - Heresy'),
    ('Seventh Circle - Violence'),
    ('Eighth Circle - Fraud'),
    ('Ninth Circle - Treachery');

-- Populate roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Prince of Hell', 200000, 1),
    ('Demon of Lust', 100000, 2),
    ('Demon of Gluttony', 110000, 3),
    ('Demon of Greed', 120000, 4),
    ('Demon of Wrath', 130000, 5),
    ('Demon of Heresy', 140000, 6),
    ('Demon of Violence', 150000, 7),
    ('Demon of Fraud', 160000, 8),
    ('Demon of Treachery', 170000, 9);

-- Populate employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Lucifer', 'Morningstar', 1, NULL),
    ('Asmodeus', NULL, 2, 1),
    ('Beelzebub', NULL, 3, 1),
    ('Mammon', NULL, 4, 1),
    ('Leviathan', NULL, 5, 1),
    ('Belphegor', NULL, 6, 1),
    ('Satan', NULL, 7, 1),
    ('Belial', NULL, 8, 1);