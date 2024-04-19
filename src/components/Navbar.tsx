import Link from 'next/link';
import React from 'react'

function Navbar() {
  return (
    <div className="flex flex-col mb-8">
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white shadow-md">
        <Link className="flex items-center" href="/">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <span className="ml-2 text-lg font-semibold">ModelHuB</span>
        </Link>
      </header>
    </div>
  );
}

export default Navbar