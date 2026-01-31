import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { FetchNotes } from "../../services/noteService";
import css from "./App.module.css";

export default function App() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debouncedSearchChange = useDebouncedCallback(
        (value: string) => {
            setDebouncedSearch(value);
            setPage(1);
        },
        500
    );

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => FetchNotes(page, debouncedSearch),
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
        debouncedSearchChange(value);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />

                {data && data.totalPages > 1 && (
                    <Pagination
                        pageCount={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                )}

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note +
                </button>
            </header>

            {isLoading && <Loading message="Loading notes..." />}

            {isError && (
                <ErrorMessage message="Failed to load notes. Please try again." />
            )}

            {data && !isLoading && !isError && (
                <NoteList notes={data.notes} />
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}
