import CityCard from "./CityCard";

type ForecastDay = { day: string; hi: number; lo: number; icon: string; color?: string };
type City = {
  id: string;
  name: string;
  country: string;
  temp: number;
  description?: string;
  forecast?: ForecastDay[];
};

export default function CityList({
  cities,
  selectedId,
  onSelect,
  onAdd,
}: {
  cities: City[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} selected={city.id === selectedId} onClick={() => onSelect(city.id)} />
        ))}
      </div>

      <button onClick={onAdd} className="w-full mt-auto flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">
        <span className="material-symbols-outlined">add</span>
        Add City
      </button>
    </>
  );
}
