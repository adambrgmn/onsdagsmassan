import React from 'react';

export default ({ uri }) => {
  console.log(uri);
  return (
    <iframe
      src={`https://embed.spotify.com/?uri=${uri}&theme=white`}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency="true"
    />
  )
};

// <iframe src="https://embed.spotify.com/?uri=spotify:user:wilhelmochson:playlist:3TsLhxE11M6abBZd5atoEu&theme=white" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
