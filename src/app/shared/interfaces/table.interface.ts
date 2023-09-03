export interface collection {
  account_id: string;
  report_date: Date;
  total_collected: number;
  total_gross_fee: number;
  total_net_amount: number;
  data: Datum[];
}

export interface Datum {
  informed_date: Date;
  request_id: number;
  external_reference: string;
  payer_name: string;
  description: string;
  payment_date: Date;
  channel: string;
  amount_paid: number;
  net_fee: number;
  iva_fee: number;
  net_amount: number;
  available_at: Date;
}
