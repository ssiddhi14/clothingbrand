import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="section-padding py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-heading text-3xl tracking-[0.2em] mb-4">IDENTITY</h3>
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Premium essentials designed for those who dare to stand out. Every thread tells a story.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest mb-4">Shop</h4>
          <nav className="flex flex-col gap-2">
            {["Men", "Women", "Kids", "New Arrivals", "Best Sellers", "Sale"].map((item) => (
              <Link key={item} to="/shop" className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest mb-4">Help</h4>
          <nav className="flex flex-col gap-2">
            {["Size Guide", "Shipping & Returns", "Track Order", "FAQs", "Contact Us"].map((item) => (
              <span key={item} className="font-body text-sm text-primary-foreground/60 cursor-pointer hover:text-primary-foreground transition-colors">
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-body text-xs uppercase tracking-widest mb-4">Stay in the loop</h4>
          <p className="font-body text-sm text-primary-foreground/60 mb-4">Get early access to drops, exclusive deals, and more.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent border border-primary-foreground/30 px-4 py-3 text-sm font-body placeholder:text-primary-foreground/30 outline-none focus:border-primary-foreground transition-colors"
            />
            <button className="bg-primary-foreground text-primary px-6 py-3 text-xs uppercase tracking-widest font-body font-semibold hover:opacity-90 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-primary-foreground/40">© 2026 IDENTITY. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <span key={item} className="font-body text-xs text-primary-foreground/40 cursor-pointer hover:text-primary-foreground/70 transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
