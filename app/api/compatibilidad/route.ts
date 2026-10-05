 import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.reciclador_id,
        r.nombre AS reciclador,
        c.plastico_id,
        p.codigo_resina,
        p.sigla,
        p.nombre AS material,
        c.compatibilidad,
        c.tipo_evidencia,
        c.evidencia,
        c.fuente,
        c.fecha_fuente,
        c.fecha_verificacion,
        c.observaciones
      FROM compatibilidad c
      INNER JOIN recicladores r
        ON c.reciclador_id = r.id
      INNER JOIN plasticos p
        ON c.plastico_id = p.id
      ORDER BY r.id, p.codigo_resina;
    `);

    return Response.json({
      ok: true,
      total: result.rowCount,
      compatibilidades: result.rows,
    });
  } catch (error) {
    console.error("Error al consultar compatibilidad:", error);

    return Response.json(
      {
        ok: false,
        mensaje: "No se pudo consultar la compatibilidad",
      },
      { status: 500 }
    );
  }
}