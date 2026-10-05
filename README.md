# ReCicla — prototipo inicial

Prototipo visual de la plataforma académica ReCicla: “Dale un destino, no lo deseches”.

## Requisitos

- Node.js 20.9 o superior.
- npm.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Estructura

- `app/` — páginas y estilos de Next.js.
- `data/plasticos.ts` — datos provisionales de los 7 tipos de plástico.
- `public/images/` — aquí colocaremos imágenes con licencia adecuada.
- `app/plastico/[slug]/` — fichas individuales de cada plástico.

## Importante

Los datos incluidos son un prototipo inicial para visualizar la plataforma. No sustituyen el dataset definitivo que estamos construyendo y verificando con fuentes.

Siguiente etapa: dataset de recicladores de Bucaramanga, base de datos, filtros de compatibilidad e integración del chatbot con Groq.
