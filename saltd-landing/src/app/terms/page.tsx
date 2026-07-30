import type { Metadata } from 'next';
import { PolicyPage, PolicySection } from '@/components/layout/PolicyPage';

export const metadata: Metadata = { title: 'Terms & Conditions · SALTD.' };

export default function TermsPage() {
  return (
    <PolicyPage
      badge="Legal"
      title="Terms & Conditions"
      intro="Please read these terms carefully before using the website or purchasing products from SALTD."
      lastUpdated="25 February 2026"
    >
      <p className="font-body text-saltd-black/70 text-[15px] leading-relaxed">
        This document is an electronic record in terms of the Information Technology Act, 2000. By accessing, browsing, or
        purchasing from the website operated under the brand <strong>SALTD.</strong>, owned by Aurevia Ventures, you agree
        to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the Platform.
      </p>

      <PolicySection title="1. Eligibility">
        <p>
          You must be at least 18 years old and legally capable of entering into binding contracts under Indian law to use
          this website. If you are under 18, you may use the website only under supervision of a parent or legal guardian.
        </p>
      </PolicySection>

      <PolicySection title="2. Amendments">
        <p>
          We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon
          posting. Continued use of the website constitutes acceptance of revised Terms.
        </p>
      </PolicySection>

      <PolicySection title="3. Products & Usage">
        <ul>
          <li>SALTD. products are intended for personal use only.</li>
          <li>Resale, redistribution, or commercial exploitation without written consent is prohibited.</li>
          <li>Product images are for representation purposes; packaging and appearance may vary.</li>
          <li>Prices and availability are subject to change without prior notice.</li>
        </ul>
        <p>SALTD. products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease.</p>
      </PolicySection>

      <PolicySection title="4. Health Disclaimer">
        <p>
          Information provided on the website is for informational purposes only. It is not medical advice. Consult a
          qualified healthcare professional before using any supplement, especially if you have a medical condition, are
          pregnant or nursing, are taking medication, or have sodium restrictions. The Company is not liable for misuse of
          products.
        </p>
      </PolicySection>

      <PolicySection title="5. Orders & Payment">
        <p>
          We accept payments through approved payment gateways including UPI, debit/credit cards, net banking, wallets, and
          other available options. All prices are inclusive of applicable taxes unless stated otherwise.
        </p>
        <p>
          We reserve the right to refuse or cancel any order, limit quantities purchased, or cancel orders due to pricing
          errors. If payment is charged and order is cancelled, the amount will be refunded as per our refund policy.
        </p>
      </PolicySection>

      <PolicySection title="6. Shipping & Delivery">
        <p>
          Delivery timelines are estimates and may vary. Delays due to logistics, weather, or external factors are beyond
          our control. Risk of loss transfers upon delivery. Detailed shipping terms are available in our Shipping Policy.
        </p>
      </PolicySection>

      <PolicySection title="7. Account Responsibility">
        <p>
          If you create an account, you are responsible for maintaining confidentiality of login credentials, agree to
          provide accurate information, and must notify us immediately of unauthorized use. We may suspend accounts for
          suspected fraud or policy violations.
        </p>
      </PolicySection>

      <PolicySection title="8. Acceptable Use">
        <p>
          You agree not to engage in illegal activities, attempt unauthorized access to systems, upload malicious software,
          post harmful or defamatory content, or interfere with website functionality. Violation may result in account
          termination and legal action.
        </p>
      </PolicySection>

      <PolicySection title="9. Intellectual Property">
        <p>
          All content on the SALTD. website including logos, product names, text, graphics, designs, and images are owned
          by Aurevia Ventures or licensed to us. Unauthorized reproduction or use is prohibited.
        </p>
      </PolicySection>

      <PolicySection title="10. Warranty Disclaimer">
        <p>
          Products and services are provided <strong>&ldquo;as is&rdquo;</strong> without warranties of any kind. We do not
          guarantee uninterrupted website availability, error-free functionality, or specific health outcomes. To the
          fullest extent permitted by law, we disclaim all implied warranties.
        </p>
      </PolicySection>

      <PolicySection title="11. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Aurevia Ventures shall not be liable for indirect or consequential
          damages, loss of profits, loss of data, or business interruption. Total liability shall not exceed the amount paid
          by you for the product giving rise to the claim.
        </p>
      </PolicySection>

      <PolicySection title="12. Indemnification">
        <p>
          You agree to indemnify and hold harmless Aurevia Ventures, its directors, employees, and affiliates from any
          claims, damages, or expenses arising from violation of these Terms, misuse of the website, or misuse of products.
        </p>
      </PolicySection>

      <PolicySection title="13. Force Majeure">
        <p>
          We are not liable for failure or delay caused by events beyond our reasonable control, including natural
          disasters, strikes, internet outages, governmental actions, or supply chain disruptions.
        </p>
      </PolicySection>

      <PolicySection title="14. Governing Law & Jurisdiction">
        <p>
          These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of
          courts located in Gurgaon, Haryana.
        </p>
      </PolicySection>

      <PolicySection title="15. Contact Details">
        <p>
          <strong>Company Name:</strong> Aurevia Ventures<br />
          <strong>Brand:</strong> SALTD.<br />
          <strong>Registered Address:</strong> South City 2, Gurgaon, Haryana<br />
          <strong>Email:</strong>{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">support@saltd.in</a>
        </p>
        <p>We aim to respond to grievances within 30 days or as required by law.</p>
      </PolicySection>
    </PolicyPage>
  );
}
