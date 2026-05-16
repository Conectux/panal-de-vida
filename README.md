# 🍯 Panal de Vida — Tienda Online

Tienda completa con carrito, página de producto y pasarela Wompi lista para Vercel.

## Estructura
```
panal-de-vida/
├── index.html          ← Tienda completa (una sola página)
├── api/
│   └── firma.js        ← Vercel Function: genera firma de integridad Wompi
└── images/
    └── imgs.js         ← Fotos del producto en base64 (generado)
```

## Deploy en Vercel

1. Sube la carpeta a un repositorio GitHub
2. Importa el repo en vercel.com → "New Project"
3. En **Settings → Environment Variables** agrega:
   ```
   WOMPI_PRIVATE_KEY = prv_test_XXXXXXXXXXXXXX
   ```
4. Haz deploy ✅

## Conectar Wompi

En `index.html`, busca la función `openWompi()` y actualiza:

```js
// Antes de abrir el widget, llama a tu Vercel Function:
const res = await fetch('/api/firma', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ reference: ref, amountInCents: total * 100, currency: 'COP' })
});
const { integrity } = await res.json();

// Luego usa la firma:
script.setAttribute('data-public-key', 'pub_test_TU_LLAVE_PUBLICA');
script.setAttribute('data-signature:integrity', integrity);
```

## Llaves Wompi

- **Pruebas:** `pub_test_...` y `prv_test_...` desde sandbox.wompi.co
- **Producción:** `pub_prod_...` y `prv_prod_...` desde comercios.wompi.co

## WhatsApp

El número configurado es **573163238623**. Para cambiarlo, busca y reemplaza
todas las ocurrencias en `index.html`.
