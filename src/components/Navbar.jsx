import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Search, Home, Info, ChefHat } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/recipes", label: "Recipes", icon: Search },
  { to: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setVisible(y < 20 || y < lastY.current);
    setScrolled(y > 20);
    lastY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-surface-950/85 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)]" : "bg-transparent"}`}
    >
      <div className="content-container">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/15 group-hover:shadow-brand-500/30 transition-all duration-300">
              <ChefHat size={18} className="text-white" />
            </div>
            <span className="text-lg font-display font-bold text-white tracking-tight">
              Ember<span className="text-brand-400">.</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = isActive(to);
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-white/[0.06]"
                      : "text-surface-500 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon size={15} className={active ? "text-brand-400" : ""} />
                  {label}
                </NavLink>
              );
            })}
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg text-surface-500 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="content-container pb-4">
          <div className="rounded-xl bg-surface-900/95 backdrop-blur-xl border border-white/[0.06] p-1.5 space-y-0.5 shadow-2xl">
            {links.map(({ to, label, icon: Icon }) => {
              const active = isActive(to);
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-white/[0.06]"
                      : "text-surface-500 hover:text-white hover:bg-white/[0.03]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={15} className={active ? "text-brand-400" : ""} />
                  {label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
