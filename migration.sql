use dungeons_and_dust_bunnies_db;

INSERT INTO badges (badge_title, badge_body) VALUES
                                                 ('First blood', 'Completed your first battle!'),
                                                 ('Novice do-er', 'Completed 3 battles'),
                                                 ('Regular getter-doner', 'Completed 5 battles'),
                                                 ('Cosmic Cleaner', 'Defeated the cosmic hat octopuss of filth');

INSERT INTO monsters (name) VALUES
                                ('Zoglon the Vacuumizer'),
                                ('Grimmox the Dust Devourer'),
                                ('Stellaris the Window Wiper'),
                                ('Nebulon the Laundry Lord'),
                                ('Ironus the Wrinkle Vanquisher'),
                                ('Sweeptron the Floor Sweeper'),
                                ('Trashor the Garbage Gobbler'),
                                ('Polypus the Mop Master'),
                                ('Floragor the Plant Purifier'),
                                ('Pantryx the Organization Overlord');

INSERT INTO battles (monster_id, user_id) VALUES
                                              (1,1),
                                              (2,1),
                                              (3,1);

INSERT INTO tasks (battle_id, task_body) VALUES
                                             (1, 'Clean the living room'),
                                             (1, 'Vacuum the carpets'),
                                             (1, 'Dust the furniture'),
                                             (1, 'Mop the floors'),
                                             (1, 'Organize the shelves'),
                                             (2, 'Wipe down kitchen countertops'),
                                             (2, 'Clean the oven'),
                                             (2, 'Scrub the sink'),
                                             (2, 'Sweep the kitchen floor'),
                                             (2, 'Empty the trash'),
                                             (3, 'Dust and polish wood surfaces'),
                                             (3, 'Clean the windows'),
                                             (3, 'Vacuum curtains'),
                                             (3, 'Clean ceiling fans'),
                                             (3, 'Wipe down baseboards');