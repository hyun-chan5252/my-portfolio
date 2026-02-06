import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Navigation 컴포넌트
 *
 * Props:
 * 없음 - 독립적인 네비게이션 컴포넌트
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Me' },
    { path: '/projects', label: 'Projects' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2">
          <motion.div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFF3B0] to-[#A8D8EA] flex items-center justify-center shadow-sm"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#333] font-bold text-sm">P</span>
          </motion.div>
          <span className="text-lg font-bold text-foreground group-hover:text-[#E6B800] transition-colors">
            Portfolio
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  isActive
                    ? 'text-[#E6B800]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-gray-100/50'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E6B800]"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Contact Button */}
          <motion.a
            href="#contact"
            className="ml-4 px-4 py-2 bg-[#FFF3B0] text-[#333] text-sm font-semibold rounded-lg hover:bg-[#FFE566] transition-colors shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground hover:bg-gray-100"
          onClick={toggleMenu}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t border-gray-100 md:hidden bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300',
                        isActive
                          ? 'bg-[#FFF3B0]/30 text-[#E6B800] border-l-2 border-[#E6B800]'
                          : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile Contact Button */}
              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 px-4 py-3 bg-[#FFF3B0] text-[#333] text-center font-semibold rounded-lg hover:bg-[#FFE566] transition-colors shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navigation;
