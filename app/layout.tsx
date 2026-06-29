import './globals.css';

export const metadata = {
  title: 'SpotOnTrip | Live Supply Matrix',
  description: 'Premium Curated Logistics & Escapes Aggregator Feed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 m-0 p-0">
        {children}
      </body>
    </html>
  );
}