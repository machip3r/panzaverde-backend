DROP DATABASE IF EXISTS panzaverde;
CREATE DATABASE IF NOT EXISTS panzaverde;

USE panzaverde;

/* USER */

CREATE TABLE
    IF NOT EXISTS pvUser(
        id_user INT UNSIGNED AUTO_INCREMENT,
        u_name VARCHAR(50) NOT NULL,
        u_password VARCHAR(200) NOT NULL,
        u_type ENUM(
            'Admin',
            'Cooker',
            'Driver',
            'Other'
        ) NOT NULL,
        PRIMARY KEY (id_user)
    );

/* INVENTORY */

CREATE TABLE
    IF NOT EXISTS pvProduct(
        id_product INT UNSIGNED AUTO_INCREMENT,
        p_name VARCHAR(80) NOT NULL,
        p_price DECIMAL(10, 2) NOT NULL,
        p_stock TINYINT UNSIGNED NOT NULL,
        p_unit VARCHAR(10) NOT NULL,
        PRIMARY KEY (id_product)
    );

CREATE TABLE
    IF NOT EXISTS pvOrder(
        id_order INT UNSIGNED AUTO_INCREMENT,
        o_status CHAR(1) NOT NULL DEFAULT 'a',
        o_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        o_total DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (id_order)
    );

CREATE TABLE
    IF NOT EXISTS pvOrderProduct(
        id_order_product INT UNSIGNED AUTO_INCREMENT,
        id_product INT UNSIGNED NOT NULL,
        id_order INT UNSIGNED NOT NULL,
        op_quantity INT UNSIGNED NOT NULL,
        op_price DECIMAL(10, 2) NOT NULL,
        CONSTRAINT fk_order_product_product FOREIGN KEY (id_product) REFERENCES pvProduct (id_product) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_order_product_order FOREIGN KEY (id_order) REFERENCES pvOrder (id_order) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (id_order_product)
    );

/* ROUTES */

CREATE TABLE
    IF NOT EXISTS pvRoute(
        id_route TINYINT UNSIGNED AUTO_INCREMENT,
        r_name VARCHAR(50) NOT NULL,
        r_color VARCHAR(30) NULL,
        PRIMARY KEY (id_route)
    );

/* MEAL */

CREATE TABLE
    IF NOT EXISTS pvSocialNetwork(
        id_social_network TINYINT UNSIGNED AUTO_INCREMENT,
        sn_name VARCHAR(20) NOT NULL,
        UNIQUE(sn_name),
        PRIMARY KEY (id_social_network)
    );

CREATE TABLE
    IF NOT EXISTS pvClient(
        id_client INT UNSIGNED AUTO_INCREMENT,
        id_social_network TINYINT UNSIGNED NOT NULL,
        c_name VARCHAR(80) NOT NULL,
        c_address VARCHAR(300) NULL,
        c_phone VARCHAR(10) NULL,
        c_status CHAR(1) NOT NULL DEFAULT 'a',
        CONSTRAINT fk_client_social_network FOREIGN KEY (id_social_network) REFERENCES pvSocialNetwork (id_social_network) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (id_client)
    );

CREATE TABLE
    IF NOT EXISTS pvSubscription(
        id_subscription INT UNSIGNED AUTO_INCREMENT,
        id_client INT UNSIGNED NOT NULL,
        id_route TINYINT UNSIGNED NOT NULL,
        s_specification VARCHAR(300) NULL,
        s_status CHAR(1) NOT NULL DEFAULT 'a',
        s_start_date DATE NULL,
        s_final_date DATE NULL,
        s_payment_date DATE NULL,
        s_payment_type VARCHAR(20) NULL,
        s_total DECIMAL(10, 2) NULL,
        CONSTRAINT fk_subscription_client FOREIGN KEY (id_client) REFERENCES pvClient (id_client) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_subscription_route FOREIGN KEY (id_route) REFERENCES pvRoute (id_route) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (id_subscription)
    );

CREATE TABLE
    IF NOT EXISTS pvDay(
        id_day TINYINT UNSIGNED AUTO_INCREMENT,
        d_name VARCHAR(10) NOT NULL,
        UNIQUE(d_name),
        PRIMARY KEY (id_day)
    );

INSERT INTO pvDay (d_name) VALUES ("Lunes");

INSERT INTO pvDay (d_name) VALUES ("Martes");

INSERT INTO pvDay (d_name) VALUES ("Miércoles");

INSERT INTO pvDay (d_name) VALUES ("Jueves");

INSERT INTO pvDay (d_name) VALUES ("Viernes");

CREATE TABLE
    IF NOT EXISTS pvTime(
        id_time TINYINT UNSIGNED AUTO_INCREMENT,
        t_name VARCHAR(10) NOT NULL,
        UNIQUE(t_name),
        PRIMARY KEY (id_time)
    );

INSERT INTO pvTime (t_name) VALUES ("Desayuno");

INSERT INTO pvTime (t_name) VALUES ("Comida");

INSERT INTO pvTime (t_name) VALUES ("Cena");

CREATE TABLE
    IF NOT EXISTS pvMealType(
        id_meal_type TINYINT UNSIGNED AUTO_INCREMENT,
        mt_name VARCHAR(20) NOT NULL,
        UNIQUE(mt_name),
        PRIMARY KEY (id_meal_type)
    );

INSERT INTO pvMealType (mt_name) VALUES ("Normal");

INSERT INTO pvMealType (mt_name) VALUES ("Keto");

INSERT INTO pvMealType (mt_name) VALUES ("Especial");

INSERT INTO pvMealType (mt_name) VALUES ("Vegetariano");

CREATE TABLE
    IF NOT EXISTS pvPlan(
        id_subscription INT UNSIGNED NOT NULL,
        id_day TINYINT UNSIGNED NOT NULL,
        id_meal_type TINYINT UNSIGNED NOT NULL,
        id_time TINYINT UNSIGNED NOT NULL,
        p_quantity TINYINT NOT NULL,
        p_price DECIMAL(10, 2) NULL,
        CONSTRAINT fk_plan_subscription FOREIGN KEY (id_subscription) REFERENCES pvSubscription (id_subscription) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_plan_day FOREIGN KEY (id_day) REFERENCES pvDay (id_day) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_plan_meal_type FOREIGN KEY (id_meal_type) REFERENCES pvMealType (id_meal_type) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_plan_time FOREIGN KEY (id_time) REFERENCES pvTime (id_time) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (
            id_subscription,
            id_day,
            id_meal_type,
            id_time
        )
    );

/* RECIPES */

CREATE TABLE
    IF NOT EXISTS pvRecipe(
        id_recipe INT UNSIGNED AUTO_INCREMENT,
        r_name VARCHAR(150) NOT NULL,
        r_description VARCHAR(3000) NOT NULL,
        UNIQUE(r_name),
        PRIMARY KEY (id_recipe)
    );

CREATE TABLE
    IF NOT EXISTS pvIngredient(
        id_ingredient INT UNSIGNED AUTO_INCREMENT,
        i_name VARCHAR(150) NOT NULL,
        i_unit VARCHAR(10) NOT NULL,
        UNIQUE(i_name),
        PRIMARY KEY (id_ingredient)
    );

CREATE TABLE
    IF NOT EXISTS pvRecipeIngredient(
        id_recipe INT UNSIGNED NOT NULL,
        id_ingredient INT UNSIGNED NOT NULL,
        ri_cuantity INT UNSIGNED NOT NULL,
        CONSTRAINT fk_recipe_ingredient_recipe FOREIGN KEY (id_recipe) REFERENCES pvRecipe (id_recipe) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_recipe_ingredient_ingredient FOREIGN KEY (id_ingredient) REFERENCES pvIngredient (id_ingredient) ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY (id_recipe, id_ingredient)
    );

/* TRIGGERS */

/* DELIMITER ; */
