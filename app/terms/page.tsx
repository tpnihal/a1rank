import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PACKAGE_MINIMUM, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the A1 Rank website and its free tools.",
  alternates: { canonical: "/terms" },
};

/** Draft wording. Have it reviewed before launch. */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="November 2026"
      intro="By using this website you agree to the terms below."
      sections={[
        {
          heading: "About this website",
          body: (
            <p>
              {SITE.domain} is operated by {SITE.name}, {SITE.location}. The content is general information about our services and is not a binding offer.
            </p>
          ),
        },
        {
          heading: "Packages and pricing",
          body: (
            <p>
              Prices shown are monthly fees in AED and packages have a {PACKAGE_MINIMUM}. The exact scope, price and terms of any engagement are set out in a written proposal or agreement between you and {SITE.name}. Nothing can be purchased on this website.
            </p>
          ),
        },
        {
          heading: "Free Website Audit",
          body: (
            <p>
              The audit tool reports automated measurements for the address you enter. Results can vary between runs and are provided as guidance only, without any guarantee of rankings, traffic or sales. Only audit websites you own or have permission to test.
            </p>
          ),
        },
        {
          heading: "Our content",
          body: <p>The text, design and graphics on this website belong to {SITE.name} unless stated otherwise. Please do not copy them without permission.</p>,
        },
        {
          heading: "Links to other websites",
          body: <p>We may link to other websites for your convenience. We are not responsible for their content or practices.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
