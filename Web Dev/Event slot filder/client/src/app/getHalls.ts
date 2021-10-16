export interface HallOutput {
  UID: string;
  Name: string;
  Capacity?: string;
  Place: string;
  booking_available: boolean;
}
export interface GetHalls {
  error: string | null;
  halls: HallOutput[] | [];
  status: string;
}
