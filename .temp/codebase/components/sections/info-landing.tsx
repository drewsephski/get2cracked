import { InfoLdg } from "@/types";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { StaticImage } from "@/components/ui/static-image";

interface InfoLandingProps {
  data: InfoLdg;
  reverse?: boolean;
}

export default function InfoLanding({
  data,
  reverse = false,
}: InfoLandingProps) {
  return (
    <div className="py-10 sm:py-20">
      <MaxWidthWrapper className="grid gap-10 px-2.5 lg:grid-cols-2 lg:items-center lg:px-7">
        <div className={cn(reverse ? "lg:order-2" : "lg:order-1")}>
          <h2 className="font-heading text-2xl text-foreground md:text-4xl lg:text-[40px]">
            {data.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {data.description}
          </p>
          <dl className="mt-6 space-y-4 leading-7">
            {data.list.map((item, index) => {
              const Icon = Icons[item.icon || "arrowRight"];
              return (
                <div className="relative pl-8" key={index}>
                  <dt className="font-semibold">
                    <Icon className="absolute left-0 top-1 size-5 stroke-blue-700" />
                    <span>{item.title}</span>
                  </dt>
                  <dd className="text-sm text-muted-foreground">
                    {item.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border lg:-m-4",
            reverse ? "order-1" : "order-2",
          )}
        >
          <div className="aspect-auto">
            <StaticImage
              className="object-contain object-center dark:opacity-85"
              src={data.image}
              alt={data.title}
              width={600}
              height={400}
              quality={100}
            />
          </div>
          {/* Subtle overlay for design consistency */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10"></div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
