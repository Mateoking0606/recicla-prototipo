 import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, NOW() AS fecha"
    );

    return Response.json({
      ok: true,
      mensaje: "ReCicla conectado correctamente a PostgreSQL",
      database: result.rows[0].database,
      fecha: result.rows[0].fecha,
    });
  } catch (error) {
    console.error("Error de conexión:", error);

    return Response.json(
      {
        ok: false,
        mensaje: "No se pudo conectar a PostgreSQL",
      },
      { status: 500 }
    );
  }
}