import { City } from '../types/weather'

interface SidebarProps {
  cities: City[];
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

const Sidebar = ({ cities, selectedCity, onSelectCity }: SidebarProps) => {
  return (
    <aside className="w-[30%] bg-white dark:bg-zinc-800 p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-3xl">ac_unit</span>
        <h1 className="text-2xl font-bold">WeatherWise</h1>
      </div>
      
      <div className="flex flex-col gap-3">
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelectCity(city)}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
              selectedCity.id === city.id
                ? 'bg-primary/20 dark:bg-primary/30'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <div className="flex flex-col">
              <p className="text-lg font-bold">{city.name}</p>
              <p className="text-sm">{city.country}</p>
            </div>
            <p className="text-3xl font-bold">{city.temp}°</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-auto flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">
        <span className="material-symbols-outlined">add</span>
        Add City
      </button>
    </aside>
  )
}

export default Sidebar