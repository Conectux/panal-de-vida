// api/firma.js — Vercel Serverless Function
// Genera la firma de integridad para Wompi de forma segura
// 
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ve a tu dashboard de Vercel → Settings → Environment Variables
// 2. Agrega: WOMPI_PRIVATE_KEY = tu llave privada (prv_test_... o prv_prod_...)
// 3. Haz deploy y llama esta función desde el frontend antes de abrir el widget

import crypto from 'crypto';

export default function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reference, amountInCents, currency } = req.body;

  // Validar campos requeridos
  if (!reference || !amountInCents || !currency) {
    return res.status(400).json({ error: 'Faltan campos: reference, amountInCents, currency' });
  }

  // Llave privada desde variables de entorno (NUNCA en el código)
  const privateKey = process.env.WOMPI_PRIVATE_KEY;
  if (!privateKey) {
    return res.status(500).json({ error: 'WOMPI_PRIVATE_KEY no configurada en Vercel' });
  }

  // Concatenar según spec de Wompi: reference + amountInCents + currency + privateKey
  const cadena = `${reference}${amountInCents}${currency}${privateKey}`;

  // Generar SHA256
  const firma = crypto.createHash('sha256').update(cadena).digest('hex');

  return res.status(200).json({ 
    integrity: firma,
    reference,
    amountInCents,
    currency
  });
}
