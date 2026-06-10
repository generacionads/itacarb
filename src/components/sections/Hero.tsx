export function Hero() {
  return (
    <section className="w-full">
      {/* Desktop */}
      <video
        className="hidden w-full md:block"
        src="/hero-itaca.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Mobile */}
      <video
        className="block w-full md:hidden"
        src="/hero-itaca-responsive.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
}
