type ForecastDay = { day: string; hi: number; lo: number; icon: string; color?: string };
type City = {
  id: string;
  name: string;
  country?: string;
  temp: number;
  description?: string;
  forecast?: ForecastDay[];
  precipitation?: string;
  wind?: string;
  cloudCoverage?: string;
};

export default function WeatherDetails({ city }: { city: City }) {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-black tracking-tight">{city.name}</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">Monday, 10:00 AM</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex items-center justify-between mt-4">
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-8xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            partly_cloudy_day
          </span>
          <div>
            <p className="text-7xl font-bold">{city.temp}°C</p>
            <p className="text-2xl text-zinc-500 dark:text-zinc-400">{city.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {(city.forecast ?? []).map((f) => (
            <div key={f.day} className="bg-white dark:bg-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2">
              <p className="font-bold text-lg">{f.day}</p>
              <span className={`material-symbols-outlined text-4xl ${f.color ?? ""}`}>{f.icon}</span>
              <p>
                {f.hi}°/{f.lo}°
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">Detailed Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
            <p className="text-zinc-500 dark:text-zinc-400">Precipitation</p>
            <div className="flex items-baseline gap-2">
              <span className="material-symbols-outlined text-primary">water_drop</span>
              <p className="text-2xl font-bold">{city.precipitation}</p>
            </div>
            <p className="text-sm">Type: Rain, Amount: 0.2mm</p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
            <p className="text-zinc-500 dark:text-zinc-400">Wind</p>
            <div className="flex items-baseline gap-2">
              <span className="material-symbols-outlined text-primary">air</span>
              <p className="text-2xl font-bold">{city.wind}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary">north_east</span>
              <p className="text-sm">Direction: NE</p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col gap-2">
            <p className="text-zinc-500 dark:text-zinc-400">Cloud Coverage</p>
            <div className="flex items-baseline gap-2">
              <span className="material-symbols-outlined text-primary">cloud</span>
              <p className="text-2xl font-bold">{city.cloudCoverage}</p>
            </div>
            <p className="text-sm">High cloud density</p>
          </div>
        </div>
      </div>
    </div>
  );
}