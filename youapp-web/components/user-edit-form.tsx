import { useState } from "react";
import InputField from "./molecules/input-field";
import UploadField from "./atoms/upload-field";

export default function UserEditForm() {
  const [photo, setPhoto] = useState('');

  const henldeUploadFile = (e) => {
    console.log(e.target.files[0])
  }

  return (
    <form className="space-y-4">
      <UploadField onChange={henldeUploadFile} />

      <div className="flex">
        <label htmlFor="displayName" className="text-sm font-medium text-gray-700 w-1/2">
          Display name
        </label>
        <InputField
          id="displayName"
          placeholder="Enter name"
          type="text"
          className="w-full"
          align="right"
        />
      </div>

      <div className="flex">
        <label htmlFor="gender" className="text-sm font-medium text-gray-700 w-1/2">
          Gender
        </label>
        <select
          id="gender"
          className="
            text-right 
            w-full 
            disabled:opacity-50
          focus:ring-indigo-500
          focus:border-indigo-500
            focus:z-10
            rounded-md
            text
            border
            placeholder-gray-500
            border-[#4C5559]
            bg-[#1A252A]
            py-2
          "
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex">
        <label htmlFor="birthday" className="text-sm font-medium text-gray-700 w-1/2">
          Birthday
        </label>
        <InputField
          id="birthday"
          type="date"
          className="w-full"
          align="right"
        />
      </div>

      <div className="flex">
        <label htmlFor="height" className="text-sm font-medium text-gray-700 w-1/2">
          Height
        </label>
        <InputField
          id="height"
          type="number"
          className="w-full"
          align="right"
        />
      </div>

      <div className="flex">
        <label htmlFor="weight" className="text-sm font-medium text-gray-700 w-1/2">
          Weight
        </label>
        <InputField
          id="weight"
          type="number"
          className="w-full"
          align="right"
        />
      </div>
    </form>

  )
}