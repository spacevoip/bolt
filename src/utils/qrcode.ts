export function validateQRCodeData(data: any): boolean {
  return !!(
    data &&
    typeof data === 'object' &&
    data.QRCodeLink &&
    data.QRCodeText &&
    data.txid
  );
}

export function formatQRCodeAmount(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}