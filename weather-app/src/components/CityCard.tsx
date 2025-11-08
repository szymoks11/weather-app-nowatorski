export default function CityCard({
  city,
  selected,
  onClick,
}: {
  city: { id: string; name: string; country: string; temp: number };
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${selected ? "bg-primary/20 dark:bg-primary/30" : "hover:bg-zinc-100 dark:hover:bg-zinc-700"}`}>
      <div className="flex flex-col">
        <p className="text-lg font-bold">{city.name}</p>
        <p className="text-sm">{city.country}</p>
      </div>
      <p className="text-3xl font-bold">{city.temp}°</p>
    </div>
  );
}
