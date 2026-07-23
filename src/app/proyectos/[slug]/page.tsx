import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealH2 } from "@/components/ui/RevealH2";
import { AnimatedStatBox } from "@/components/ui/AnimatedStatBox";

interface ProjectStat {
  value: string;
  label: string;
}

interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stat?: ProjectStat;
  stat2?: ProjectStat;
  heroImage: string | null;
  strategyImage: string | null;
  strategyText: string;
  solutionImage: string | null;
  solutionText: string;
  reviewImage: string | null;
  reviewAvatar: string | null;
  reviewAuthor: string;
  reviewRole: string;
  reviewQuote: string;
}

const projects: Project[] = [
  // ── Clínicas y sector salud ─────────────────────────────────────────────
  {
    slug: "clinica-morales-raya",
    name: "Clínica Dr. Morales Raya",
    tagline: "De la invisibilidad digital a escalar la captación cualificada de pacientes",
    description:
      "Clínica Dr. Morales Raya es un centro médico especializado en medicina estética y tratamientos avanzados. Su principal desafío radicaba en que su excelencia clínica no se reflejaba en su presencia digital, lo que limitaba severamente su capacidad para llegar a nuevos pacientes.",
    stat: { value: "103%", label: "de aumento en visibilidad cualificada tras 4 meses" },
    heroImage: "/projects/morales-raya.jpeg",
    strategyImage: "/projects/clinica-morales-raya/estrategia.jpg",
    strategyText:
      "Establecimos una medición precisa del ecosistema digital, garantizando la trazabilidad de cada acción para optimizar las campañas. Sobre esta sólida base analítica, impulsamos la generación de alcance para aumentar exponencialmente la visibilidad de los servicios. Finalmente, todo este esfuerzo de difusión se canalizó hacia una captación cualificada, logrando atraer usuarios con una intención real de iniciar terapia y asegurando pacientes.",
    solutionImage: "/projects/clinica-morales-raya/solucion.jpg",
    solutionText:
      "Partiendo de un escenario inicial marcado por procesos ineficientes y un nulo posicionamiento digital, reestructuramos por completo su ecosistema. Nuestro enfoque permitió proyectar el verdadero valor de su marca directamente hacia el público adecuado. Como resultado, logramos convertir una infraestructura operativa estancada en un motor de captación optimizado, impulsando un crecimiento comercial sostenido y consolidando su autoridad en el sector de la salud mental.",
    reviewImage: "/projects/clinica-morales-raya/resena.jpg",
    reviewAvatar: "/projects/clinica-morales-raya/avatar.jpg",
    reviewAuthor: "Carlos Novion",
    reviewRole: "CEO",
    reviewQuote:
      "Quiero destacar el excelente servicio que recibí de Generación Ads durante todo un año. Su equipo no solo brindó un soporte impecable para mi sitio web, sino que también manejaron mis redes sociales de manera profesional y estratégica. Siempre estuvieron disponibles para resolver dudas, proponer mejoras y adaptar estrategias a las necesidades de mi negocio.",
  },
  {
    slug: "cm-cosmetica",
    name: "CM Cosmética Dermatológica",
    tagline: "De la invisibilidad de una marca nueva a referente de dermocosmética online en menos de un año",
    description:
      "CM Cosmética Dermatológica es una marca especializada en productos de cuidado de la piel con base dermatológica, orientada al canal online. Con un catálogo centrado en la eficacia clínica y la confianza del consumidor, la marca buscaba escalar su presencia digital y convertir su inversión publicitaria en un motor de crecimiento real y medible, tanto en captación de nuevos clientes como en fidelización de su base existente.",
    stat: { value: "x12", label: "de retorno sobre el gasto en inversión en marketing digital" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Abordamos el proyecto como un lanzamiento de marca integral. Antes de activar cualquier canal de captación, definimos el posicionamiento, el tono de comunicación y la narrativa visual de CM Cosmética. A partir de ahí, construimos una estrategia de contenidos que combinaba producción creativa propia con acciones de SEO para generar visibilidad orgánica sostenible. Solo cuando la marca tenía solidez y coherencia activamos la publicidad de pago, asegurándonos de que cada euro invertido comunicaba algo creíble y diferencial.",
    solutionImage: null,
    solutionText:
      "Construimos la presencia digital de CM Cosmética de forma escalonada y coherente: primero la base de contenidos y posicionamiento orgánico para ganar visibilidad en buscadores, después la activación publicitaria en Google y Meta como palanca de aceleración. Cada acción estuvo orientada a reforzar la percepción de marca tanto como a generar ventas, tratando ambos objetivos como inseparables. El resultado fue una marca que, desde su lanzamiento, compitió de tú a tú con referencias consolidadas del sector y multiplicó por 12 su inversión publicitaria.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "expresa-salud",
    name: "Expresa Salud Emocional",
    tagline: "De la invisibilidad digital a escalar la captación cualificada en salud mental",
    description:
      "Expresa Salud Emocional es un centro de psicología enfocado en brindar terapia y apoyo emocional de alta calidad. Sin embargo, su principal desafío radicaba en que su excelencia médica no se reflejaba en su ecosistema digital, lo que limitaba severamente su capacidad para llegar a nuevos pacientes.",
    stat: { value: "103%", label: "de aumento de visibilidad cualificada en 4 meses" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Establecimos una medición precisa del ecosistema digital, garantizando la trazabilidad de cada acción para optimizar las campañas. Sobre esta sólida base analítica, impulsamos la generación de alcance para aumentar exponencialmente la visibilidad de los servicios. Finalmente, todo este esfuerzo de difusión se canalizó hacia una captación cualificada, logrando atraer usuarios con una intención real de iniciar terapia y asegurando pacientes.",
    solutionImage: null,
    solutionText:
      "Partiendo de un escenario inicial marcado por procesos ineficientes y un nulo posicionamiento digital, reestructuramos por completo su ecosistema. Nuestro enfoque permitió proyectar el verdadero valor de su marca directamente hacia el público adecuado. Como resultado, logramos convertir una infraestructura operativa estancada en un motor de captación optimizado, impulsando un crecimiento comercial sostenido y consolidando su autoridad en el sector de la salud mental.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },

  // ── Arquitectura y diseño ───────────────────────────────────────────────
  {
    slug: "paralelo-estudio",
    name: "Paralelo Estudio",
    tagline: "Construimos la marca que los hizo elegir sus proyectos, no aceptarlos.",
    description:
      "Paralelo Estudio es un estudio de interiorismo corporativo con base en Madrid especializado en transformar marcas en experiencias físicas: restaurantes, oficinas y espacios de retail de alto nivel.",
    stat: { value: "+1.170", label: "Contactos cualificados generados en estos años" },
    stat2: { value: "49,84€", label: "Coste por oportunidad" },
    heroImage: "/projects/paralelo-estudio.jpg",
    strategyImage: "/projects/paralelo-estudio/estrategia.jpg",
    strategyText:
      "Llevamos años trabajando como su partner estratégico, con una planificación anual que crece junto al estudio. El foco desde el primer día: construir una marca digital a la altura de sus proyectos físicos, sumando cada año nuevos canales siempre con coherencia y visión de largo plazo.",
    solutionImage: "/projects/paralelo-estudio/solucion.jpg",
    solutionText:
      "El resultado es una presencia digital que hoy refleja su nivel real: mejor posicionamiento en Google, más tráfico cualificado, una imagen de marca percibida como genuinamente premium y, sobre todo, más consultas de clientes con proyectos de alto valor. Cinco años después, seguimos escalando.",
    reviewImage: "/projects/paralelo-estudio/resena.jpg",
    reviewAvatar: "/projects/paralelo-estudio/avatar.jpg",
    reviewAuthor: "Rafael Ortega",
    reviewRole: "Socio fundador, Paralelo Estudio",
    reviewQuote: "Llevamos cinco años trabajando con Ítacarb y la diferencia es clara: antes esperábamos a que los proyectos llegaran, ahora los elegimos. Han entendido nuestro trabajo desde el principio y han sabido trasladarlo a una presencia digital que refleja realmente quiénes somos.",
  },
  {
    slug: "af-iberia",
    name: "AF Iberia",
    tagline: "Del prestigio latinoamericano a construir presencia digital en el mercado español",
    description:
      "AF Iberia es la marca con la que Ayassa Fombella —firma argentina de arquitectura con más de 40 años de trayectoria— aterrizó en España en 2025. A pesar de su sólido bagaje internacional, su entrada al mercado local carecía de la presencia digital necesaria para generar confianza y captar clientes en un entorno completamente nuevo.",
    stat: { value: "1ª", label: "identidad digital adaptada al mercado español" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "El reto era trasladar la autoridad y credencial de una firma consolidada en Latinoamérica a un mercado que no la conocía. Diseñamos una estrategia de digitalización orientada a validar su propuesta de valor ante el público español, diferenciando con claridad sus dos perfiles de cliente y poniendo en valor su portfolio internacional como aval de confianza.",
    solutionImage: null,
    solutionText:
      "Desarrollamos un onepage estratégico que actúa como carta de presentación digital para el mercado español. La web comunica con precisión los servicios dirigidos a particulares y empresas por un lado, y a promotoras y estudios por otro, y respalda la credibilidad de la marca con un portfolio de proyectos de referencia para clientes como Meta, BBVA o PwC. Una presencia digital sencilla, profesional y alineada con los objetivos comerciales de su expansión en España.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "artquitrabe",
    name: "Artquitrabe",
    tagline: "Impulsando el crecimiento de una nueva marca de reformas en un mercado altamente competitivo",
    description:
      "Artquitrabe nace con una visión clara: diseñar, crear e inspirar a través de reformas integrales de viviendas y locales comerciales en Madrid. Como muchas empresas en sus primeras etapas, el reto no estaba únicamente en ofrecer un gran servicio, sino en conseguir visibilidad, generar confianza y competir frente a compañías ya consolidadas dentro del sector.",
    stat: { value: "+100", label: "clientes generados en menos de 6 meses" },
    stat2: { value: "+50K", label: "visitas en los primeros 3 meses" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Artquitrabe llegó en una fase inicial, sin una base digital sólida y con una inversión muy ajustada. El principal objetivo a corto plazo era claro: conseguir clientes potenciales de calidad en el menor tiempo posible dentro de un sector con un ticket medio elevado y una competencia muy agresiva. Desarrollamos una estrategia progresiva centrada en dos pilares: captación inmediata y construcción de marca a largo plazo.",
    solutionImage: null,
    solutionText:
      "Construimos una presencia digital pensada para generar confianza y convertir tráfico en oportunidades reales de negocio. Desde la estructura de comunicación hasta la estrategia de captación, cada acción fue diseñada para maximizar el rendimiento de la inversión y acelerar el crecimiento de la marca desde sus primeras etapas. La estrategia permitió posicionar a Artquitrabe frente a clientes que buscaban proyectos de reforma integral de mayor valor.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "milton-home",
    name: "Milton Home",
    tagline: "Un mes para demostrar que el comprador ya estaba ahí, solo había que encontrarle",
    description:
      "Milton Homes es una promotora inmobiliaria de obra nueva en Cantabria especializada en viviendas exclusivas frente al mar: apartamentos, unifamiliares y garajes en enclaves únicos como Suances y Somo. Llegaron con una propuesta clara: probar un único mes antes de comprometerse con una estrategia de largo plazo.",
    stat: { value: "+109", label: "leads en 30 días" },
    stat2: { value: "~3€", label: "coste por conversión" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Activamos campañas en Meta Ads y Google Ads en paralelo, con segmentación y creatividades diferenciadas para cada producto. Las viviendas requerían un perfil de comprador con capacidad de inversión real y un proceso de decisión largo. Los garajes, un volumen mayor y un ciclo más corto. Dos lógicas distintas, una misma estructura de captación.",
    solutionImage: null,
    solutionText:
      "El resultado habló por sí solo: 45 leads para viviendas y 67 para garajes en el primer mes, a un coste medio de 3€ por conversión en ambos canales. Una cifra que en el sector inmobiliario no tiene precedente. El mes de prueba terminó. La relación, no.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },

  // ── Industrial ──────────────────────────────────────────────────────────
  {
    slug: "on-level-quality",
    name: "On Level Quality",
    tagline: "Posicionando una empresa industrial como referente de calidad en su sector",
    description:
      "On Level Quality es una empresa especializada en control de calidad y metrología industrial. A pesar de su alta capacidad técnica, su comunicación no transmitía la solidez y precisión que caracteriza a sus servicios, dificultando la captación de grandes cuentas.",
    stat: { value: "40%", label: "de incremento en solicitudes de presupuesto cualificadas" },
    heroImage: "/projects/on-level-quality.jpg",
    strategyImage: "/projects/on-level-quality/estrategia.jpg",
    strategyText:
      "Redefinimos el posicionamiento de marca para reflejar la excelencia técnica de sus servicios y construimos una comunicación que generaba confianza en perfiles de compra B2B. La estrategia de contenidos y la presencia digital reforzada permitieron llegar a decisores de compra en grandes empresas industriales.",
    solutionImage: "/projects/on-level-quality/solucion.jpg",
    solutionText:
      "Partiendo de una comunicación técnica pero poco persuasiva, transformamos su presencia digital en un activo comercial. Alineamos el mensaje de marca con las necesidades reales de sus clientes objetivo y desarrollamos canales de captación que conectaban directamente con decisores industriales, consolidando su reputación como proveedor de referencia en el sector.",
    reviewImage: "/projects/on-level-quality/resena.jpg",
    reviewAvatar: "/projects/on-level-quality/avatar.jpg",
    reviewAuthor: "Nombre del cliente",
    reviewRole: "Cargo",
    reviewQuote: "Reseña del cliente de On Level Quality.",
  },
  {
    slug: "haromatics",
    name: "Haromatics",
    tagline: "Esencias que venden: la estrategia de Google Ads que disparó las ventas de Haromatics",
    description:
      "Haromatics es un fabricante líder en esencias y aceites esenciales, referente por su capacidad de innovación y la pureza de sus materias primas. Su principal desafío radicaba en que esa excelencia técnica y capacidad de producción a gran escala no se reflejaban en su ecosistema digital, lo que limitaba severamente su visibilidad para atraer a nuevos distribuidores, marcas y clientes industriales.",
    stat: { value: "29%", label: "de aumento de leads cualificados en 3 meses" },
    stat2: { value: "81,82%", label: "de reducción de Coste por Lead" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Establecimos una medición precisa de su ecosistema digital, garantizando la trazabilidad de cada acción para optimizar las campañas de Google Ads. Sobre esta sólida base analítica, impulsamos la generación de alcance para aumentar exponencialmente la visibilidad de su catálogo de esencias y aceites esenciales. Finalmente, todo este esfuerzo de difusión se canalizó hacia una captación cualificada, logrando atraer a marcas y distribuidores con una intención real de compra y asegurando nuevos clientes comerciales para la fábrica.",
    solutionImage: null,
    solutionText:
      "Partiendo de un escenario inicial marcado por procesos ineficientes y un nulo posicionamiento digital, reestructuramos por completo su ecosistema. Nuestro enfoque permitió proyectar el verdadero valor de su marca y la calidad de sus productos directamente hacia el público adecuado. Como resultado, logramos convertir una infraestructura digital estancada en un motor de captación optimizado para la fábrica, impulsando un crecimiento comercial sostenido y consolidando su autoridad en el sector de la fabricación de esencias y aceites esenciales.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "tecnivalles",
    name: "Tecnivalles",
    tagline: "Líderes en accesibilidad, líderes en Google: la estrategia digital que multiplica los leads de Tecnivalles",
    description:
      "Tecnivalles es un fabricante e instalador referente en ascensores unifamiliares, elevadores verticales y sillas salvaescaleras, destacado por su solidez técnica y su compromiso con la accesibilidad. Su principal desafío histórico radicaba en que esa excelencia en ingeniería e instalación no se trasladaba con suficiente fuerza a su ecosistema digital, lo que limitaba el volumen de leads y presupuestos que su equipo comercial podía captar de forma directa en el mercado.",
    stat: { value: "25€", label: "de retorno por euro invertido (ROAS)" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Establecimos una medición precisa de su ecosistema digital, garantizando la trazabilidad de cada acción para optimizar las campañas de Google Ads. Sobre esta sólida base analítica, impulsamos una estrategia orientada a capturar la alta demanda del mercado, aumentando exponencialmente la visibilidad de sus soluciones en ascensores unifamiliares, elevadores y salvaescaleras. Finalmente, todo este esfuerzo se canalizó hacia un modelo de captación de alto volumen, logrando atraer de forma masiva a particulares y profesionales con una necesidad real de instalación.",
    solutionImage: null,
    solutionText:
      "Tras rediseñar y reestructurar por completo su ecosistema web para maximizar la conversión, convertimos su presencia online en un canal altamente competitivo. Nuestro enfoque estratégico en Google Ads permitió proyectar el valor técnico de sus soluciones directamente hacia las personas que buscaban mejorar la accesibilidad de sus inmuebles. Como resultado, logramos transformar su entorno digital en un motor de captación masivo, impulsando un volumen de presupuestos sin precedentes y consolidando a Tecnivalles como el referente indiscutible en el sector de la elevación y los ascensores unifamiliares.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "telstar",
    name: "Telstar",
    tagline: "Ingeniería de élite, leads de calidad: la estrategia digital que conecta a Telstar con el mundo",
    description:
      "Telstar es una empresa referente en ingeniería GMP, construcción y equipos de proceso integrados para las industrias de las ciencias de la vida, con presencia activa en más de 29 países. Su principal desafío radicaba en que esa autoridad técnica consolidada a nivel global no se traducía en una captación digital eficiente de leads cualificados, lo que limitaba el rendimiento de su equipo comercial en mercados clave.",
    stat: { value: "56%", label: "más de leads cualificados" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Partimos de una cuenta publicitaria con un gasto elevado y un retorno prácticamente nulo, sin estructura analítica ni trazabilidad real de los resultados. Lo primero fue sanear y reconfigurar desde cero el ecosistema de campañas en LinkedIn Ads y Google Ads, estableciendo una medición precisa. Sobre esta base sólida, diseñamos una estrategia de captación adaptada a la complejidad y al ciclo de venta largo propio del sector de la ingeniería GMP, activando campañas segmentadas por mercado y perfil de cliente en múltiples países.",
    solutionImage: null,
    solutionText:
      "Partiendo de una cuenta publicitaria mal estructurada y con un gasto ineficiente, reestructuramos por completo las campañas de LinkedIn Ads y Google Ads de Telstar en múltiples mercados internacionales. Nuestro enfoque permitió alinear cada campaña con el perfil real del decisor en el sector de las ciencias de la vida, segmentando por país, industria y rol profesional. Como resultado, transformamos una inversión publicitaria sin retorno en un motor de captación cualificada que genera de forma sostenida oportunidades comerciales reales para los equipos de ventas de Telstar a escala global.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },

  // ── Otros sectores ──────────────────────────────────────────────────────
  {
    slug: "cbc-collection",
    name: "CBC Collection",
    tagline: "De cero a 50k en facturación: joyería con identidad propia en tres meses",
    description:
      "Carmen Ballesta Collection es una tienda de joyería que ofrece piezas únicas con identidad propia. Sus colecciones temáticas se basan en historias y valores eternos que buscan acompañar a las clientas en lo cotidiano, diferenciándose mediante el significado de cada pieza.",
    stat: { value: "50K", label: "en facturación en los primeros 3 meses" },
    heroImage: "/projects/otros sectores/carmen ballesta collection/cbc_2.webp",
    strategyImage: "/projects/otros sectores/carmen ballesta collection/cbc_1.webp",
    strategyText:
      "La estrategia fue construir una marca desde cero con identidad visual fuerte y coherente. Nos propusimos diferenciarnos en un mercado saturado de joyería online mediante colecciones temáticas conectadas con mitología y simbolismo. Se definió un posicionamiento basado en piezas con historia, no solo como accesorios sino como símbolos de valores eternos. Se priorizó la presencia en redes sociales como canal clave para conectar con una audiencia que buscaba significado en lo que compra.",
    solutionImage: "/projects/otros sectores/carmen ballesta collection/cbc_3.webp",
    solutionText:
      "Desarrollamos una tienda e-commerce en Shopify con diseño personalizado que reflejara la esencia de marca. Creamos identidad visual distintiva: logo, paleta cromática y fotografía de producto coherente. Implementamos arquitectura web intuitiva con colecciones temáticas, newsletter para retención y estrategia de contenido en Instagram. Cada elemento fue diseñado para transmitir los valores de marca y facilitar el customer journey hacia la conversión.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "Carmen Ballesta",
    reviewRole: "Fundadora, CBC Collection",
    reviewQuote: "",
  },
  {
    slug: "polspa",
    name: "Polspa",
    tagline: "Construimos la plataforma digital para impulsar su crecimiento internacional",
    description:
      "Polspa es una empresa especializada en la organización de viajes deportivos entre Polonia y España, centrada en torneos internacionales para jóvenes deportistas. Su reto era ofrecer una experiencia digital a la altura de la calidad de sus eventos, simplificando tanto la captación de participantes como la gestión de cada viaje.",
    stat: { value: "+2", label: "idiomas en una única plataforma" },
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Diseñamos un ecosistema digital pensado para acompañar a las familias y a los organizadores durante todo el proceso. La nueva web se convirtió en el centro de una estrategia que unifica la captación, la comunicación y la gestión de participantes, ofreciendo una experiencia fluida en ambos idiomas.",
    solutionImage: null,
    solutionText:
      "Desarrollamos una plataforma completa en Webflow, disponible en polaco y español, optimizada para presentar todos los torneos y facilitar la inscripción de los participantes. Además, implementamos un sistema de automatizaciones que centraliza el email marketing y simplifica el envío y la gestión de la documentación de los menores, reduciendo la carga administrativa y mejorando la experiencia tanto para las familias como para el equipo de Polspa.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "prominsol",
    name: "Prominsol",
    tagline: "Modernizamos su presencia digital para generar más oportunidades de negocio",
    description:
      "Prominsol es una empresa especializada en climatización, mantenimiento y soluciones térmicas en Madrid. Con una amplia experiencia en el sector, necesitaba una presencia digital capaz de transmitir la calidad de sus servicios y facilitar la captación de nuevos clientes.",
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Planteamos una estrategia digital integral para alinear la presencia online de Prominsol con la calidad de sus servicios. El objetivo era convertir su ecosistema digital en una herramienta de captación, con una web preparada para liderar una estrategia multicanal orientada al crecimiento.",
    solutionImage: null,
    solutionText:
      "Creamos una web moderna, clara y optimizada para la conversión, capaz de reflejar la experiencia y profesionalidad de Prominsol. Junto al trabajo continuo en SEO y campañas digitales, conseguimos aumentar su visibilidad, atraer tráfico cualificado y convertir la web en un canal constante de generación de oportunidades.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
  {
    slug: "solvify",
    name: "Solvify",
    tagline: "Construimos la presencia digital que consolidó su liderazgo en el sector legaltech",
    description:
      "Solvify es una legaltech líder en España dedicada a transformar la forma en que las personas afrontan sus desafíos legales y financieros. A través de soluciones innovadoras, ayuda a personas y familias a superar situaciones de sobreendeudamiento y recuperar el control de su futuro financiero.",
    heroImage: null,
    strategyImage: null,
    strategyText:
      "Diseñamos una estrategia digital integral con un objetivo claro: convertir la presencia online de Solvify en un reflejo de su liderazgo en el mercado. La nueva web se convirtió en el centro de la estrategia, apoyada por acciones de posicionamiento, captación y optimización continua.",
    solutionImage: null,
    solutionText:
      "Desarrollamos una nueva plataforma digital enfocada en la conversión, capaz de transmitir confianza, simplificar procesos complejos y acompañar al usuario en cada paso. El resultado es una marca más sólida, una mejor experiencia digital y una mayor capacidad para generar oportunidades de negocio de calidad.",
    reviewImage: null,
    reviewAvatar: null,
    reviewAuthor: "",
    reviewRole: "",
    reviewQuote: "",
  },
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const stats = [
    ...(project.stat ? [project.stat] : []),
    ...(project.stat2 ? [project.stat2] : []),
  ];

  return (
    <>
      <Header />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">

        {/* Header: tagline izq · nombre proyecto h1 der */}
        <div className="px-4 sm:px-16 pt-16 pb-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-0 md:justify-between">
          <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight md:max-w-[420px] shrink-0">
            {project.tagline}
          </p>
          <RevealH2
            as="h1"
            alwaysAnimate
            splitBy="word"
            className="text-[#c8553d] md:text-foreground text-[32px] md:text-[48px] font-medium tracking-[-0.04em] leading-none"
          >
            {project.name}
          </RevealH2>
        </div>

        {/* Imagen cuadrada (col izq) + descripción y métrica (col der) */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-square overflow-hidden bg-placeholder">
            {project.heroImage && (
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-8 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.description}
              </p>
              {stats.length > 0 && (
                <AnimatedStatBox stats={stats} />
              )}
            </div>
          </div>
        </div>

        {/* Estrategia */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {project.strategyImage && (
              <Image
                src={project.strategyImage}
                alt={`${project.name} — estrategia`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Estrategia
              </p>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.strategyText}
              </p>
            </div>
          </div>
        </div>

        {/* Solución */}
        <div className="px-4 sm:px-16 py-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-32">
          <div className="relative w-full md:w-[420px] shrink-0 aspect-[4/3] overflow-hidden bg-placeholder">
            {project.solutionImage && (
              <Image
                src={project.solutionImage}
                alt={`${project.name} — solución`}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-6 max-w-[560px] mx-auto w-full">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Solución
              </p>
              <p className="text-foreground text-[16px] font-light leading-relaxed">
                {project.solutionText}
              </p>
            </div>
          </div>
        </div>

        {/* Reseña */}
        {project.reviewQuote && (
          <div className="px-4 sm:px-16 py-16">
            <div className="flex flex-col gap-16 max-w-[560px] w-full">
              <p className="text-foreground text-[32px] font-medium tracking-[-0.04em] leading-tight">
                Reseña
              </p>

              <div className="flex items-center gap-3">
                <div className="relative size-[80px] shrink-0 overflow-hidden bg-placeholder">
                  {project.reviewAvatar && (
                    <Image
                      src={project.reviewAvatar}
                      alt={project.reviewAuthor}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 py-3 px-3">
                  <p className="text-foreground text-[16px] font-medium">
                    {project.reviewAuthor}
                  </p>
                  <p className="text-foreground text-[16px] font-light">
                    {project.reviewRole}
                  </p>
                </div>
              </div>

              <p className="text-foreground text-[16px] font-light leading-relaxed">
                "{project.reviewQuote}"
              </p>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
