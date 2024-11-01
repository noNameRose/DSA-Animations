import Input from "./Input.jsx";

export default function Menu({onStart}) {
  return (
    <section className="fixed bottom-0 flex flex-col">
      <Input name="Insert(i)" needValue={true} needIndex={true} onStart={onStart}/>
      <Input name="Remove(i)" needValue={false} needIndex={true} onStart={onStart}/>
      <Input name="Search" needValue={true} needIndex={false} onStart={onStart}/>
    </section>
  )
}
