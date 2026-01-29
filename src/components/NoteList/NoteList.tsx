import css from "./NoteList.module.css";
import { useQuery } from "@tanstack/react-query";
import { FetchNotes } from "../../services/noteService";

export default function NoteList() {
    const { data } = useQuery({
        queryKey: ["notes", 1],
        queryFn: () => FetchNotes(1),
    });

    if (!data || data.notes.length === 0) {
        return null;
    }

    return (
        <ul className={css.list}>
            {data.notes.map(note => (
                <li className={css.listItem}>
                <h2 className={css.title}>Note title</h2>
                <p className={css.content}>Note content</p>
                <div className={css.footer}>
                    <span className={css.tag}>Note tag</span>
                    <button className={css.button}>Delete</button>
                </div>
            </li>))}
        </ul>
    );
}