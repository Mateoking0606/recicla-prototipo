 import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
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
      FROM plasticos
      ORDER BY codigo_resina ASC
    `);

    return Response.json({
      ok: true,
      total: result.rowCount,
      plasticos: result.rows,
    });
  } catch (error) {
    console.error("Error al consultar plásticos:", error);

    return Response.json(
      {
        ok: false,
        mensaje: "No se pudieron consultar los plásticos",
      },
      { status: 500 }
    );
  }
}