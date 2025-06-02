-- -------------------------------------------------------------
-- TablePlus 6.4.4(604)
--
-- https://tableplus.com/
--
-- Database: baemindb
-- Generation Time: 2025-06-02 19:44:22.9910
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."banneritems";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS banneritems_id_seq;

-- Table Definition
CREATE TABLE "public"."banneritems" (
    "id" int4 NOT NULL DEFAULT nextval('banneritems_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "url" varchar(500),
    "imgsrc" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."branches";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS branch_id_seq;

-- Table Definition
CREATE TABLE "public"."branches" (
    "id" int4 NOT NULL DEFAULT nextval('branch_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text,
    "img" text,
    "tradinghour" text,
    "pricerange" text,
    "total_rating" float8,
    "number_of_rating" int4,
    "company_id" int4,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."branchmenu";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS branchmenu_id_seq;

-- Table Definition
CREATE TABLE "public"."branchmenu" (
    "id" int4 NOT NULL DEFAULT nextval('branchmenu_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "icon" text,
    "branch_id" int4,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "menu_flag" int4 DEFAULT 0 CHECK (menu_flag = ANY (ARRAY[0, 1, 2, 3])),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."combo_foods";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS combo_id_seq;

-- Table Definition
CREATE TABLE "public"."combo_foods" (
    "id" int4 NOT NULL DEFAULT nextval('combo_id_seq'::regclass),
    "menu_id" int4,
    "name" varchar(255) NOT NULL,
    "description" text,
    "price" numeric(10,2),
    "img" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "promotion_flag" int4 DEFAULT 3,
    "tag" varchar(250),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."companies";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS companies_id_seq;

-- Table Definition
CREATE TABLE "public"."companies" (
    "id" int4 NOT NULL DEFAULT nextval('companies_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "img" text,
    "tel" varchar(20),
    "address" text,
    "commission" float8,
    "tag" varchar(100),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."menu";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS menu_id_seq;

-- Table Definition
CREATE TABLE "public"."menu" (
    "id" int4 NOT NULL DEFAULT nextval('menu_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "imgsrc" varchar(500),
    "description" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."order_detail";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_detail_id_seq;

-- Table Definition
CREATE TABLE "public"."order_detail" (
    "id" int4 NOT NULL DEFAULT nextval('order_detail_id_seq'::regclass),
    "order_id" int4,
    "food_id" int4,
    "name" varchar(255),
    "quantity" int4,
    "amount" numeric(10,2),
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "user_id" int4,
    "user_name" varchar(255),
    "user_phone" varchar(20),
    "delivery_address" text,
    "total_price" numeric(10,2),
    "del_flag" bool DEFAULT false,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "discount_code" text,
    "discount_amount" numeric(10,2) DEFAULT 0 CHECK (discount_amount >= (0)::numeric),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."promotions";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS promotions_id_seq;

-- Table Definition
CREATE TABLE "public"."promotions" (
    "id" int4 NOT NULL DEFAULT nextval('promotions_id_seq'::regclass),
    "promotioncode" text NOT NULL,
    "expire_date" date NOT NULL,
    "companies_id" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "first_name" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "username" varchar(100) NOT NULL,
    "phone" varchar(20) NOT NULL,
    "email" varchar(150) NOT NULL,
    "password" text NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "address" varchar(100) DEFAULT 'TPHCM'::character varying,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."banneritems" ("id", "name", "url", "imgsrc") VALUES
(1, 'Baemin Sale', '/search', '/images/map1.png'),
(2, 'Trà sữa chân ái', '/search', '/images/map2.png'),
(3, 'Đặt món mình giền', '/search', '/images/map3.png');

INSERT INTO "public"."branches" ("id", "name", "address", "img", "tradinghour", "pricerange", "total_rating", "number_of_rating", "company_id", "created_at", "updated_at") VALUES
(1, 'KFC Nguyễn Trãi Q1', '123 Nguyễn Trãi Q1', '/images/KFC_logo.svg', 'Mon-Sun: 10am - 9pm', '50k-200k', 4.5, 120, 1, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695'),
(2, 'Jollibee Nguyễn Trãi Q1', '456 Nguyễn Trãi Q1', '/images/Jollibee_logo.png', 'Mon-Fri: 11am - 8pm', '30k-300k', 4.2, 85, 2, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695'),
(3, 'Lotteria Nguyễn Trãi Q1', '789 Nguyễn Trãi Q1', '/images/lotteria.png', 'Mon-Sun: 10am - 10pm', '20k-400k', 3.5, 150, 3, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695'),
(4, 'Starbucks Nguyễn Trãi Q1', '321 Nguyễn Trãi Q1', '/images/starbucks.png', 'Tue-Sun: 11am - 7pm', '60k-200k', 4.3, 98, 4, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695'),
(5, 'Phúc Long Nguyễn Trãi Q1', '321 Nguyễn Trãi Q1', '/images/phuclong.png', 'Tue-Sun: 11am - 7pm', '55k-99k', 4.3, 98, 5, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695'),
(6, 'Burger King Nguyễn Trãi Q1', '543 Nguyễn Trãi Q1', '/images/burgerking.png', 'Mon-Sat: 9am - 6pm', '45k-300k', 4.8, 210, 6, '2025-05-25 11:41:24.888695', '2025-05-25 11:41:24.888695');

INSERT INTO "public"."branchmenu" ("id", "name", "icon", "branch_id", "created_at", "updated_at", "menu_flag") VALUES
(6, 'Món Mới', '/images/new_dish.png', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 2),
(7, 'Family combo', '/images/familycombo.png', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 0),
(8, 'Gà Rán', '/images/Ga.png', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 3),
(9, 'Burger', '/images/burger.jpg', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 3),
(10, 'Khuyến Mãi', '/images/promotion.png', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 1),
(11, 'Cafe', '/images/cafe.png', 1, '2025-05-25 12:18:06.432242', '2025-05-25 12:18:06.432242', 3),
(12, 'Món Mới', '/images/new_dish.png', 2, '2025-05-25 12:20:42.771951', '2025-05-25 12:20:42.771951', 2),
(13, 'Family combo', '/images/familycombo.png', 2, '2025-05-25 12:20:42.771951', '2025-05-25 12:20:42.771951', 0),
(14, 'Gà Rán', '/images/Ga.png', 2, '2025-05-25 12:20:42.771951', '2025-05-25 12:20:42.771951', 3),
(15, 'Burger', '/images/burger.jpg', 2, '2025-05-25 12:20:42.771951', '2025-05-25 12:20:42.771951', 3),
(16, 'Khuyến Mãi', '/images/promotion.png', 2, '2025-05-25 12:20:42.771951', '2025-05-25 12:20:42.771951', 1),
(17, 'Món Mới', '/images/new_dish.png', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 2),
(18, 'Combo', '/images/familycombo.png', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 0),
(19, 'Gà Rán', '/images/Ga.png', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 3),
(20, 'Burger', '/images/burger.jpg', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 3),
(21, 'Khuyến Mãi', '/images/promotion.png', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 1),
(22, 'Cafe', '/images/cafe.png', 3, '2025-05-25 12:21:24.923466', '2025-05-25 12:21:24.923466', 3),
(23, 'Món Mới', '/images/new_dish.png', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 2),
(24, 'Combo', '/images/familycombo.png', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 0),
(25, 'Trà Sữa', '/images/Ga.png', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 3),
(26, 'Bánh ngọt', '/images/burger.jpg', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 3),
(27, 'Khuyến Mãi', '/images/promotion.png', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 1),
(28, 'Cafe', '/images/cafe.png', 4, '2025-05-25 12:23:00.482012', '2025-05-25 12:23:00.482012', 3),
(29, 'Món Mới', '/images/new_dish.png', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 2),
(30, 'Combo', '/images/familycombo.png', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 0),
(31, 'Trà Sữa', '/images/Ga.png', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 3),
(32, 'Bánh ngọt', '/images/burger.jpg', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 3),
(33, 'Khuyến Mãi', '/images/promotion.png', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 1),
(34, 'Cafe', '/images/cafe.png', 5, '2025-05-25 12:23:37.943076', '2025-05-25 12:23:37.943076', 3),
(35, 'Món Mới', '/images/new_dish.png', 6, '2025-05-25 12:24:18.404815', '2025-05-25 12:24:18.404815', 2),
(36, 'Family combo', '/images/familycombo.png', 6, '2025-05-25 12:24:18.404815', '2025-05-25 12:24:18.404815', 0),
(37, 'Gà Rán', '/images/Ga.png', 6, '2025-05-25 12:24:18.404815', '2025-05-25 12:24:18.404815', 3),
(38, 'Burger', '/images/burger.jpg', 6, '2025-05-25 12:24:18.404815', '2025-05-25 12:24:18.404815', 3),
(39, 'Khuyến Mãi', '/images/promotion.png', 6, '2025-05-25 12:24:18.404815', '2025-05-25 12:24:18.404815', 1);

INSERT INTO "public"."combo_foods" ("id", "menu_id", "name", "description", "price", "img", "created_at", "updated_at", "promotion_flag", "tag") VALUES
(1, 6, 'Gà ngũ vị', 'Gà hầm nhiệt độ cao trong 5h với 5 loại gia vị bí mật', 25000.00, '/images/ganguvi.jpg', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 2, 'Gà rán, Burger'),
(2, 6, 'Burger Hongkong', '2 cái Hamburger theo kiểu Hongkong', 35000.00, '/images/burgerhk.jpg', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 2, 'Gà rán, Burger'),
(3, 7, 'Combo Gia Đình', '1 miếng gà giòn, 1 bánh kẹp gà rút xương, 1 chai cola nhỏ', 60000.00, '/images/comboga.png', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 0, 'Gà rán, Burger'),
(4, 7, 'Combo đặc biệt', 'Combo giảm giá tháng này', 45000.00, '/images/combodb.png', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 0, 'Gà rán, Burger'),
(5, 8, 'Gà cay cấp độ 4', 'gà cay cấp độ 4', 15000.00, '/images/gacay4.png', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 3, 'Gà rán, Burger'),
(6, 9, 'Burger bò Angus', 'Burger bò Angus', 30000.00, '/images/burger11.jpg', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 3, NULL),
(7, 10, 'Khuyến mãi đặc biệt', 'Combo giảm giá tháng này', 40000.00, '/images/kmdb.jpg', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 1, NULL),
(8, 10, 'Khuyến mãi mùa hè', 'Combo giảm giá mùa hè', 60000.00, '/images/kmh.jpg', '2025-05-25 13:00:01.235286', '2025-05-25 13:00:01.235286', 1, NULL),
(9, 12, 'Gà ngũ vị Joli', 'Gà hầm nhiệt độ cao trong 5h với 5 loại gia vị bí mật', 25000.00, '/images/ganguvi.jpg', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 2, 'Gà rán, Burger'),
(10, 12, 'Burger Hongkong Joli', '2 cái Hamburger theo kiểu Hongkong', 35000.00, '/images/burgerhk.jpg', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 2, NULL),
(11, 13, 'Combo Gia Đình Joli', '1 miếng gà giòn, 1 bánh kẹp gà rút xương, 1 chai cola nhỏ', 60000.00, '/images/comboga.png', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 0, NULL),
(12, 13, 'Combo đặc biệt Joli', 'Combo giảm giá tháng này', 45000.00, '/images/combodb.png', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 0, NULL),
(13, 14, 'Gà cay cấp độ 4 Joli', 'gà cay cấp độ 4', 15000.00, '/images/gacay4.png', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 3, NULL),
(14, 15, 'Burger bò Angus Joli', 'Burger bò Angus', 30000.00, '/images/burger11.jpg', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 3, 'Burger'),
(15, 16, 'Khuyến mãi đặc biệt Joli', 'Combo giảm giá tháng này', 40000.00, '/images/kmdb.jpg', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 1, NULL),
(16, 16, 'Khuyến mãi mùa hè Joli', 'Combo giảm giá mùa hè', 60000.00, '/images/kmh.jpg', '2025-05-25 13:01:53.252014', '2025-05-25 13:01:53.252014', 1, NULL),
(17, 17, 'Gà ngũ vị LOTE', 'Gà hầm nhiệt độ cao trong 5h với 5 loại gia vị bí mật', 25000.00, '/images/ganguvi.jpg', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 2, 'Gà rán, Burger'),
(18, 17, 'Burger Hongkong LOTE', '2 cái Hamburger theo kiểu Hongkong', 35000.00, '/images/burgerhk.jpg', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 2, 'Burger'),
(19, 18, 'Combo Gia Đình LOTE', '1 miếng gà giòn, 1 bánh kẹp gà rút xương, 1 chai cola nhỏ', 60000.00, '/images/comboga.png', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 0, NULL),
(20, 18, 'Combo đặc biệt LOTE', 'Combo giảm giá tháng này', 45000.00, '/images/combodb.png', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 0, NULL),
(21, 19, 'Gà cay cấp độ 4 LOTE', 'gà cay cấp độ 4', 15000.00, '/images/gacay4.png', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 3, NULL),
(22, 20, 'Burger bò Angus LOTE', 'Burger bò Angus', 30000.00, '/images/burger11.jpg', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 3, NULL),
(23, 21, 'Khuyến mãi đặc biệt LOTE', 'Combo giảm giá tháng này', 40000.00, '/images/kmdb.jpg', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 1, NULL),
(24, 21, 'Khuyến mãi mùa hè LOTE', 'Combo giảm giá mùa hè', 60000.00, '/images/kmh.jpg', '2025-05-25 13:03:06.36236', '2025-05-25 13:03:06.36236', 1, NULL),
(25, 23, 'Trà sữa đào mới Starbucks', 'Trà sữa đào mới full toping Starbucks', 25000.00, '/images/trasuadao.jpg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 2, 'Trà sữa, cà phê'),
(26, 23, 'Capuchino blast mới Starbucks', 'Capuchino blast mới full cream', 35000.00, '/images/capuchino.png', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 2, 'Trà sữa, cà phê'),
(27, 24, 'Combo bánh ngọt cafe Starbucks', '2 cái bánh ngọt tự chọn và 1 ly cafe tự chọn', 160000.00, '/images/combobanh.jpeg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 0, 'Bánh ngọt, Cà phê'),
(28, 24, 'Combo đặc biệt Starbucks', 'Combo đặc biệt Starbucks', 45000.00, '/images/combodbcafe.jpg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 0, 'Bánh ngọt, Cà phê'),
(29, 25, 'Cafe sữa đá Starbucks', 'cafe sữa đá', 55000.00, '/images/ca_phe_sua_da.jpg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 3, 'Bánh ngọt, Cà phê'),
(30, 26, 'Bánh tiramisu Starbucks', 'Bánh tiramisu ', 30000.00, '/images/tiramisu-square.jpg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 3, 'Bánh ngọt, Cà phê'),
(31, 27, 'Khuyến mãi đặc biệt Starbucks', 'Combo giảm giá tháng này', 40000.00, '/images/kmdbcafe.jpeg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 1, 'Bánh ngọt, Cà phê'),
(32, 27, 'Khuyến mãi mùa hè Starbucks', 'Combo giảm giá mùa hè', 60000.00, '/images/kmhdb.jpeg', '2025-05-25 13:13:10.369822', '2025-05-25 13:13:10.369822', 1, 'Bánh ngọt, Cà phê');

INSERT INTO "public"."companies" ("id", "name", "img", "tel", "address", "commission", "tag", "created_at", "updated_at") VALUES
(1, 'KFC', '/imges/KFC_logo.svg', '0281234567', '123 Lê Lợi, Quận 1, TP.HCM', 5.5, 'Gà rán, burger', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(2, 'Jollibee', '/imges/Jollibee_logo.png', '0289876543', '456 Nguyễn Huệ, Quận 1, TP.HCM', 7, 'Gà rán, burger', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(3, 'Lotteria', '/imges/lotteria.png', '0289876543', '456 Nguyễn Huệ, Quận 1, TP.HCM', 7, 'Gà rán, burger', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(4, 'Starbucks', '/imges/starbucks.png', '0289876543', '456 Nguyễn Huệ, Quận 1, TP.HCM', 7, 'cafe, trà sữa, bánh ngọt', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(5, 'Phúc Long', '/imges/phuclong.png', '0289876543', '456 Nguyễn Huệ, Quận 1, TP.HCM', 7, 'cafe, trà sữa, bánh ngọt', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(6, 'Burger King', '/imges/burgerking.png', '0908123456', '789 Trần Hưng Đạo, Quận 5, TP.HCM', 6.2, 'burger', '2025-05-25 11:24:15.026699', '2025-05-25 11:24:15.026699'),
(8, 'Gongcha', '/images/ramen.jpg', '0888-222-2-2-2', 'điện biên phủ', 8.5, 'Trà sữa, bánh ngọt', '2025-05-25 13:55:46.241', '2025-05-25 13:55:46.241');

INSERT INTO "public"."menu" ("id", "name", "imgsrc", "description") VALUES
(1, 'Gà Rán', '/images/Ga.png', 'Gà chiên giòn'),
(2, 'Burger', '/images/burger.jpg', 'Tất cả các loại hamburger'),
(3, 'Bún', '/images/noddle.png', 'Các loại bún, bao gồm bún chả, bún bò Huế, bún xào....'),
(4, 'Mì', '/images/noddle.png', 'Các loại mì bao gồm, mì cay, mì xào, mì nước...'),
(5, 'Phở Bò', '/images/pho-bo.jpg', 'Món phở truyền thống với nước dùng đậm đà và thịt bò thái mỏng.'),
(6, 'Cơm Tấm', '/images/comtam.jpg', 'Cơm tấm sườn bì chả, ăn kèm với dưa leo và trứng ốp la.'),
(7, 'Gỏi Cuốn', '/images/goicuon.jpg', 'Món cuốn thanh mát gồm tôm, thịt, rau sống và bún, chấm với nước mắm.'),
(8, 'Ramen', '/images/ramen.jpg', 'Ramen là món mì của Nhật được nấu bằng nước cá đậm đà được ninh trong nhiều giờ liền.'),
(11, 'Trà sữa', '/images/trasua.png', 'Trà sữa trân châu...'),
(12, 'Cafe', '/images/cafe.png', 'cafe đá');

INSERT INTO "public"."order_detail" ("id", "order_id", "food_id", "name", "quantity", "amount", "created_at", "updated_at") VALUES
(27, 15, 1, 'Gà ngũ vị', 2, 500000.00, '2025-05-29 05:53:46.319', '2025-05-29 05:53:46.319'),
(28, 15, 2, 'Burger Hongkong', 1, 10.00, '2025-05-29 05:53:46.319', '2025-05-29 05:53:46.319');

INSERT INTO "public"."orders" ("id", "user_id", "user_name", "user_phone", "delivery_address", "total_price", "del_flag", "created_at", "updated_at", "discount_code", "discount_amount") VALUES
(15, 6, 'Panda', '123456789', '123 Test Street', 50.00, 'f', '2025-05-29 05:53:46.319', '2025-05-29 05:53:46.319', 'SAVE10', 5.00);

INSERT INTO "public"."promotions" ("id", "promotioncode", "expire_date", "companies_id") VALUES
(1, 'NEW_MEMBER', '2025-06-06', '1,2');

INSERT INTO "public"."users" ("id", "first_name", "last_name", "username", "phone", "email", "password", "created_at", "updated_at", "address") VALUES
(1, 'Louis', 'Panda', 'louis123', '0412345678', 'louis@example.com', '$2b$10$Z2/NCbXTTL4VZ6dvcTmOwu7AR2RHtIraDwGMWrzM7UM/9ZWibmg9O', '2025-05-25 08:40:39.532712', '2025-05-25 08:40:39.532712', 'TPHCM'),
(2, 'louis', 'Hua', 'liem123', '2222-2222', '444@gmail.com', '$2b$10$HhhgRQj5Y.3yyWqYlewteu8kEOlM.7WWtbMmI.unGJpOdtjT7P38m', '2025-05-25 18:20:03.233', '2025-05-25 18:20:03.233', '90 Phạm Văn Hai, Quận 1, TP HCM'),
(6, 'panda', 'Hua', 'liem1222', '2222-2222333', '444444@gmail.com', '$2b$10$H1/HyUA0X0MD37LQt6S3C.DeryOPjallSZrA/B66WoxlS/o4bfDEK', '2025-05-25 18:21:23.467', '2025-05-25 18:21:23.467', 'TPHCM');

ALTER TABLE "public"."branches" ADD FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX branch_pkey ON public.branches USING btree (id);
ALTER TABLE "public"."branchmenu" ADD FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE CASCADE;
ALTER TABLE "public"."combo_foods" ADD FOREIGN KEY ("menu_id") REFERENCES "public"."branchmenu"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX combo_pkey ON public.combo_foods USING btree (id);
ALTER TABLE "public"."order_detail" ADD FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;
ALTER TABLE "public"."order_detail" ADD FOREIGN KEY ("food_id") REFERENCES "public"."combo_foods"("id") ON DELETE SET NULL;
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;


-- Indices
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
