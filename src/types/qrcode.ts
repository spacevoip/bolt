export interface QRCodeRequest {
  code: string;
  valor: number;
  description?: string;
}

export interface QRCodeResponse {
  QRCodeLink: string;
  QRCodeText: string;
  Status: string;
  code: string;
  method: string;
  txid: string;
}

export interface QRCodePaymentStatus {
  status: 'pending' | 'paid' | 'cancelled';
  amount: number;
  found: boolean;
}