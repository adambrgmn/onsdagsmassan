import React from 'react';
import { format } from 'url';

export default ({ uri }) => {
  const src = format({
    protocol: 'https',
    hostname: 'embed.spotify.com/',
    query: {
      theme: 'white',
      uri,
    }
  });

  return (
    <iframe
      src={src}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency="true"
    />
  );
}
