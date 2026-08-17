import { getArticles } from "@/lib/wordpress";
import { BlogClient } from "./BlogClient";

export const metadata = {
  title: "Blog | Ítacarb",
  description: "Estrategia de marketing, casos de éxito y tendencias del sector para empresas que quieren crecer.",
};

export default async function BlogPage() {
  let articles = await getArticles().catch(() => []);
  return <BlogClient articles={articles} />;
}
