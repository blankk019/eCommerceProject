export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressResponse {
  results: number;
  status: string;
  data: Address[];
}

export interface SingleAddress {
  details: string;
  phone: string;
  city: string;
}
