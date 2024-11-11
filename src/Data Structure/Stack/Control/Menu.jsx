import Input from "./Input.jsx"


export default function Menu({onStart, isAnimating}) {
  return (
    <section className="fixed bottom-0 flex flex-col gap-[1em]">
        <Input name="Push" needValue={true} butColor="#e6b8a2" onStart={onStart} isAnimating={isAnimating}/>
        <Input name="Pop" butColor="#e6b8a2" onStart={onStart} isAnimating={isAnimating}/>
    </section>
  )
}
