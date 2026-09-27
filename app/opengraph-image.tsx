import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vinsith Interior Wall Art';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF8F4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #C9A84C',
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#1a1208',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Vinsith Interior
        </h1>
        <p
          style={{
            fontSize: 40,
            color: '#8C7B6A',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Premium Handcrafted Wall Art in Sri Lanka
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
