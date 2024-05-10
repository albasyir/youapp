export default function BackButton() {
  return <a className="cursor-pointer" onClick={() => { history.go(-1) }}>&lt; back</a>
}