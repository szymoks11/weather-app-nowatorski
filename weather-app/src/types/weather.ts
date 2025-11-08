export interface City {
  id: number;
  name: string;
  country: string;
  temp?: number; 
}

export interface ForecastDay {
  day: string;
  date: string;
  icon: string;
  description: string;
  high: number;
  low: number;
  color?: string;
}

export interface DetailedInfo {
  precipitation: {
    percentage: number;
    type: string;
    amount: string;
  };
  wind: {
    speed: number;
    direction: string;
  };
  cloudCoverage: {
    percentage: number;
    description: string;
  };
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    description: string;
    icon: string;
    humidity: number;
    pressure: number;
  };
  forecast: ForecastDay[];
  details: {
    wind: {
      speed: number;
      direction: string;
    };
    clouds: number;
    visibility: number;
    humidity: number;
  };
} 