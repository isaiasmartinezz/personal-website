import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// The professional site's nav + <main> + footer. Used by the (portfolio) layout
// and by the global 404 page (which renders outside any group layout).
export function PortfolioChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
