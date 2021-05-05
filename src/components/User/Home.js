import React from 'react'

export default function Home({userDetail}) {

  const toUpper = (name) => {
    return name ? name.toUpperCase() : "UNKNOWN";
  };

  return (
    <div>
      <h1>Welcome  </h1>
    </div>
  )
}
