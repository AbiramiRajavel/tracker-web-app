import './globals.css'

export const metadata = {
  title: 'Bug/Task Tracker',
  description: 'A comprehensive bug and task tracking application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}