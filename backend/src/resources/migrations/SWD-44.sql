CREATE TABLE `swapme`.`category` (
                                         `id` INT NOT NULL,
                                         `version` INT NOT NULL,
                                         `title` VARCHAR(255) NOT NULL,
                                         `image` TEXT,
                                         PRIMARY KEY (`id`)
);
INSERT INTO category (id, version, title, image) VALUES (1, 1, 'Thời trang nam', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997958/image_1_l3evib.png');
INSERT INTO category (id, version, title, image) VALUES (2, 1, 'Thời trang nữ', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997958/image_1_1_tlxxvb.png');
INSERT INTO category (id, version, title, image) VALUES (3, 1, 'Giày dép', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997957/image_1_2_n0zjhf.png');
INSERT INTO category (id, version, title, image) VALUES (4, 1, 'Phụ kiện & Trang sức', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997958/image_1_3_jn1snx.png');
INSERT INTO category (id, version, title, image) VALUES (5, 1, 'Mỹ phẩm', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997957/image_1_4_uhwj5t.png');
INSERT INTO category (id, version, title, image) VALUES (6, 1, 'Đồ điện tử', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997957/image_1_5_zxdrbc.png');
INSERT INTO category (id, version, title, image) VALUES (7, 1, 'Đồ gia dụng', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997958/image_1_6_zcrlkg.png');
INSERT INTO category (id, version, title, image) VALUES (8, 1, 'Nội thất', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719998252/image_1_10_oxxpwm.png');
INSERT INTO category (id, version, title, image) VALUES (9, 1, 'Sách', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997957/image_1_7_vjkr6o.png');
INSERT INTO category (id, version, title, image) VALUES (10, 1, 'Văn phòng phẩm', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719997957/image_1_7_vjkr6o.png');
INSERT INTO category (id, version, title, image) VALUES (11, 1, 'Giải trí', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719998324/image_1_11_z5o5kd.png');
INSERT INTO category (id, version, title, image) VALUES (12, 1, 'Thể thao', 'https://res.cloudinary.com/dgkth0wxx/image/upload/v1719999034/image_1_9_nvjhns.png');
DROP TABLE `swapme`.`category`;