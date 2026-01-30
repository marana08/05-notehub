import axios, { type AxiosResponse } from "axios";
import type { NewNote, Note } from "../types/note";

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
});

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

// Отримання списка(пагінація + пошук)

export async function FetchNotes(
    page: number,
    search?: string
): Promise<FetchNotesResponse> {
    const response: AxiosResponse<FetchNotesResponse> = await api.get(
        "/notes",
        {
            params: {
                page,
                perPage: 12,
                search,
            },
        }
    );

    return response.data;
}

// створення нотатки

export async function createNotes(
    note: NewNote
): Promise<Note> {
    const response: AxiosResponse<Note> = await api.post(
        "/notes",
        note
    );
    
    return response.data;
}

// видалення нотатки

export async function deleteNote(
    id: string
): Promise<Note> {
    const response: AxiosResponse<Note> = await api.delete(
        `/notes/${id}`
    );

    return response.data;
}