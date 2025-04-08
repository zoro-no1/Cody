import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6  border-t border-gray-700">
  <div className="container mx-auto text-center space-y-2">
    <p className="text-sm">
      &copy; 2025 <span className="text-green-400 font-semibold">Ayur AI</span>. All rights reserved.
    </p>
    <p className="text-sm">
      Made with ❤️ by <span className="text-white font-medium">Manish Bourai</span>.
    </p>
    <p className="text-sm">
      Follow me on{" "}
      <a
        href="https://github.com/zoro-no1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-400 hover:text-green-300 underline transition"
      >
        GitHub
      </a>
    </p>
  </div>
</footer>

  )
}
