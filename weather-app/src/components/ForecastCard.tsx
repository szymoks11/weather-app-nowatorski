import { ForecastDay } from '../types/weather'

interface ForecastCardProps {
  forecast: ForecastDay;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2">
      <p className="font-bold text-lg">{forecast.day}</p>
      <span className={`material-symbols-outlined text-4xl ${forecast.color}`}>
        {forecast.icon}
      </span>
      <p>{forecast.high}°/{forecast.low}°</p>
    </div>
  )
}

export default ForecastCard