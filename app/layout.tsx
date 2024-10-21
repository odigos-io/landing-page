'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body className='no-scrollbar'>{children}</body>
    </html>
  );
}
