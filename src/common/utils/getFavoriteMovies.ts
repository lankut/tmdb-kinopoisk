export type FavoriteMovie = {
    movieId: number
    title: string
    posterUrl: string
    voteAverage: number
}

export const getFavoriteMovies = (): FavoriteMovie[] => {
    const favorites: FavoriteMovie[] = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('movieId_')) {
            const item = localStorage.getItem(key)
            if (item) {
                try {
                    favorites.push(JSON.parse(item))
                } catch (e) {
                    console.error('Error parsing favorite:', e)
                }
            }
        }
    }
    return favorites
}