// api/analizar.ts — responde en la ruta /api/analizar
import { consultarIA, formatearIndicadores } from './_adaptadores.js';

// Instrucciones para el modelo (adaptadas al proyecto CampiLeche)
const INSTRUCCIONES = `Eres un analista de datos que apoya a usuarios sin formación técnica en el panel de control de CampiLeche (catálogo y gestión de lácteos y derivados).
Recibirás los indicadores de un dashboard entre las etiquetas <datos></datos>.
Responde en español y en máximo 4 frases:
1) resume el estado general, 2) señala el indicador que requiere más atención
y 3) sugiere una acción concreta.
Usa SOLO la información de <datos>; si falta algo, dilo con claridad.`;

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Método no permitido' }, { status: 405 });
    }

    // 1. Leer y validar lo que envía el navegador
    let indicadores: any;
    try {
      const body = await request.json();
      indicadores = body?.indicadores;
    } catch {
      return Response.json({ error: 'El cuerpo debe ser JSON' }, { status: 400 });
    }

    const valido =
      Array.isArray(indicadores) && indicadores.length > 0 && indicadores.length <= 30;
    if (!valido) {
      return Response.json({ error: 'Envía entre 1 y 30 indicadores' }, { status: 400 });
    }

    // 2. Consultar al proveedor y devolver siempre el mismo formato: { texto }
    try {
      const datos = formatearIndicadores(indicadores);
      const texto = await consultarIA(INSTRUCCIONES, [
        { rol: 'user', contenido: `<datos>\n${datos}\n</datos>` },
      ]);
      return Response.json({ texto });
    } catch (error) {
      // El detalle se ve en la terminal o en los logs de Vercel, NO en el navegador
      console.error('Error al consultar IA:', error instanceof Error ? error.message : error);
      return Response.json({
        error: error instanceof Error ? error.message : 'El servicio de IA no respondió'
      }, { status: 502 });
    }
  },
};
