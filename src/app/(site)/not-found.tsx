import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '64px 24px',
        textAlign: 'center',
        color: '#F9F9F9',
      }}
    >
      <h1 style={{ fontSize: '64px', fontWeight: 600, margin: '0 0 16px', letterSpacing: '-1.28px' }}>404</h1>
      <p style={{ fontSize: '20px', color: '#A39BA0', margin: '0 0 32px', maxWidth: '480px' }}>The page you are looking for does not exist or has been moved.</p>
      <Link
        href='/'
        style={{
          display: 'inline-block',
          padding: '12px 32px',
          borderRadius: '8px',
          backgroundColor: '#F9F9F9',
          color: '#0F0F0F',
          fontSize: '16px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
