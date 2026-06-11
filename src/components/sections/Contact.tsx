import { Container } from "@/components/ui/Container";

export function Contact() {
  return (
    <section id="contacto" className="py-24 bg-[#f9f8f6]">
      <Container>
        {/* H2 */}
        <h2
          className="text-[#36383a] text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-tight"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Todo viaje comienza con una conversación. Escríbenos.
        </h2>

        {/* Formulario */}
        <form className="mt-12 flex flex-col gap-6" noValidate>
          {/* Nombre */}
          <div className="border-b-2 border-[#7a7c7e] pb-8 px-1">
            <input
              type="text"
              name="nombre"
              autoComplete="name"
              placeholder="Nombre"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-[#36383a] placeholder:text-[#7a7c7e] outline-none"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Mail */}
          <div className="border-b-2 border-[#7a7c7e] pb-8 px-1">
            <input
              type="email"
              name="mail"
              autoComplete="email"
              placeholder="Mail"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-[#36383a] placeholder:text-[#7a7c7e] outline-none"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Teléfono */}
          <div className="border-b-2 border-[#7a7c7e] pb-8 px-1">
            <input
              type="tel"
              name="telefono"
              autoComplete="tel"
              placeholder="Teléfono"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-[#36383a] placeholder:text-[#7a7c7e] outline-none"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Empresa */}
          <div className="border-b-2 border-[#7a7c7e] pb-8 px-1">
            <input
              type="text"
              name="empresa"
              autoComplete="organization"
              placeholder="Empresa"
              className="w-full bg-transparent text-[28px] md:text-[48px] font-medium tracking-[-0.04em] text-[#36383a] placeholder:text-[#7a7c7e] outline-none"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Mensaje */}
          <div className="border-b-2 border-[#7a7c7e] pb-24 px-1">
            <textarea
              name="mensaje"
              placeholder="Escribe aquí tu mensaje"
              rows={3}
              className="w-full bg-transparent text-[18px] md:text-[24px] font-medium tracking-[-0.04em] text-[#36383a] placeholder:text-[#7a7c7e] outline-none resize-none"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            />
          </div>

          {/* Enviar */}
          <div className="flex items-center justify-end gap-6 pt-12 px-3 pb-3">
            <button
              type="submit"
              className="flex items-center gap-6 text-[#36383a] transition-colors hover:text-[#a3422e] group"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              <span className="text-[48px] md:text-[64px] font-medium tracking-[-0.04em] leading-none">
                Enviar
              </span>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
