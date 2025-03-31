DROP TABLE IF EXISTS public.global_configuration CASCADE;
DROP TABLE IF EXISTS public.type_double_damage_to CASCADE;
DROP TABLE IF EXISTS public.type_half_damage_to CASCADE;
DROP TABLE IF EXISTS public.type_no_damage_to CASCADE;
DROP TABLE IF EXISTS public.pokemon_type CASCADE;
DROP TABLE IF EXISTS public.move CASCADE;
DROP TABLE IF EXISTS public.move_category CASCADE;
DROP TABLE IF EXISTS public.type CASCADE;
DROP TABLE IF EXISTS public.nature CASCADE;
DROP TABLE IF EXISTS public.stats CASCADE;
DROP TABLE IF EXISTS public.ability CASCADE;
DROP TABLE IF EXISTS public.team_pokemon CASCADE;
DROP TABLE IF EXISTS public.user_team CASCADE;
DROP TABLE IF EXISTS public.user CASCADE;
DROP TABLE IF EXISTS public.user_role CASCADE;
DROP TABLE IF EXISTS public.pokemon CASCADE;

--TODO tabella per associare ad ogni pokemon scelto dall'utente fino a 4 mosse

CREATE TABLE public.global_configuration
(
    pk_global_configuration SMALLINT     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "key"                   VARCHAR(25)  NOT NULL,
    value                   VARCHAR(255) NOT NULL,
    description             VARCHAR(255),
    CONSTRAINT unique_config_key UNIQUE ("key")
);

CREATE TABLE public.user_role
(
    pk_role SMALLINT    NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    VARCHAR(10) NOT NULL
);

CREATE TABLE public.user
(
    firebase_uid VARCHAR(28) NOT NULL PRIMARY KEY,
    fk_role      SMALLINT    NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (fk_role) REFERENCES public.user_role (pk_role) ON DELETE CASCADE
);

CREATE TABLE public.user_team
(
    pk_user_team INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         VARCHAR(50) NOT NULL,
    fk_user_uid  VARCHAR(28) NOT NULL,
    created_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (fk_user_uid) REFERENCES public.user (firebase_uid) ON DELETE CASCADE,
    CONSTRAINT unique_user_team_name UNIQUE (fk_user_uid, name)
);
CREATE INDEX idx_user_team_created_at ON public.user_team (created_at);
CREATE INDEX idx_user_team_user_created_at ON public.user_team (fk_user_uid, created_at);


CREATE TABLE public.pokemon
(
    pk_pokemon      INTEGER       NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    index           INTEGER       NOT NULL,
    name            VARCHAR(50)   NOT NULL,
    height          INTEGER       NOT NULL,
    weight          INTEGER       NOT NULL,
    base_experience INTEGER       NOT NULL,
    sprite_ref      VARCHAR(1000) NOT NULL
);

CREATE TABLE public.team_pokemon
(
    fk_user_team INTEGER  NOT NULL,
    fk_pokemon   INTEGER  NOT NULL,
    team_member  SMALLINT NOT NULL CHECK (team_member BETWEEN 1 AND 6),
    PRIMARY KEY (fk_user_team, team_member),
    FOREIGN KEY (fk_user_team) REFERENCES public.user_team (pk_user_team) ON DELETE CASCADE,
    FOREIGN KEY (fk_pokemon) REFERENCES public.pokemon (pk_pokemon)
);

CREATE TABLE public.stats
(
    pk_stat INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    VARCHAR(50) NOT NULL
);

CREATE TABLE public.nature
(
    pk_nature  INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,
    bonus_stat INTEGER     NOT NULL,
    malus_stat INTEGER     NOT NULL,
    FOREIGN KEY (bonus_stat) REFERENCES public.stats (pk_stat) ON DELETE CASCADE,
    FOREIGN KEY (malus_stat) REFERENCES public.stats (pk_stat) ON DELETE CASCADE
);

CREATE TABLE public.ability
(
    pk_ability  INTEGER       NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(50)   NOT NULL,
    description VARCHAR(1000) NOT NULL
);

CREATE TABLE public.type
(
    pk_type INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name    VARCHAR(50) NOT NULL
);

CREATE TABLE public.move_category
(
    pk_move_category INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name             VARCHAR(50) NOT NULL
);

CREATE TABLE public.move
(
    pk_move          INTEGER     NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name             VARCHAR(50) NOT NULL,
    description      VARCHAR(250),
    accuracy         INTEGER CHECK (accuracy BETWEEN 0 AND 101),
    power            INTEGER,
    pp               INTEGER,
    priority         INTEGER,
    effect           VARCHAR(250),
    effect_chance    INTEGER,
    fk_move_category INTEGER     NOT NULL,
    fk_type          INTEGER     NOT NULL,
    FOREIGN KEY (fk_type) REFERENCES public.type (pk_type) ON DELETE CASCADE,
    FOREIGN KEY (fk_move_category) REFERENCES public.move_category (pk_move_category) ON DELETE CASCADE
);

CREATE TABLE public.pokemon_type
(
    fk_pokemon INTEGER  NOT NULL,
    fk_type    INTEGER  NOT NULL,
    type_order SMALLINT NOT NULL CHECK (type_order IN (1, 2)), -- 1 = Tipo primario, 2 = Tipo secondario
    PRIMARY KEY (fk_pokemon, type_order),                      -- Un Pokémon può avere massimo 2 tipi distinti
    FOREIGN KEY (fk_pokemon) REFERENCES public.pokemon (pk_pokemon) ON DELETE CASCADE,
    FOREIGN KEY (fk_type) REFERENCES public.type (pk_type) ON DELETE CASCADE
);

-- Relazione "double damage to" (questo tipo infligge il doppio danno a un altro tipo)
CREATE TABLE public.type_double_damage_to
(
    fk_type     INTEGER NOT NULL,
    target_type INTEGER,
    PRIMARY KEY (fk_type, target_type),
    FOREIGN KEY (fk_type) REFERENCES public.type (pk_type) ON DELETE CASCADE,
    FOREIGN KEY (target_type) REFERENCES public.type (pk_type) ON DELETE CASCADE
);

-- Relazione "half damage to" (questo tipo infligge metà danno a un altro tipo)
CREATE TABLE public.type_half_damage_to
(
    fk_type     INTEGER NOT NULL,
    target_type INTEGER,
    PRIMARY KEY (fk_type, target_type),
    FOREIGN KEY (fk_type) REFERENCES public.type (pk_type) ON DELETE CASCADE,
    FOREIGN KEY (target_type) REFERENCES public.type (pk_type) ON DELETE CASCADE
);

-- Relazione "no damage to" (questo tipo NON infligge danno a un altro tipo)
CREATE TABLE public.type_no_damage_to
(
    fk_type     INTEGER NOT NULL,
    target_type INTEGER,
    PRIMARY KEY (fk_type, target_type),
    FOREIGN KEY (fk_type) REFERENCES public.type (pk_type) ON DELETE CASCADE,
    FOREIGN KEY (target_type) REFERENCES public.type (pk_type) ON DELETE CASCADE
);
