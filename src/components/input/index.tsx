import { InputHTMLAttributes } from "react";

type InputPropsType = {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputPropsType) {
    const { value, setValue, placeholder, type = "text" } = props;

    return (
        <input
            className="py-2 px-4 rounded-full outline-none text-sm w-64 mb-4 border"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            type={type}
        />
    );
}
