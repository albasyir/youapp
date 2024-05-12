import { useEffect, useState } from "react";
import InputField from "./molecules/input-field";
import UploadField from "./atoms/upload-field";
import { PatchProfileRequestDto, PatchProfileRequestDtoGenderEnum } from "sdk/youapp-service";
import dayjs, { Dayjs } from "dayjs";

type UserEditFormProps = {
  profile?: PatchProfileRequestDto;
  onChange?: (data: PatchProfileRequestDto) => void;
};

export default function UserEditForm(props: UserEditFormProps) {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [image, setImage] = useState<string | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<PatchProfileRequestDtoGenderEnum | undefined>(undefined);
  const [birthday, setBirthday] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const dataChanged = (key: keyof PatchProfileRequestDto, value: any) => {
    const data: PatchProfileRequestDto = {
      image,
      displayName,
      gender,
      birthday,
      height,
      weight
    }

    data[key] = value;

    props.onChange && props.onChange(data);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) {
      setImage(undefined);
      setImageFile(undefined);
    }

    const base64image = Buffer.from(await file.arrayBuffer()).toString("base64");

    setImageFile(file);
    setImage(base64image);
    dataChanged('image', base64image);
  }

  const handleInputChange = (key: keyof PatchProfileRequestDto, setter: React.Dispatch<React.SetStateAction<any>>) => (value: any) => {
    dataChanged(key, value);
    setter(value);
  };
  
  useEffect(() => {
    setDisplayName(props.profile?.displayName);
    setGender(props.profile?.gender);
    setBirthday(props.profile?.birthday);
    setHeight(props.profile?.height);
    setWeight(props.profile?.weight);
  }, [props.profile, displayName, gender, birthday, height, weight]);

  return (
    <form className="space-y-4">
      <UploadField file={imageFile} onChange={handleUploadFile} accept="image/*" />

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
          value={displayName}
          onChange={handleInputChange('displayName', setDisplayName)}
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
          value={gender}
          onChange={handleInputChange('gender',setGender)}
        >
          <option value="">Select Gender</option>
          <option value={PatchProfileRequestDtoGenderEnum.Male}>Male</option>
          <option value={PatchProfileRequestDtoGenderEnum.Female}>Female</option>
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
          value={dayjs(birthday).format('YYYY-MM-DD')}
          onChange={handleInputChange('birthday',setBirthday)}
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
          value={height?.toString()}
          onChange={handleInputChange('height',setHeight)}
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
          value={weight?.toString()}
          onChange={handleInputChange('weight',setWeight)}
        />
      </div>
    </form>
  )
}