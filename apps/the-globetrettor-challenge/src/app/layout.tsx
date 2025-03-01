import './global.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'Welcome to the-globetrettor-challenge',
  description: 'The Ultimate Travel Guessing Game!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
