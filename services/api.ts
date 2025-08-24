export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.MOVIE_API_KEY,
    HEADERS: {
        accept: 'application/json',
        Authorization: `Bearer ${ process.env.MOVIE_API_KEY }`
    }
}

export const fatchMovies = async ({ query }: { query: string }) => {
    const endpoint = query ? 
        `/search/movie?query=${ encodeURIComponent(query) }` :
        '/discover/movie?sort_by=popularity.desc';
    const response = await fetch(`${ TMDB_CONFIG.BASE_URL }${ endpoint }`, {
        method: 'GET',
        headers: TMDB_CONFIG.HEADERS,
    })

    if(!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fatch movies', response.statusText);
    }

    const data = await response.json();
    return data.results;
}
