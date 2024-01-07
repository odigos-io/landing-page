'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body style={{ background: '#060606' }} className={`no-scrollbar`}>
        {children}
      </body>
    </html>
  );
}
