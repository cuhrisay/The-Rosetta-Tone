import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Required"),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  useSeo({
    title: "Contact",
    description: "Have a general question for Rosetta Riley? Get in touch.",
  });

  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loadedAt] = useState(() => Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, loaded_at: loadedAt }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Couldn't send your message",
        description: "Please try again, or email rosetta@therosettatone.net directly.",
      });
    }
  };

  if (submitted) {
    return (
      <PageHero eyebrow="Message Sent" title="Thank you!">
        I'll get back to you as soon as I can.
      </PageHero>
    );
  }

  return (
    <>
      <PageHero eyebrow="Get In Touch" title="Contact">
        Have a general question that doesn't need a full coaching application? Send me a message.
        Looking to work together 1:1?{" "}
        <a href="/11-coaching" className="underline underline-offset-2 hover:text-primary">
          Apply here instead
        </a>
        .
      </PageHero>

      <section className="py-16 md:py-24">
        <form onSubmit={handleSubmit(onSubmit)} className="container max-w-xl space-y-6">
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} {...register("message")} />
            {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
    </>
  );
}
