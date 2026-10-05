 import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
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
      FROM recicladores
      ORDER BY id;
    `);

    return Response.json({
      ok: true,
      total: result.rowCount,
      recicladores: result.rows,
    });
  } catch (error) {
    console.error("Error al consultar recicladores:", error);

    return Response.json(
      {
        ok: false,
        mensaje: "No se pudieron consultar los recicladores",
      },
      { status: 500 }
    );
  }
}