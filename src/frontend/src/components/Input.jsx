export default function Input({ props, fromParent }) {
  let { label, errorMsg, ...others } = props
  let { values, setValues } = fromParent
  let handleChangeInput = (e) => {
    setValues(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  return (
    <div className="flex">
      <label className="w-[100px]">{label}</label>
      <div className="flex flex-col">
        <input {...others} onChange={e => handleChangeInput(e)} value={values[props.name]} className=" px-1 py-1 border border-black outline-none text-lg peer" />
        <div className="text-red-500 hidden peer-invalid:block">{errorMsg}</div>
      </div>
    </div>
  )
}

