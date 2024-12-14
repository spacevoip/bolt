export interface PixResponse {
  message: string;
  status?: string;
  error?: string;
  txid?: string;
}

export interface PixTransaction {
  valor: number;
  method: string;
  status: string;
  account: string;
  chave_pix: string;
  txid: string;
  data: string;
}