import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { FetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";

export default function App() {
    const [page, setPage] = useState(1);

    const { data } = useQuery({
        queryKey: ["notes", page],
        queryFn: () => FetchNotes(page),
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {/* Компонент SearchBox */}
                {data && (
                    <Pagination
                        pageCount={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage} />
                )}
                {/* Кнопка створення нотатки */}
            </header>
            <NoteList />
        </div>
    );
}