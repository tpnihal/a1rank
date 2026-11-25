import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How A1 Rank collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

/** Draft wording. Have it reviewed against your actual practices before launch. */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      intro="This page explains what information this website collects, why, and the choices you have."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {SITE.name} is a digital marketing agency based in {SITE.location}. This policy covers {SITE.domain}. For any privacy question, email {mail}.
            </p>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <ul>
              <li>Details you send through the enquiry form, such as your name, email address, company, website and message.</li>
              <li>The website address you enter into the free Website Audit tool.</li>
              <li>Basic technical data that any website receives, such as browser type and pages visited.</li>
            </ul>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiry and prepare a proposal.</li>
              <li>To run the audit you asked for and show you the results.</li>
              <li>To keep the website secure and improve how it works.</li>
            </ul>
          ),
        },
        {
          heading: "What we do not do",
          body: <p>This website has no user accounts and takes no payments. We do not sell your personal information.</p>,
        },
        {
          heading: "Service providers",
          body: (
            <p>
              We use trusted providers to host the website, deliver enquiry emails and measure page performance. The audit tool sends the address you enter to Google PageSpeed Insights to produce the report. These providers process data only to deliver their service.
            </p>
          ),
        },
        {
          heading: "Keeping and deleting your information",
          body: <p>We keep enquiry details for as long as needed to respond and to manage our relationship with you. You can ask us to correct or delete your information at any time by emailing {mail}.</p>,
        },
        {
          heading: "Changes to this policy",
          body: <p>If we change this policy we will update this page and the date shown at the top.</p>,
        },
      ]}
    />
  );
}
