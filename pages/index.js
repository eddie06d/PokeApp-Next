import AppLayout from "../components/AppLayout";
import Link from "next/link";

export default function Home() {
  return (
    <AppLayout title="Next PokeApp" bgColor="#f56e64">
      <div className="py-6 px-5 bg-white rounded-2xl flex flex-col items-center justify-center">
        <h1 className="font-mono font-black text-2xl">Next PokeApp</h1>
        <img src="main.jpg" alt="main" className="w-3/4 rounded-lg my-4" />
        <p className="text-base">Navega y descubre el maravilloso mundo de los pokemon, <br /> conociendo todo acerca de ellos</p>
        <div className="my-4">
          <Link href="/dashboard/1-gen">
            <a className="bg-yellow-400 py-2 px-6 rounded-full font-semibold">1° generation</a>
          </Link>
          <Link href="/dashboard/2-gen">
            <a className="bg-green-400 opacity-50 py-2 px-6 rounded-full font-semibold mx-3 pointer-events-none">2° generation</a>
          </Link>
          <Link href="/dashboard/3-gen">
            <a className="bg-purple-400 opacity-50 py-2 px-6 rounded-full font-semibold pointer-events-none">3° generation</a>
          </Link>
        </div>
        <p className="text-xs font-bold">*Por ahora solo esta habilitada la 1° generación, próximamente se agregarán las otras</p>
      </div>
    </AppLayout>
  )
}
