import { MutableRefObject } from "react";

type TextInputProps = {
  label: string;
  inputRef: MutableRefObject<string>
}

export default function TextInput({ label, inputRef }: TextInputProps) {
  return (
    <>
      <p className='text-slate-800'>{label}</p>
      <input
        onChange={(event) => inputRef.current = event.target.value}
        className="border rounded-md p-2 text-slate-800 focus:outline-none focus:shadow-md focus:shadow-sky-600 focus:border-sky-600"
        type="text"
      />
    </>
  );
}