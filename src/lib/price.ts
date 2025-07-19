/**
 * Convierte bolivianos a centavos para almacenar
 * @param bolivianos - Cantidad en bolivianos (por ejemplo, 25.50)
 * @returns Cantidad en centavos (por ejemplo, 2550)
 */
export const bolivianosToCents = (bolivianos: number): number => {
  return Math.round(bolivianos * 100);
};

/**
 * Convierte centavos a bolivianos para mostrar
 * @param cents - Cantidad en centavos (por ejemplo, 2550)
 * @returns Cantidad en bolivianos (por ejemplo, 25.50)
 */
export const centsToBolivianos = (cents: number): number => {
  return cents / 100;
};

/**
 * Formatea centavos como string de moneda boliviana
 * @param cents - Cantidad en centavos
 * @returns String formateada (por ejemplo, "25,50 Bs")
 */
export const formatPrice = (cents: number): string => {
  const bolivianos = centsToBolivianos(cents);
  return `${bolivianos.toFixed(2).replace(".", ",")} Bs`;
};

/**
 * Analiza la entrada del usuario (bolivianos) a centavos
 * Maneja tanto la coma como el punto como separador decimal
 * @param input - String de entrada del usuario (por ejemplo, "25,50" o "25.50")
 * @returns Cantidad en centavos o null si es inválido
 */
export const parsePrice = (input: string): number | null => {
  const normalized = input.replace(",", ".");
  const parsed = parseFloat(normalized);

  if (isNaN(parsed) || parsed < 0) {
    return null;
  }

  return bolivianosToCents(parsed);
};

/**
 * Calcula el precio total para varios items
 * @param items - Array de {priceCents: number, quantity: number}
 * @returns Total en centavos
 */
export const calculateTotal = (
  items: Array<{ basePriceCents: number; stock: number }>
): number => {
  return items.reduce(
    (total, item) => total + item.basePriceCents * item.stock,
    0
  );
};
