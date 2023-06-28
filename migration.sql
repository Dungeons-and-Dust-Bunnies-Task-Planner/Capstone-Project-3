create database if not exists dungeons_and_dust_bunnies_db;
use dungeons_and_dust_bunnies_db;

# BEFORE RUNNING THE REST OF THIS----------------------------------------------------
# YOU HAVE TO HAVE AT LEAST 1 USER IN THE DB, THIS IS SET UP TO WORK WITH user_id = 1

INSERT INTO badges (badge_image,badge_title, badge_body)
VALUES ('https://cdn.discordapp.com/attachments/415980182021603329/1122909077878603858/IMG_1856.png', 'First blood', 'Completed your first battle!'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909077622767646/IMG_1857.png', 'Novice do-er', 'Completed 3 battles'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909077304004699/IMG_1858.png', 'Regular getter-doner', 'Completed 5 battles'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909075919863898/IMG_1859.png', 'Cosmic Cleaner', 'Defeated the cosmic hat octopuss of filth'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909075626278992/IMG_1887.png', 'Dust Destroyer', 'Defeated Dust Bunny Prime'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909076314144849/IMG_1885.png', 'Dish Buster', 'Defeated Grimalkin, the Malevolent Dish Heap'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909076645499050/IMG_1884.png', 'Bear Buster', 'Defeated Sir OwlBear, the Unclean'),
       ('https://cdn.discordapp.com/attachments/415980182021603329/1122909076918124734/IMG_1883.png', 'Slime Slurper', 'Defeated Blobbus McSlimey');



INSERT INTO monsters (name)
VALUES ('Blobbus McSlimey'),
       ('Dust Bunny Prime'),
       ('OctoRizz the Slippery'),
       ('Sir OwlBear the Unclean'),
       ('Grimalkin, the Malevolent Dish Heap');

INSERT INTO monster_images (monster_img, stage, monster_img_id)
VALUES
        ('https://cdn.filestackcontent.com/ohsq2CNgSlgZidDS2wEI',1,1),
        ('https://cdn.filestackcontent.com/ytGYW57OTaOssPKoUfxi',2,1),
        ('https://cdn.filestackcontent.com/OZNx5tqOQfijYoeuSND6',3,1),
        ('https://cdn.filestackcontent.com/K6HxhqrATpOjR90fRrc8',4,1),
        ('https://cdn.filestackcontent.com/wUCToPVQj23DzVmpWUh5',1,2),
        ('https://cdn.filestackcontent.com/zx6CeDmkQVK8g0bzRj0d',2,2),
        ('https://cdn.filestackcontent.com/UHhTgpdASf6864t9XFV4',3,2),
        ('https://cdn.filestackcontent.com/f1SGz78RE2H7ElkVKmlA',4,2),
        ('https://cdn.filestackcontent.com/vfRWW9nStKEZHXfD3z3Y',5,2),
        ('https://cdn.filestackcontent.com/Il6rwLG8QLayR4IUtWL9',1,3),
        ('https://cdn.filestackcontent.com/nfM7uN7dS9WSui2FAP58',2,3),
        ('https://cdn.filestackcontent.com/TyvtfcoVTOGmzh8aNHcd',3,3),
        ('https://cdn.filestackcontent.com/PB088qSkTrGSj5ugdcKy',4,3),
        ('https://cdn.filestackcontent.com/IlRmMkKTaOebpuJ5DC41',5,3),
        ('https://cdn.filestackcontent.com/MB5R51DQRuv7jSOerkgA',1,4),
        ('https://cdn.filestackcontent.com/ETNraeT7QJmlkZq7STYW',2,4),
        ('https://cdn.filestackcontent.com/HaccfppSQj25FYEEqpH7',3,4),
        ('https://cdn.filestackcontent.com/ydXl8EWVS2y4M1EJbqK5',4,4),
        ('https://cdn.filestackcontent.com/VLOjOCFRyuZtOro7luaw',5,4),
        ('https://cdn.discordapp.com/attachments/415980182021603329/1119086923118559272/dishes.png', 1,5),
        ('https://cdn.discordapp.com/attachments/415980182021603329/1119086924024528926/dishes3.png',2,5),
        ('https://cdn.discordapp.com/attachments/415980182021603329/1119086924271980576/dishes4.png',3,5),
        ('https://cdn.discordapp.com/attachments/415980182021603329/1119086924553007215/dishes5.png',4,5),
        ('https://cdn.discordapp.com/attachments/415980182021603329/1119086924838223883/dishes6.png',5,5);

INSERT INTO battles (monster_id, user_id, title, status)
VALUES (1, 1, 'Battle name 1 placholder', 0),
       (2, 1, 'Battle name 2 placholder', 0),
       (3, 1, 'Battle name 3 placholder', 0);

INSERT INTO tasks (battle_id, task_body, task_complete)
VALUES (1, 'Clean the living room',0),
       (1, 'Vacuum the carpets',0),
       (1, 'Dust the furniture',0),
       (1, 'Mop the floors',0),
       (1, 'Organize the shelves',0),
       (2, 'Wipe down kitchen countertops',0),
       (2, 'Clean the oven',0),
       (2, 'Scrub the sink',0),
       (2, 'Sweep the kitchen floor',0),
       (2, 'Empty the trash',0),
       (3, 'Dust and polish wood surfaces',0),
       (3, 'Clean the windows',0),
       (3, 'Vacuum curtains',0),
       (3, 'Clean ceiling fans',0),
       (3, 'Wipe down baseboards',0);
