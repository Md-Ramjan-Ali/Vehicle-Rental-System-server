export type VehicleType = "car" | "bike" | "van" | "SUV";
export type VehicleStatus = "available" | "booked";

export interface Vehicle {
  id?: number;
  vehicle_name: string;
  type: VehicleType;
  registration_number: string;
  daily_rent_price: number;
  availability_status: VehicleStatus;
  created_at?: Date;
}
