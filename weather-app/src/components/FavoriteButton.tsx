import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleFavorite } from '../store/favoritesSlice'

interface FavoriteButtonProps {
  cityId: number
  size?: 'small' | 'medium' | 'large'
}

const FavoriteButton = ({ cityId, size = 'medium' }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state) => state.favorites.cityIds)
  const isFavorite = favorites.includes(cityId)

  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    dispatch(toggleFavorite(cityId))
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-all hover:scale-110 ${
        isFavorite ? 'text-yellow-400' : 'text-zinc-300 dark:text-zinc-600 hover:text-yellow-400'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span 
        className={`material-symbols-outlined ${sizeClasses[size]}`}
        style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
      >
        star
      </span>
    </button>
  )
}

export default FavoriteButton