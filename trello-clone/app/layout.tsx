import './globals.css'




export const metadata= {
  title: 'Trello Clone',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-200'>{children}</body>
    </html>
  )
}
