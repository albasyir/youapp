import { DetailedHTMLProps, LabelHTMLAttributes } from "react"

type UploadFieldProps = Pick<
  DetailedHTMLProps<LabelHTMLAttributes<any>, any>, 'onChange'  
>

export default function UploadField(props: UploadFieldProps) {
  return (
    <label
      htmlFor="file-input"
      className="flex cursor-pointer rounded-lg hover:bg-[rgba(255,255,255,0.2)]"
    >
      <div className="rounded-[17px] w-[57px] h-[57px] bg-white/[0.08] flex justify-center items-center">
        <div className="text-3xl text-center">+</div>
      </div>
      <div className="flex text-xs items-center ml-3">
        Add Image
      </div>

      <input type="file" hidden id="file-input" onChange={props.onChange || (() => {})} />
    </label>
  )
}