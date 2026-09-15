import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Qué cookies utiliza el sitio web de Ítacarb, con qué finalidad y cómo puedes desactivarlas o eliminarlas.",
  alternates: { canonical: "/politica-de-cookies" },
};

const h2 = "text-foreground text-[28px] md:text-[32px] font-medium tracking-[-0.04em] leading-tight mt-12";
const p = "text-foreground text-[16px] font-light leading-relaxed";

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <Header />
      <main className="pt-[120px] pb-24 bg-background">
        <Container className="max-w-[760px] flex flex-col gap-6">
          <h1 className="text-foreground text-[40px] md:text-[56px] font-medium tracking-[-0.04em] leading-none">
            Política de Cookies
          </h1>
          <p className={p}>
            Una cookie es un pequeño fichero de texto que se almacena en tu navegador cuando visitas casi
            cualquier página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a
            navegar por ella. Siguiendo las directrices de la Agencia Española de Protección de Datos,
            detallamos a continuación el uso de cookies que hace este sitio web.
          </p>

          <h2 className={h2}>Cookies propias</h2>
          <p className={p}>
            <strong>itacarb_cookie_consent</strong>: guarda tu decisión sobre el aviso de cookies (aceptar o
            rechazar), para no volver a preguntarte en cada visita. Tiene una duración de un año.
          </p>

          <h2 className={h2}>Cookies de terceros</h2>
          <p className={p}>
            Solo se cargan si aceptas el aviso de cookies:
          </p>
          <p className={p}>
            <strong>Google Tag Manager</strong>: gestor de etiquetas que puede activar, entre otras,
            herramientas de medición como Google Analytics para elaborar estadísticas sobre el tráfico y el
            volumen de visitas de este sitio web. Al aceptar estas cookies consientes el tratamiento de
            información sobre ti por parte de Google. Puedes consultar su política de privacidad en{" "}
            https://policies.google.com/privacy.
          </p>

          <h2 className={h2}>Desactivación o eliminación de cookies</h2>
          <p className={p}>
            Puedes rechazar las cookies de este sitio desde el propio aviso de cookies, o eliminarlas en
            cualquier momento desde la configuración de tu navegador. Ten en cuenta que, en algunos casos, es
            necesario instalar una cookie propia para recordar tu decisión de no aceptación.
          </p>

          <h2 className={h2}>Notas adicionales</h2>
          <p className={p}>
            Ni este sitio web ni sus representantes legales se hacen responsables del contenido ni de la
            veracidad de las políticas de privacidad de los terceros mencionados en esta página. Para
            cualquier duda sobre esta Política de Cookies, puedes escribirnos a hola@itacarb.es.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
