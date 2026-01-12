import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "../data";
import Reveal from "../../_components/animation/Reveal";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;
  const recipe =  recipes.find((r) => r.slug === slug);
  if (!recipe) return notFound();


  return (
    <article className="container px-6 lg:px-12 py-12">
      <Reveal>
        <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold">{recipe.title}</h1>
      </Reveal>
      <Reveal delay={50}>
        <p className="font-merriweather mt-3 max-w-2xl text-sm md:text-md lg:text-lg text-gray-700">{recipe.description}</p>
      </Reveal>

      <Reveal>
        <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] mt-8 rounded-md overflow-hidden">
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <Reveal>
          <section>
            <h2 className="font-cinzel text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc pl-5 mt-3 space-y-2 font-merriweather text-sm md:text-md lg:text-lg">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal className="md:col-span-2">
          <section>
            <h2 className="font-cinzel text-xl font-semibold">Instructions</h2>
            <ol className="list-decimal pl-5 mt-3 space-y-3 font-merriweather text-sm md:text-md lg:text-lg">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10 grid grid-cols-3 gap-4 text-center text-sm font-lato">
          <div className="bg-[var(--primary-background)] p-3 rounded">
            <span className="block opacity-70">Prep Time</span>
            <strong>{recipe.prepTime}</strong>
          </div>
          <div className="bg-[var(--primary-background)] p-3 rounded">
            <span className="block opacity-70">Cook Time</span>
            <strong>{recipe.cookTime}</strong>
          </div>
          <div className="bg-[var(--primary-background)] p-3 rounded">
            <span className="block opacity-70">Servings</span>
            <strong>{recipe.servings}</strong>
          </div>
        </div>
      </Reveal>

      <div className="mt-12">
        <Link href="/recipies" className="font-lato text-main-color underline">← Back to recipes</Link>
      </div>
    </article>
  );
}


