import { notFound, redirect } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { getTableOfContents } from "@/lib/toc";
import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/page-header";
import { DocsPager } from "@/components/docs/pager";
import { DashboardTableOfContents } from "@/components/shared/toc";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";

async function getDocFromParams() {
  const doc = allDocs.find((doc) => doc.slugAsParams === "");

  if (!doc) {
    throw new Error("Root docs page not found");
  }

  return doc;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await getDocFromParams();
    const { title, description } = doc;

    return constructMetadata({
      title: `${title} – Get Cracked Starter`,
      description: description,
    });
  } catch {
    return constructMetadata({
      title: "Documentation – Get Cracked Starter",
      description: "Documentation for the Get Cracked Starter SaaS boilerplate",
    });
  }
}

export default async function DocsPage() {
  let doc;

  try {
    doc = await getDocFromParams();
  } catch {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  const images = await Promise.all(
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <div className="pb-4 pt-11">
          <Mdx code={doc.body.code} images={images} />
        </div>
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
