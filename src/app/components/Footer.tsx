import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-purple-100 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧪</span>
              </div>
              <span className="text-xl">SenseiFood</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Master the science of food with precision recipe engineering tools.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="mb-4 text-white/90">Tools</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://cookiessensei.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  CookieSensei
                </a>
              </li>
              <li>
                <a href="https://www.cakesensei.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  CakeSensei
                </a>
              </li>
              <li>
                <a href="https://piesensei.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  PieSensei
                </a>
              </li>
              <li>
                <a href="https://icecreamsensei.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  IceCreamSensei
                </a>
              </li>
              <li>
                <a href="https://beansensei.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">
                  BeanSensei
                </a>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="mb-4 text-white/90">Learn</h4>
            <ul className="space-y-3">
              <li>
                <a href="#experiments" className="text-sm text-white/70 hover:text-white transition-colors">
                  Experiments
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Food Science 101
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Recipe Engineering
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-white/90">Connect</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>© {currentYear} SenseiFood. All rights reserved. Built for food science enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}