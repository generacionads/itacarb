import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo trata Ítacarb los datos personales recogidos a través del formulario de contacto, la newsletter y la navegación por el sitio web.",
  alternates: { canonical: "/politica-de-privacidad" },
};

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            Política de Privacidad
          </h1>
          <p className={p}>
            La dirección de nuestro sitio web es: https://itacarb.es. Esta política explica qué datos
            personales recopilamos a través del Sitio Web, con qué finalidad y qué derechos tienes sobre
            ellos.
          </p>

          <h2 className={h2}>Responsable del tratamiento</h2>
          <p className={p}>
            Ítacarb
            <br />
            Correo electrónico: hola@itacarb.es
            <br />
            Teléfono: +34 611 68 15 39
            <br />
            Dirección: Calle la Diligencia, 9, Oficina 7
          </p>

          <h2 className={h2}>Formulario de contacto</h2>
          <p className={p}>
            Cuando nos escribes a través del formulario de contacto recopilamos tu nombre, correo
            electrónico, teléfono, empresa y el mensaje que nos envías. Estos datos se utilizan únicamente
            para responder a tu consulta y se envían por correo electrónico a nuestro equipo a través de
            nuestro proveedor de envío de emails (Resend). La base legal es tu consentimiento, prestado al
            enviar el formulario.
          </p>

          <h2 className={h2}>Newsletter</h2>
          <p className={p}>
            Si te suscribes a nuestra newsletter, tu correo electrónico se almacena en nuestra plataforma de
            email marketing (Brevo) con el fin de enviarte contenido y novedades sobre Ítacarb. Puedes darte
            de baja en cualquier momento a través del enlace incluido en cada comunicación. La base legal es
            tu consentimiento.
          </p>

          <h2 className={h2}>Cookies</h2>
          <p className={p}>
            El Sitio Web utiliza cookies propias y de terceros con fines técnicos y, si das tu consentimiento,
            de medición y analítica. Puedes consultar el detalle en nuestra{" "}
            <Link href="/politica-de-cookies" className="underline hover:opacity-70 transition-opacity">
              Política de Cookies
            </Link>
            .
          </p>

          <h2 className={h2}>Contenido incrustado de otros sitios web</h2>
          <p className={p}>
            Algunas páginas del Sitio Web (por ejemplo, artículos del blog) pueden incluir contenido incrustado
            de otros sitios web (vídeos, imágenes, etc.). Este contenido se comporta exactamente igual que si
            hubieras visitado el sitio web de origen, que puede recopilar datos sobre ti, usar cookies o
            incrustar seguimiento adicional de terceros.
          </p>

          <h2 className={h2}>Con quién compartimos tus datos</h2>
          <p className={p}>
            Compartimos tus datos únicamente con los proveedores estrictamente necesarios para prestar
            nuestros servicios, que actúan como encargados del tratamiento bajo contrato: Resend (envío de
            emails del formulario de contacto), Brevo (gestión de la newsletter), Vercel (alojamiento del
            Sitio Web) y, si aceptas las cookies de medición, Google (Google Tag Manager / Google Analytics).
            No cedemos tus datos a terceros para fines distintos a los descritos en esta política.
          </p>

          <h2 className={h2}>Cuánto tiempo conservamos tus datos</h2>
          <p className={p}>
            Conservamos los datos del formulario de contacto durante el tiempo necesario para atender tu
            consulta y, en su caso, la relación comercial que pueda derivarse. Los datos de la newsletter se
            conservan mientras permanezcas suscrito, y se eliminan cuando te das de baja.
          </p>

          <h2 className={h2}>Qué derechos tienes sobre tus datos</h2>
          <p className={p}>
            Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición,
            limitación del tratamiento y portabilidad escribiendo a hola@itacarb.es. También tienes derecho a
            presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si
            consideras que el tratamiento de tus datos no se ajusta a la normativa vigente.
          </p>

          <h2 className={h2}>Contacto</h2>
          <p className={p}>
            Para cualquier duda sobre esta Política de Privacidad, puedes escribirnos a hola@itacarb.es.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
