import React from "react";

const Footer = () => (
  <footer className="bg-dark border-t border-gray-800 mt-12 text-light">
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h3 className="font-bold mb-2 text-accent">Customer Service</h3>
        <ul className="space-y-1 text-gray-400">
          <li>Help</li>
          <li>Track Order</li>
          <li>Size Chart</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-accent">Worry Free Shopping</h3>
        <ul className="space-y-1 text-gray-400">
          <li>Promo Terms and Exclusions</li>
          <li>Safe Shopping</li>
          <li>Delivery & Shipping</li>
          <li>90-Day Returns</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2 text-accent">Information</h3>
        <ul className="space-y-1 text-gray-400">
          <li>My Account</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="flex flex-col items-start">
        <span className="mb-2 text-accent">Stay updated on sales, new items and more</span>
        <button className="bg-accent text-dark px-6 py-2 rounded-xl font-bold mb-4 shadow-glass">SIGN UP & SAVE 10%</button>
        <span className="mb-2 text-accent">Follow Us</span>
        <div className="flex gap-2">
          <span className="bg-gray-700 text-accent rounded-full p-2">F</span>
          <span className="bg-gray-700 text-accent rounded-full p-2">X</span>
          <span className="bg-gray-700 text-accent rounded-full p-2">I</span>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 py-4 text-xs text-gray-400 text-center">
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        <span className="hover:text-accent cursor-pointer">Privacy Policy</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Accessibility</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Terms of Use</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Modern Slavery and Child Labour Statement</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Site Map</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Cookie Policy & Management</span>
        <span>|</span>
        <span className="hover:text-accent cursor-pointer">Product Concerns</span>
      </div>
      <div className="mb-1 text-accent">UFC® ™,®&© 2025 ZUFFA, LLC. ALL RIGHTS RESERVED.</div>
      <div className="mb-1 text-accent">© Fanatics, LLC., 2025. All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of Fanatics, LLC.</div>
      <div className="flex justify-center gap-2 mt-2">
        <span className="bg-gray-700 text-accent rounded px-2">VISA</span>
        <span className="bg-gray-700 text-accent rounded px-2">Mastercard</span>
        <span className="bg-gray-700 text-accent rounded px-2">AMEX</span>
        <span className="bg-gray-700 text-accent rounded px-2">PayPal</span>
        <span className="bg-gray-700 text-accent rounded px-2">Apple Pay</span>
        <span className="bg-gray-700 text-accent rounded px-2">GPay</span>
        <span className="bg-gray-700 text-accent rounded px-2">Maestro</span>
      </div>
    </div>
  </footer>
);

export default Footer;
