import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const GUIDE_URL = "/assets/downloads/free-guide-cycle-syncing-nutrition.pdf";

export default function FreeGuide() {
  useSeo({
    title: "Free Cycle-Syncing Nutrition Guide",
    description:
      "Grab the free cycle-syncing nutrition guide: high-protein meals, stress-free eating out, and hormone-supportive nutrition, without the guesswork.",
  });

  const { toast } = useToast();
  const [delivered, setDelivered] = useState(false);
  const [loadedAt] = useState(() => Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/free-guide.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, loaded_at: loadedAt }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Something went wrong");
      setDelivered(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Couldn't process that",
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <img
          src="/assets/images/photo-rosetta-shoot-extra-01.webp"
          alt="Cycle Syncing Nutrition Guide"
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-md"
          loading="lazy"
          width={700}
          height={875}
        />
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wide-lg text-accent">
            Free Guide
          </p>
          <h1 className="text-balance font-display text-3xl font-medium md:text-4xl">
            Ready to feel confident in your body and eat in a way that supports your hormones?
          </h1>
          <p className="mt-4 text-muted-foreground">
            Grab my free cycle-syncing nutrition guide and learn how to fuel your body with
            high-protein meals, eat out stress-free, and support your hormones — so you can build
            the body you want without the guesswork or fad diets.
          </p>

          {delivered ? (
            <div className="mt-8 rounded-2xl bg-muted/50 p-6">
              <p className="font-medium">You're in! Your guide is ready.</p>
              <Button asChild className="mt-4">
                <a href={GUIDE_URL} download>
                  <Download className="mr-2" size={18} />
                  Download the Guide
                </a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending..." : "Send Me the Guide!"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
