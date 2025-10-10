import { Linkedin, Mail, Heart } from 'lucide-react';
import JMRMLogo from './JMRMLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <JMRMLogo size="xs" className="drop-shadow-lg" />
            <span className="text-muted-foreground">
              © {currentYear} José Manuel Ruz Maestre
            </span>
          </div>

          <div className="flex items-center space-x-6">

            <a 
              href="https://www.linkedin.com/in/joseruz/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="mailto:contact@jmrmservices.es" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            Hecho con <Heart className="h-4 w-4 mx-1 text-red-500" /> y muchos datos
          </p>
        </div>
      </div>
    </footer>
  );
}