import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-white">ShopWiz</h1>
          <p className="mt-4 text-sm text-gray-400">
            Your one-stop destination for all your shopping needs.  
            Shop smart. Shop fast. Shop with Wiz.
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="text-white font-semibold text-lg">Customer Support</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/help" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-white transition">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white transition">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-white font-semibold text-lg">Company</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white transition">
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-white font-semibold text-lg">Stay Updated</h2>
          <p className="mt-4 text-sm text-gray-400">
            Subscribe to our newsletter for exclusive deals and updates.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg w-full bg-white focus:outline-none text-black"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} ShopWiz. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
