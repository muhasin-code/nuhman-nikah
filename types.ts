
export interface RSVPData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  attending: boolean;
  message: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
