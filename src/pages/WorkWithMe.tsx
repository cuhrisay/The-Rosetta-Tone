import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";

const schema = z.object({
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  services_interested: z.enum(["Personal Training", "Pole Dance Lessons", "Both"], {
    errorMap: () => ({ message: "Please choose one" }),
  }),
  training_option: z.string().min(1, "Please choose one"),
  fitness_level: z.string().min(1, "Please choose one"),
  goals: z.string().min(1, "Required"),
  eating_habits: z.string().min(1, "Required"),
  barriers: z.string().min(1, "Required"),
  methods_tried: z.string().min(1, "Required"),
  cycle_syncing: z.string().min(1, "Please choose one"),
  good_fit: z.string().min(1, "Required"),
  commitment: z.string().min(1, "Please choose one"),
  heard_about: z.string().min(1, "Please choose one"),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function WorkWithMe() {
  useSeo({
    title: "1:1 Coaching Application",
    description:
      "Apply for 1:1 personal training, nutrition coaching, or pole dance lessons with Rosetta Riley.",
  });

  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loadedAt] = useState(() => Date.now());
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/application.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, loaded_at: loadedAt }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Couldn't send your application",
        description: "Please try again, or email me directly.",
      });
    }
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Application Received" title="Thank you!">
          I personally review every application. I'll be in touch soon to see if we're a good fit.
        </PageHero>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Let's Work Together" title="1:1 Coaching Application">
        Ready to sculpt your body, feel confident, and commit to a routine that actually works?
        Fill out the application and I'll personally review it to see if we're a good fit.
      </PageHero>

      <section className="py-16 md:py-24">
        <form onSubmit={handleSubmit(onSubmit)} className="container max-w-2xl space-y-8">
          {/* Honeypot, hidden from real users */}
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register("first_name")} />
              {errors.first_name && <p className="mt-1 text-sm text-destructive">{errors.first_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...register("last_name")} />
              {errors.last_name && <p className="mt-1 text-sm text-destructive">{errors.last_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <Label>Which services are you interested in?</Label>
            <RadioGroup
              className="mt-2 space-y-2"
              onValueChange={(v) => setValue("services_interested", v as FormValues["services_interested"])}
            >
              {["Personal Training", "Pole Dance Lessons", "Both"].map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`services-${opt}`} />
                  <Label htmlFor={`services-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.services_interested && <p className="mt-1 text-sm text-destructive">{errors.services_interested.message}</p>}
          </div>

          <SelectField
            label="Which training option are you most interested in right now?"
            onValueChange={(v) => setValue("training_option", v)}
            error={errors.training_option?.message}
            options={["Hybrid (in-person + online)", "Fully online", "Not sure yet"]}
          />

          <SelectField
            label="How would you describe your current fitness level?"
            onValueChange={(v) => setValue("fitness_level", v)}
            error={errors.fitness_level?.message}
            options={[
              "Beginner: just starting or returning after a long break",
              "Intermediate: working out consistently, but need guidance",
              "Advanced: experienced but ready to level up with structure",
            ]}
          />

          <TextField
            label="What are your top 2-3 fitness or nutrition goals right now?"
            error={errors.goals?.message}
            registerProps={register("goals")}
          />
          <TextField
            label="How would you describe your current eating habits and relationship with food?"
            error={errors.eating_habits?.message}
            registerProps={register("eating_habits")}
          />
          <TextField
            label="What barriers or challenges have held you back from reaching your health goals in the past?"
            error={errors.barriers?.message}
            registerProps={register("barriers")}
          />
          <TextField
            label="What methods, programs, or diets have you tried before? What worked, what didn't?"
            error={errors.methods_tried?.message}
            registerProps={register("methods_tried")}
          />

          <SelectField
            label="Are you open to incorporating cycle syncing (training and eating based on your menstrual cycle) into your routine?"
            onValueChange={(v) => setValue("cycle_syncing", v)}
            error={errors.cycle_syncing?.message}
            options={["Yes, absolutely", "Maybe, tell me more", "Not right now"]}
          />

          <TextField
            label="Why do you believe you're a good fit for 1:1 coaching with me?"
            error={errors.good_fit?.message}
            registerProps={register("good_fit")}
          />

          <SelectField
            label="On a scale of 1–10, how committed are you to taking action toward your goals?"
            onValueChange={(v) => setValue("commitment", v)}
            error={errors.commitment?.message}
            options={Array.from({ length: 10 }, (_, i) => String(i + 1))}
          />

          <SelectField
            label="How did you hear about me?"
            onValueChange={(v) => setValue("heard_about", v)}
            error={errors.heard_about?.message}
            options={["Instagram", "TikTok", "Facebook", "Word of Mouth", "Pole Studio", "Other"]}
          />

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Sending..." : "Send Application"}
          </Button>
        </form>
      </section>
    </>
  );
}

function SelectField({
  label,
  options,
  onValueChange,
  error,
}: {
  label: string;
  options: string[];
  onValueChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function TextField({
  label,
  error,
  registerProps,
}: {
  label: string;
  error?: string;
  registerProps: ReturnType<ReturnType<typeof useForm>["register"]>;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Textarea className="mt-2" rows={4} {...registerProps} />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
