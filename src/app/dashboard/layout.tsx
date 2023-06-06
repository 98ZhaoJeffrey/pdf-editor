import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex overflow-hidden'>
      <Sidebar />
      {/* Main section */}
      <div className="w-full h-screen flex flex-col">
        {/* Nav bar */}
        <Navbar />
        <div className='w-full grow bg-slate-50'>{children}</div>
      </div>

    </div>
  )
}