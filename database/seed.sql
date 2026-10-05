 -- =========================================================
-- ReCicla
-- Datos iniciales de la base de datos
-- =========================================================

-- =========================================================
-- 1. PLÁSTICOS
-- =========================================================

INSERT INTO plasticos (
    id,
    codigo_resina,
    sigla,
    nombre,
    descripcion,
    caracteristicas,
    productos_comunes,
    propiedades,
    recomendaciones_manejo,
    aprovechamiento,
    observaciones,
    fuente,
    fecha_verificacion
)
VALUES
(
    '1',
    1,
    'PET',
    'Polietilentereftalato',
    'Plástico ampliamente utilizado en envases y botellas para bebidas y alimentos.',
    'Generalmente transparente, ligero y resistente.',
    'Botellas de agua, botellas de bebidas, envases de alimentos y otros empaques.',
    'Buena resistencia mecánica y propiedades de barrera.',
    'Vaciar el contenido, limpiar cuando sea necesario y separar de otros materiales antes de su entrega.',
    'Puede ser aprovechado mediante procesos de reciclaje y transformación cuando existen condiciones adecuadas de separación y gestión.',
    'El código de identificación de resina no garantiza por sí solo que el material sea reciclable en todos los sistemas.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '2',
    2,
    'PEAD',
    'Polietileno de alta densidad',
    'Plástico utilizado en envases rígidos y diferentes productos de uso doméstico e industrial.',
    'Rígido, resistente y de baja absorción de humedad.',
    'Envases de productos de limpieza, recipientes, bidones y tapas.',
    'Buena resistencia química y mecánica.',
    'Vaciar, limpiar cuando sea necesario y separar de otros materiales.',
    'Puede ser recuperado y transformado en nuevos productos plásticos cuando existe una cadena de aprovechamiento adecuada.',
    'También puede encontrarse identificado internacionalmente como HDPE.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '3',
    3,
    'PVC',
    'Policloruro de vinilo',
    'Material plástico utilizado tanto en aplicaciones rígidas como flexibles.',
    'Puede presentarse rígido o flexible dependiendo de su formulación.',
    'Tuberías, perfiles, recubrimientos, algunos envases y productos de construcción.',
    'Durabilidad y resistencia química.',
    'Separar de otros tipos de plástico y consultar previamente las condiciones de recepción del gestor o reciclador.',
    'Su aprovechamiento depende de la composición del producto y de la capacidad del gestor que lo recibe.',
    'Debe verificarse la aceptación específica antes de entregarlo a una organización recicladora.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '4',
    4,
    'PEBD',
    'Polietileno de baja densidad',
    'Plástico utilizado principalmente en películas, bolsas y empaques flexibles.',
    'Flexible, ligero y resistente a la humedad.',
    'Bolsas, películas plásticas, envolturas y empaques flexibles.',
    'Flexibilidad y resistencia a la humedad.',
    'Mantener limpio y seco, retirar residuos y separar de otros materiales.',
    'Puede ser aprovechado mediante procesos de clasificación y transformación cuando el material cumple las condiciones requeridas.',
    'También puede encontrarse identificado internacionalmente como LDPE.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '5',
    5,
    'PP',
    'Polipropileno',
    'Plástico empleado en una amplia variedad de envases, recipientes y productos.',
    'Ligero, resistente y con buena tolerancia térmica.',
    'Tapas, recipientes, empaques, envases y artículos plásticos.',
    'Buena resistencia química y térmica.',
    'Vaciar, limpiar cuando sea necesario y separar adecuadamente antes de la entrega.',
    'Puede ser clasificado, recuperado y transformado cuando existe una cadena de aprovechamiento disponible.',
    'La aceptación depende de las condiciones y capacidades de cada reciclador.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '6',
    6,
    'PS',
    'Poliestireno',
    'Plástico utilizado en productos rígidos y también en presentaciones espumadas.',
    'Puede ser rígido o espumado y suele ser ligero.',
    'Vasos, bandejas, empaques protectores y algunos recipientes.',
    'Ligereza y capacidad de aislamiento en algunas presentaciones.',
    'Separar de otros materiales y verificar previamente si el reciclador recibe la presentación específica.',
    'Las posibilidades de aprovechamiento dependen del tipo de producto, su estado y la infraestructura disponible.',
    'La identificación como PS no implica aceptación automática por parte de los recicladores.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
),
(
    '7',
    7,
    'Otros',
    'Otras resinas de plásticos o mezclas',
    'Categoría que agrupa otras resinas plásticas, combinaciones o estructuras que no corresponden a los códigos 1 a 6.',
    'Sus características varían según la resina, mezcla o composición del producto.',
    'Productos fabricados con otras resinas, mezclas y algunos materiales multicapa.',
    'Las propiedades dependen específicamente del material que compone el producto.',
    'Identificar la composición cuando sea posible y consultar al gestor antes de realizar la entrega.',
    'El aprovechamiento depende del material específico y de la capacidad técnica del reciclador.',
    'El código 7 es una categoría y no corresponde a un único polímero. No debe interpretarse como reciclable automáticamente.',
    'Fuentes técnicas y documentales recopiladas para ReCicla.',
    '2026-09-26'
);

-- =========================================================
-- RECICLADORES
-- =========================================================

INSERT INTO recicladores (
  id,
  nombre,
  tipo,
  ciudad,
  direccion,
  telefono,
  email,
  sitio_web,
  materiales_aceptados,
  servicios,
  horarios,
  latitud,
  longitud,
  fuente,
  fecha_verificacion,
  observaciones
) VALUES

(
  'R01',
  'Replasander',
  'Empresa recuperadora/transformadora de plásticos',
  'Girón',
  'Carrera 14 No. 57-139 Km 7 Vía a Girón',
  '3168338448; 3124312197',
  'replasanderltda@gmail.com',
  'https://replasander.com.co/',
  'PET; PEAD; PVC; PEBD; PP; PS; Otros',
  'Recuperación y transformación de plásticos',
  'Lunes a viernes 07:00-12:00 y 13:20-17:00; sábado 07:00-13:00',
  NULL,
  NULL,
  'Sitio oficial de Replasander; CDMB; directorios consultados para ReCicla',
  '2026-09-26',
  'Ubicada en Girón, Santander. Se incluye por su relevancia para el área de estudio.'
),

(
  'R02',
  'Bello Renacer',
  'Cooperativa',
  'Girón',
  'Centro de acopio, El Carrasco, Kilómetro 4',
  '3153296499',
  'bellorenacer7@hotmail.com',
  NULL,
  'PET; PEAD; PVC; PP; PS',
  'Aprovechamiento y recuperación de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio de recicladores y fuentes históricas consultadas para ReCicla',
  '2026-09-26',
  'La relación con materiales corresponde a evidencia histórica y no garantiza aceptación actual.'
),

(
  'R03',
  'COOPRESER',
  'Cooperativa',
  'Bucaramanga',
  NULL,
  NULL,
  NULL,
  NULL,
  'PET; PEAD; PEBD; PP; PS; Otros',
  'Aprovechamiento y recuperación de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'PGIRS Bucaramanga y fuentes históricas consultadas para ReCicla',
  '2026-09-26',
  'Información de materiales basada en registros históricos; debe verificarse la aceptación actual.'
),

(
  'R04',
  'RECICLEMOS',
  'Asociación',
  'Bucaramanga',
  NULL,
  '3125299388',
  'bucaramangareciclemos@gmail.com',
  NULL,
  'PET; PEAD; PEBD; PP',
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio de recicladores; PGIRS Bucaramanga',
  '2026-09-26',
  'Los materiales registrados corresponden a evidencia documental disponible.'
),

(
  'R05',
  'COOPSEREC',
  'Cooperativa',
  'Bucaramanga',
  'Cra 9 No. 36N-30, Bodega 2, barrio Café Madrid',
  '3227724885',
  'gerenciacoopserec@gmail.com',
  NULL,
  'PET; PEAD; PEBD; PP',
  'Aprovechamiento de materiales reciclables',
  'Lunes a viernes 06:00-14:00; sábado 06:00-13:00',
  NULL,
  NULL,
  'CDMB; directorio de recicladores consultado para ReCicla',
  '2026-09-26',
  'La terminología de materiales puede variar entre las fuentes consultadas.'
),

(
  'R06',
  'REUSO',
  'Fundación',
  'Bucaramanga',
  NULL,
  '3167661841',
  'reusofundacion@gmail.com',
  NULL,
  'PET; PEAD; PEBD',
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'PGIRS Bucaramanga; directorios consultados para ReCicla',
  '2026-09-26',
  'La relación de materiales se basa en evidencia documental histórica.'
),

(
  'R07',
  'ASOBIORED',
  'Organización',
  'Bucaramanga',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal de recicladores formalizados 2026',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
),

(
  'R08',
  'Asociación Laura Sofía',
  'Asociación',
  'Bucaramanga',
  'Calle 7 No. 13-23',
  '3185235176; 3222177226',
  'asociacionlaurasofia@gmail.com',
  NULL,
  'PET; PP',
  'Aprovechamiento de materiales reciclables',
  'Lunes a viernes 07:00-18:00; sábado 07:00-13:00',
  NULL,
  NULL,
  'Directorio y fuentes documentales consultadas para ReCicla',
  '2026-09-26',
  'Se encontró evidencia documental para PET y PP.'
),

(
  'R09',
  'ASOREMUSAN',
  'Asociación',
  'Bucaramanga',
  NULL,
  '3001117121',
  'asoremusan@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal de recicladores formalizados 2026',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
),

(
  'R10',
  'ASOREPLA',
  'Asociación',
  'Bucaramanga',
  NULL,
  '3028625664',
  'asoamigosdelplaneta@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal de recicladores formalizados 2026',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
),

(
  'R11',
  'CIRCULAR COLOMBIA',
  'Empresa/Organización',
  'Bucaramanga',
  NULL,
  '3246854422',
  'circularcolombiasas@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal de recicladores formalizados 2026',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
),

(
  'R12',
  'Colombiana de Aseo y Aprovechamiento',
  'Empresa',
  'Bucaramanga',
  NULL,
  '3167882729',
  'colombianadeaseoyesp@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal y fuentes recopiladas para ReCicla',
  '2026-09-26',
  'Datos de contacto sujetos a verificación; materiales específicos pendientes de verificación.'
),

(
  'R13',
  'ECORECICLA S.A.S.',
  'Empresa',
  'Bucaramanga',
  'Carrera 15 No. 23-36',
  '3214764260; 6076424016',
  'ecoreciclas2017@gmail.com',
  NULL,
  'PET; PEAD; PVC; PEBD; PP; PS; Otros',
  'Aprovechamiento y recuperación de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio histórico y fuentes recopiladas para ReCicla',
  '2026-09-26',
  'Los materiales indicados provienen de evidencia histórica y no garantizan aceptación actual.'
),

(
  'R14',
  'Fundación 4R',
  'Fundación',
  'Bucaramanga',
  'Calle 48 No. 28-40',
  '3187890637; 3113013530',
  'fundacion4r@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  'Lunes a viernes 08:00-18:00; sábado 08:00-12:00',
  NULL,
  NULL,
  'Directorio municipal y fuentes recopiladas para ReCicla',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
),

(
  'R15',
  'RECICLÍN / Súper Héroe Reciclín',
  'Organización',
  'Bucaramanga',
  NULL,
  '3153296499',
  'reciclincol@gmail.com',
  NULL,
  NULL,
  'Aprovechamiento de materiales reciclables',
  NULL,
  NULL,
  NULL,
  'Directorio municipal y fuentes recopiladas para ReCicla',
  '2026-09-26',
  'Materiales específicos pendientes de verificación.'
);

-- =========================================================
-- COMPATIBILIDAD RECICLADORES × PLÁSTICOS
-- 15 recicladores × 7 plásticos = 105 registros
-- =========================================================

INSERT INTO compatibilidad (
    id,
    reciclador_id,
    plastico_id,
    compatibilidad,
    tipo_evidencia,
    evidencia,
    fuente,
    fecha_fuente,
    fecha_verificacion,
    observaciones
)
SELECT
    r.id || '-' || LPAD(p.codigo_resina::text, 2, '0') AS id,
    r.id AS reciclador_id,
    p.id AS plastico_id,

    CASE
        -- Replasander: 7
        WHEN r.id = 'R01' AND p.codigo_resina IN (1,2,3,4,5,6,7)
            THEN 'confirmed_historical'

        -- Bello Renacer: PET, PEAD, PVC, PP, PS
        WHEN r.id = 'R02' AND p.codigo_resina IN (1,2,3,5,6)
            THEN 'confirmed_historical'

        -- COOPRESER: PET, PEAD, PEBD, PP, PS, Otros
        WHEN r.id = 'R03' AND p.codigo_resina IN (1,2,4,5,6,7)
            THEN 'confirmed_historical'

        -- RECICLEMOS: PET, PEAD, PEBD, PP
        WHEN r.id = 'R04' AND p.codigo_resina IN (1,2,4,5)
            THEN 'confirmed_historical'

        -- COOPSEREC: PET, PEAD, PEBD, PP
        WHEN r.id = 'R05' AND p.codigo_resina IN (1,2,4,5)
            THEN 'confirmed_historical'

        -- REUSO: PET, PEAD, PEBD
        WHEN r.id = 'R06' AND p.codigo_resina IN (1,2,4)
            THEN 'confirmed_historical'

        -- Asociación Laura Sofía: PET, PP
        WHEN r.id = 'R08' AND p.codigo_resina IN (1,5)
            THEN 'confirmed_historical'

        -- ECORECICLA: 7
        WHEN r.id = 'R13' AND p.codigo_resina IN (1,2,3,4,5,6,7)
            THEN 'confirmed_historical'

        ELSE 'pending_verification'
    END AS compatibilidad,

    CASE
        WHEN
            (r.id = 'R01' AND p.codigo_resina IN (1,2,3,4,5,6,7))
            OR (r.id = 'R02' AND p.codigo_resina IN (1,2,3,5,6))
            OR (r.id = 'R03' AND p.codigo_resina IN (1,2,4,5,6,7))
            OR (r.id = 'R04' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R05' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R06' AND p.codigo_resina IN (1,2,4))
            OR (r.id = 'R08' AND p.codigo_resina IN (1,5))
            OR (r.id = 'R13' AND p.codigo_resina IN (1,2,3,4,5,6,7))
        THEN 'Evidencia documental histórica'
        ELSE 'Pendiente de verificación'
    END AS tipo_evidencia,

    CASE
        WHEN
            (r.id = 'R01' AND p.codigo_resina IN (1,2,3,4,5,6,7))
            OR (r.id = 'R02' AND p.codigo_resina IN (1,2,3,5,6))
            OR (r.id = 'R03' AND p.codigo_resina IN (1,2,4,5,6,7))
            OR (r.id = 'R04' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R05' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R06' AND p.codigo_resina IN (1,2,4))
            OR (r.id = 'R08' AND p.codigo_resina IN (1,5))
            OR (r.id = 'R13' AND p.codigo_resina IN (1,2,3,4,5,6,7))
        THEN 'Existe evidencia documental previa que relaciona al reciclador con este material.'
        ELSE 'No se encontró evidencia suficiente para confirmar específicamente este material.'
    END AS evidencia,

    CASE
        WHEN r.id IN ('R02','R03','R04','R06')
            THEN 'PGIRS Bucaramanga y fuentes históricas recopiladas para ReCicla'
        WHEN r.id = 'R01'
            THEN 'Directorios históricos y fuentes recopiladas para ReCicla'
        WHEN r.id = 'R05'
            THEN 'CDMB y fuentes recopiladas para ReCicla'
        WHEN r.id = 'R08'
            THEN 'Fuentes documentales recopiladas para ReCicla'
        WHEN r.id = 'R13'
            THEN 'Directorio histórico y fuentes recopiladas para ReCicla'
        ELSE
            'Directorio municipal y fuentes recopiladas para ReCicla'
    END AS fuente,

    NULL AS fecha_fuente,

    '2026-09-26'::date AS fecha_verificacion,

    CASE
        WHEN
            (r.id = 'R01' AND p.codigo_resina IN (1,2,3,4,5,6,7))
            OR (r.id = 'R02' AND p.codigo_resina IN (1,2,3,5,6))
            OR (r.id = 'R03' AND p.codigo_resina IN (1,2,4,5,6,7))
            OR (r.id = 'R04' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R05' AND p.codigo_resina IN (1,2,4,5))
            OR (r.id = 'R06' AND p.codigo_resina IN (1,2,4))
            OR (r.id = 'R08' AND p.codigo_resina IN (1,5))
            OR (r.id = 'R13' AND p.codigo_resina IN (1,2,3,4,5,6,7))
        THEN 'La evidencia histórica no garantiza que el reciclador acepte actualmente el material.'
        ELSE 'Debe verificarse directamente con el reciclador antes de recomendar la entrega.'
    END AS observaciones

FROM recicladores r
CROSS JOIN plasticos p
ORDER BY r.id, p.codigo_resina;