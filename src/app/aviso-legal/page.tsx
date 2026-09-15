import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Condiciones de acceso y uso del sitio web de Ítacarb, identificación del titular y régimen de responsabilidad.",
  alternates: { canonical: "/aviso-legal" },
};

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            Aviso Legal
          </h1>
          <p className={p}>
            El presente Aviso Legal regula el acceso y uso del sitio web{" "}
            <strong>https://itacarb.es</strong> (en adelante, el &quot;Sitio Web&quot;), titularidad de{" "}
            <strong>Ítacarb</strong>.
          </p>

          <h2 className={h2}>Identificación del titular</h2>
          <p className={p}>
            Denominación: Ítacarb
            <br />
            Sitio web: https://itacarb.es
            <br />
            Correo electrónico de contacto: hola@itacarb.es
            <br />
            Teléfono: +34 611 68 15 39
            <br />
            Dirección: Calle la Diligencia, 9, Oficina 7
          </p>

          <h2 className={h2}>Objeto</h2>
          <p className={p}>
            A través del Sitio Web, Ítacarb ofrece información sobre sus servicios de consultoría estratégica
            de marketing, así como un canal de contacto y suscripción a su newsletter. El acceso al Sitio Web
            es gratuito y no requiere registro previo, salvo para aquellas funcionalidades que así lo indiquen
            expresamente.
          </p>

          <h2 className={h2}>Condiciones de acceso y uso</h2>
          <p className={p}>
            El uso del Sitio Web atribuye la condición de usuario e implica la aceptación plena de las
            condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado y
            lícito del Sitio Web, así como de los contenidos y servicios que en él se ofrecen, de conformidad
            con la legislación vigente, la buena fe y el orden público.
          </p>

          <h2 className={h2}>Propiedad intelectual e industrial</h2>
          <p className={p}>
            Todos los contenidos del Sitio Web (textos, imágenes, diseño gráfico, logotipos, código fuente y
            demás elementos) son propiedad de Ítacarb o de terceros que han autorizado su uso, y están
            protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
            reproducción, distribución o transformación sin autorización expresa del titular, salvo para uso
            personal y privado.
          </p>

          <h2 className={h2}>Exclusión de responsabilidad</h2>
          <p className={p}>
            Ítacarb no se hace responsable de los daños y perjuicios que pudieran derivarse de
            interferencias, interrupciones, virus informáticos, averías o desconexiones en el funcionamiento
            operativo del Sitio Web, motivadas por causas ajenas a Ítacarb. Se reserva el derecho a
            modificar, en cualquier momento y sin previo aviso, la presentación, configuración y contenidos
            del Sitio Web.
          </p>

          <h2 className={h2}>Enlaces a terceros</h2>
          <p className={p}>
            El Sitio Web puede contener enlaces a páginas de terceros. Ítacarb no asume responsabilidad
            alguna sobre el contenido, políticas de privacidad o prácticas de dichos sitios web ajenos.
          </p>

          <h2 className={h2}>Legislación aplicable y jurisdicción</h2>
          <p className={p}>
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que
            pudiera derivarse del acceso o uso del Sitio Web, las partes se someten a los Juzgados y
            Tribunales que resulten competentes conforme a derecho.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
