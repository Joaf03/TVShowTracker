export interface Show {
    id: number,
    title: string,
    description: string,
    genre: string,
    start_date: string,
    end_date: string | null,
    created_at: string,
    updated_at: string
}

export interface Actor {
    id: number,
    name: string,
    date_of_birth: string,
    nationality: string,
    created_at: string,
    updated_at: string
}

export interface Episode {
    id: number,
    show_id: number,
    title: string,
    season_number: number | null,
    episode_number: number,
    duration_minutes: number,
    air_date: string,
    created_at: string,
    updated_at: string
}

export interface User {
    id: number,
    email: string,
    password: string,
    created_at: string,
    updated_at: string
}