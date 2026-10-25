// Root 404, shared by every host. Next serializes this boundary into the RSC
// payload of every page, so it must not mention either side of the site; the
// portfolio's styled 404 lives in (portfolio)/not-found.tsx and is reached via
// the (portfolio)/[...rest] catch-all.
export default function RootNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-serif text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
    </main>
  );
}
