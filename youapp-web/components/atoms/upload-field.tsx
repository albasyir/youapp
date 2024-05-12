import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type UploadFieldProps = Pick<
  DetailedHTMLProps<InputHTMLAttributes<any>, any>, 'onChange' | 'accept'
  > & {
    file?: File,
}

export default function UploadField(props: UploadFieldProps) {
  return (
    <label
      htmlFor="file-input"
      className="flex cursor-pointer rounded-lg hover:bg-[rgba(255,255,255,0.2)]"
    >
      <div className="rounded-[17px] w-[57px] h-[57px] bg-white/[0.08] flex justify-center items-center">
        <div className="text-3xl text-center">{props.file ? "OK" : `+`}</div>
      </div>
      <div className="flex text-xs items-center ml-3">
        {props.file ? props.file.name : `Add Image`}
      </div>

      <input
        accept={props.accept}
        type="file"
        hidden
        id="file-input"
        onChange={props.onChange || (() => {})}
      />
    </label>
  );
}