export interface IShippingAddress {
  name: string;
  lastName: string;
  address: string;
  address2?: string | undefined;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
}
