import type { Transaction } from '../types/transaction';

interface SentTransactionData {
  txid: string;
  valor: number;
  data: string;
  name: string;
  account: string;
  chave_pix: string;
  status: string;
  cpf_cnpj: string;
  tax: number;
}

interface ReceivedTransactionData {
  txid: string;
  valor: number;
  horario: string;
  name: string;
  account: string;
  receipt_pix_key: string;
  status: string;
  documento: string;
  tax: number;
}

export function mapSentTransaction(t: SentTransactionData): Transaction {
  return {
    id: t.txid || crypto.randomUUID(),
    type: 'pix_sent',
    amount: Number(t.valor) || 0,
    date: t.data || new Date().toISOString(),
    description: 'PIX Transfer',
    fromUser: t.account,
    toUser: t.name || 'Unknown',
    fromAccount: t.account,
    toAccount: t.chave_pix || '',
    status: t.status || 'pending',
    document: t.cpf_cnpj || '',
    tax: Number(t.tax) || 0
  };
}

export function mapReceivedTransaction(t: ReceivedTransactionData): Transaction {
  return {
    id: t.txid || crypto.randomUUID(),
    type: 'pix_received',
    amount: Number(t.valor) || 0,
    date: t.horario || new Date().toISOString(),
    description: 'PIX Received',
    fromUser: t.name || 'Unknown',
    toUser: t.account,
    fromAccount: t.receipt_pix_key || '',
    toAccount: t.account,
    status: t.status || 'pending',
    document: t.documento || '',
    tax: Number(t.tax) || 0
  };
}