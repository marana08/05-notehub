import css from "./Loading.module.css";

export default function Loading({ message = "Loading..." }: { message?: string }) {
    return <p className={css.loading}>{message}</p>;
}
