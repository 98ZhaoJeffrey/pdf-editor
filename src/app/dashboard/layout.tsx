import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ViewPreferenceProvider } from '../contexts/ViewPreferenceContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewPreferenceProvider>
      <div className='flex overflow-hidden bg-slate-100'>
        <Sidebar />
        {/* Main section */}
        <div className='w-full h-screen flex flex-col'>
          {/* Nav bar */}
          <Navbar />
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </ViewPreferenceProvider>

  );
}