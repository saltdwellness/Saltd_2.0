import type { Metadata } from 'next';
import { PolicyPage, PolicySection } from '@/components/layout/PolicyPage';

export const metadata: Metadata = { title: 'Privacy Policy · SALTD.' };

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      badge="Legal"
      title="Privacy Policy"
      intro="How Aurevia Ventures collects, uses, and protects your personal information."
      lastUpdated="25 February 2026"
    >
      <p className="font-body text-saltd-black/70 text-[15px] leading-relaxed">
        This Privacy Policy explains how <strong>Aurevia Ventures</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, stores, and protects your personal information when you
        access or use the website, products, or services of <strong>SALTD.</strong> (the &ldquo;Platform&rdquo;). By
        accessing or using our Platform, you agree to this Privacy Policy.
      </p>

      <PolicySection title="1. Scope and Applicability">
        <p>
          This Policy applies to individuals who visit the SALTD. website, purchase SALTD. products, subscribe to marketing
          communications, contact customer support, or participate in promotions or campaigns.
        </p>
        <p>
          This Privacy Policy is drafted in accordance with applicable Indian laws, including the Information Technology
          Act, 2000 and relevant data protection rules.
        </p>
      </PolicySection>

      <PolicySection title="2. Information We Collect">
        <p><strong>A. Information You Provide</strong></p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and shipping address</li>
          <li>Order details</li>
          <li>Feedback, reviews, and survey responses</li>
          <li>Customer service communications</li>
        </ul>
        <p><strong>B. Information Collected Automatically</strong></p>
        <p>
          When you visit the SALTD. website, we may collect IP address, device and browser information, pages visited, time
          spent on pages, referring URLs, and cookies and tracking data.
        </p>
        <p><strong>C. Payment Information</strong></p>
        <p>
          Payments are processed via secure third-party payment gateways that comply with industry security standards (such
          as PCI-DSS). Aurevia Ventures does not store full credit or debit card details on its servers.
        </p>
      </PolicySection>

      <PolicySection title="3. How We Use Your Information">
        <p>
          We use personal information to process and fulfil orders, provide shipping and delivery updates, respond to
          customer queries, improve website functionality and user experience, analyse performance and usage trends, send
          marketing communications (if you opt in), prevent fraud and secure our platform, and comply with legal
          obligations.
        </p>
        <p><strong>We do not sell or trade personal information.</strong></p>
      </PolicySection>

      <PolicySection title="4. Marketing Communications">
        <p>
          If you subscribe to receive updates from SALTD., we may send product launches, special offers, and brand updates.
          You may unsubscribe at any time using the link in our emails. Transactional communications such as order
          confirmations and shipping updates will continue as necessary.
        </p>
      </PolicySection>

      <PolicySection title="5. Cookies and Tracking Technologies">
        <p>
          We use cookies to enable shopping cart functionality, remember user preferences, analyse traffic and website
          performance, and improve marketing effectiveness. You may disable cookies through your browser settings. However,
          some website features may not function properly if cookies are disabled. We may use third-party analytics tools
          (such as Google Analytics) to collect anonymised usage data.
        </p>
      </PolicySection>

      <PolicySection title="6. Sharing of Information">
        <p>
          We may share personal information with trusted third parties strictly for operational purposes, including payment
          processors, shipping and logistics providers, IT and hosting service providers, marketing and analytics partners,
          and legal authorities when required by law. All partners are contractually obligated to safeguard your data. We do
          not rent, sell, or commercially exploit personal data.
        </p>
      </PolicySection>

      <PolicySection title="7. Data Security">
        <p>
          We implement reasonable technical and organizational safeguards, including SSL encryption, secure hosting
          infrastructure, restricted access to sensitive data, and regular security monitoring. While we take strong
          precautions, no digital system can guarantee absolute security.
        </p>
      </PolicySection>

      <PolicySection title="8. Data Retention">
        <p>
          We retain personal information only as long as necessary to complete transactions, comply with tax and legal
          requirements, resolve disputes, and prevent fraud. When no longer required, information is securely deleted or
          anonymized.
        </p>
      </PolicySection>

      <PolicySection title="9. Your Rights">
        <p>
          Subject to applicable law, you may request access to your personal data, request correction of inaccurate data,
          request deletion (subject to legal obligations), and withdraw consent for marketing communications. To exercise
          these rights, contact us using the details below.
        </p>
      </PolicySection>

      <PolicySection title="10. Third-Party Links">
        <p>
          The SALTD. website may contain links to third-party websites. Aurevia Ventures is not responsible for the privacy
          practices of external platforms. We encourage reviewing their privacy policies separately.
        </p>
      </PolicySection>

      <PolicySection title="11. Children’s Privacy">
        <p>
          SALTD. is not intended for individuals under 18 years of age. We do not knowingly collect personal information
          from minors. If such information is identified, it will be deleted promptly.
        </p>
      </PolicySection>

      <PolicySection title="12. Business Transfers">
        <p>
          In the event of a merger, acquisition, restructuring, or sale involving Aurevia Ventures, user information may be
          transferred as part of business assets. Your information will continue to be protected under this Privacy Policy.
        </p>
      </PolicySection>

      <PolicySection title="13. Policy Updates">
        <p>
          We may update this Privacy Policy periodically. Changes will be reflected by revising the &ldquo;Last
          Updated&rdquo; date. Continued use of the Platform after updates constitutes acceptance of the revised Policy.
        </p>
      </PolicySection>

      <PolicySection title="14. Contact & Grievance Redressal">
        <p>
          <strong>Company Name:</strong> Aurevia Ventures<br />
          <strong>Brand:</strong> SALTD.<br />
          <strong>Registered Address:</strong> South City 2, Gurgaon, Haryana<br />
          <strong>Email:</strong>{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">support@saltd.in</a>
        </p>
        <p>We aim to respond to grievances within 30 days or as required by applicable law.</p>
      </PolicySection>
    </PolicyPage>
  );
}
