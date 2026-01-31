import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }: { message: string }) {
    return <p className={css.error}>{message}</p>;
}
