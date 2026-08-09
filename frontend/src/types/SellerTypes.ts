export interface PickupAddress {
  id?: number;
  name?: string;
  mobile?: string;
  pincode?: string;
  address?: string;
  locality?: string;
  city?: string;
  state?: string;
}

export interface BankDetails {
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
}

export interface BusinessDetails {
  businessName?: string;
  businessEmail?: string;
  businessMobile?: string;
  businessAddress?: string;
  logo?: string;
  banner?: string;
}

export interface Seller {
  id?: number;
  mobile?: string;
  GSTIN?: string;
  email?: string;
  sellerName?: string;

  pickupAddress?: PickupAddress;
  bankDetails?: BankDetails;
  businessDetails?: BusinessDetails;

  accountStatus?: string;
  emailVerified?: boolean;
}

export interface SellerReport {
  id: number;
  seller: Seller;
  totalEarnings: number;
  totalSales: number;
  totalRefunds: number;
  totalTax: number;
  netEarnings: number;
  totalOrders: number;
  canceledOrders: number;
  totalTransactions: number;
}