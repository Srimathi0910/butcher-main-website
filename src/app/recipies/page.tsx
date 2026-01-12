import Image from "next/image";
import Link from "next/link";
import { recipes } from "./data";
import Reveal from "../_components/animation/Reveal";
import { Cta } from"../_components";

export default function RecipiesPage() {
  return (
    <section className="container px-6 lg:px-12 py-12">
      <Reveal>
        <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold">Recipes</h1>
      </Reveal>
      <Reveal delay={50}>
        <p className="font-merriweather mt-3 max-w-2xl text-sm md:text-md lg:text-lg">
          Explore our handpicked halal-friendly recipes. Click any card to see the full recipe details and cooking steps.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-20">
        {recipes.slice(0, 12).map((recipe, idx) => (
          <Reveal key={recipe.slug} delay={idx * 60}>
            <article className="rounded-md h-full overflow-hidden bg-main-color/5 border border-black/5">
              <div className="relative h-48 w-full">
                <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-cinzel text-xl font-semibold">{recipe.title}</h3>
                <p className="mt-2 text-sm font-merriweather text-gray-700">{recipe.description}</p>
                <div className="mt-4">
                  <Link href={`/recipies/${recipe.slug}`} className="font-lato text-main-color underline">
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Cta/>
    </section>
  );
}



