 -- ============================================
-- BASE DE DATOS RECICLA
-- Estructura principal
-- ============================================

-- TABLA: plasticos
CREATE TABLE IF NOT EXISTS plasticos (
    id VARCHAR(10) PRIMARY KEY,
    codigo_resina INTEGER NOT NULL UNIQUE
        CHECK (codigo_resina BETWEEN 1 AND 7),
    sigla VARCHAR(20) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    caracteristicas TEXT,
    productos_comunes TEXT,
    propiedades TEXT,
    recomendaciones_manejo TEXT,
    aprovechamiento TEXT,
    observaciones TEXT,
    fuente TEXT,
    fecha_verificacion DATE
);

-- TABLA: recicladores
CREATE TABLE IF NOT EXISTS recicladores (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    tipo VARCHAR(150),
    ciudad VARCHAR(100) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(150),
    email VARCHAR(200),
    sitio_web TEXT,
    materiales_aceptados TEXT,
    servicios TEXT,
    horarios TEXT,
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7),
    fuente TEXT,
    fecha_verificacion DATE,
    observaciones TEXT
);

-- TABLA: compatibilidad
CREATE TABLE IF NOT EXISTS compatibilidad (
    id VARCHAR(20) PRIMARY KEY,
    reciclador_id VARCHAR(10) NOT NULL,
    plastico_id VARCHAR(10) NOT NULL,
    compatibilidad VARCHAR(30) NOT NULL
        CHECK (
            compatibilidad IN (
                'confirmed_historical',
                'pending_verification'
            )
        ),
    tipo_evidencia VARCHAR(100),
    evidencia TEXT,
    fuente TEXT,
    fecha_fuente DATE,
    fecha_verificacion DATE,
    observaciones TEXT,

    CONSTRAINT fk_compatibilidad_reciclador
        FOREIGN KEY (reciclador_id)
        REFERENCES recicladores(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_compatibilidad_plastico
        FOREIGN KEY (plastico_id)
        REFERENCES plasticos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_reciclador_plastico
        UNIQUE (reciclador_id, plastico_id)
);

-- ÍNDICES
CREATE INDEX IF NOT EXISTS idx_plasticos_codigo_resina
    ON plasticos(codigo_resina);

CREATE INDEX IF NOT EXISTS idx_recicladores_ciudad
    ON recicladores(ciudad);

CREATE INDEX IF NOT EXISTS idx_compatibilidad_reciclador
    ON compatibilidad(reciclador_id);

CREATE INDEX IF NOT EXISTS idx_compatibilidad_plastico
    ON compatibilidad(plastico_id);

CREATE INDEX IF NOT EXISTS idx_compatibilidad_estado
    ON compatibilidad(compatibilidad);

-- =====================================================
-- ACTUALIZACIÓN DE RECICLA
-- Información de recepción y verificación
-- Mantiene los registros existentes
-- =====================================================

BEGIN;

-- 1. Información sobre recepción de materiales
ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS recibe_ciudadanos BOOLEAN;

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS acepta_personas_naturales BOOLEAN;

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS acepta_personas_juridicas BOOLEAN;

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS cantidad_minima TEXT;

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS condiciones_recepcion TEXT;

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS observaciones_recepcion TEXT;

-- 2. Estado de verificación de cada organización
ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS estado_verificacion VARCHAR(30)
DEFAULT 'pendiente';

ALTER TABLE recicladores
ADD COLUMN IF NOT EXISTS fecha_actualizacion DATE;

-- 3. Validar los estados permitidos
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_recicladores_estado_verificacion'
    ) THEN
        ALTER TABLE recicladores
        ADD CONSTRAINT chk_recicladores_estado_verificacion
        CHECK (
            estado_verificacion IN (
                'pendiente',
                'verificada',
                'requiere_actualizacion'
            )
        );
    END IF;
END $$;

-- 4. Ampliar los estados de compatibilidad
-- Se conserva la información histórica existente.
ALTER TABLE compatibilidad
DROP CONSTRAINT IF EXISTS compatibilidad_compatibilidad_check;

ALTER TABLE compatibilidad
ADD CONSTRAINT compatibilidad_compatibilidad_check
CHECK (
    compatibilidad IN (
        'confirmed_historical',
        'confirmed_current',
        'pending_verification'
    )
);

COMMIT;
