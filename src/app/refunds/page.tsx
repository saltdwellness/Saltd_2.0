import type { Metadata } from 'next';
import { PolicyPage, PolicySection } from '@/components/layout/PolicyPage';

export const metadata: Metadata = { title: 'Refunds & Cancellation · SALTD.' };

export default function RefundsPage() {
  return (
    <PolicyPage
      badge="Legal"
      title="Refunds & Cancellation Policy"
      intro="For purchases made through the SALTD. website."
      lastUpdated="25 February 2026"
    >
      <PolicySection title="1. Order Cancellation Policy">
        <p>
          You may request cancellation <strong>only if your order has not yet been shipped.</strong>
        </p>
        <p>
          To request cancellation, email us at{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">
            support@saltd.in
          </a>{' '}
          with your Order ID and registered contact details. If the order has not been dispatched, we will cancel it and
          initiate a refund. Once an order has been shipped, it cannot be cancelled.
        </p>
      </PolicySection>

      <PolicySection title="2. Return Policy">
        <p>
          Due to the nature of our products (consumable health supplements), we <strong>do not accept returns</strong>{' '}
          except in the following cases:
        </p>
        <ul>
          <li>Product damaged during transit</li>
          <li>Incorrect product delivered</li>
          <li>Manufacturing defect</li>
          <li>Tampered packaging upon delivery</li>
        </ul>
        <p>
          We do not accept returns for change of mind, taste preference, opened or used products, personal intolerance after
          use, or delayed delivery caused by logistics partners.
        </p>
      </PolicySection>

      <PolicySection title="3. Reporting a Damaged or Incorrect Product">
        <p>
          If you receive a damaged, defective, or incorrect product, you must notify us within{' '}
          <strong>48 hours of delivery</strong>. Please email your Order ID, clear photos of outer packaging and the
          product, and a description of the issue. Requests made after 48 hours may not be eligible.
        </p>
      </PolicySection>

      <PolicySection title="4. Return Conditions (If Approved)">
        <p>
          To qualify for return approval, the product must be unused, seal must be intact, original packaging must be
          preserved, and batch number and labels must be clearly visible. We reserve the right to reject returns that do not
          meet these conditions.
        </p>
      </PolicySection>

      <PolicySection title="5. Refund Process">
        <p>
          Once we receive and inspect the returned product, you will be notified of approval or rejection. If approved:
        </p>
        <ul>
          <li>Prepaid orders: Refunded within 5–7 business days to original payment method</li>
          <li>COD orders: Refunded within 7–14 business days via bank transfer</li>
        </ul>
        <p>Refund timelines may vary depending on banking partners.</p>
      </PolicySection>

      <PolicySection title="6. Replacement Policy">
        <p>
          In eligible cases, customers may choose a replacement product (subject to stock availability) or a refund.
          Replacement shipping charges (if any) will be borne by SALTD. only if the issue is validated.
        </p>
      </PolicySection>

      <PolicySection title="7. Non-Returnable Items">
        <p>The following are strictly non-returnable:</p>
        <ul>
          <li>Opened sachets or tubs</li>
          <li>Products without original packaging</li>
          <li>Products returned without approval</li>
          <li>Promotional / free items</li>
        </ul>
      </PolicySection>

      <PolicySection title="8. Refund Delays">
        <p>
          If you have not received your refund within the stated timeline, first check your bank statement, then contact
          your payment provider, and then contact us at{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">
            support@saltd.in
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection title="9. Fraud Prevention">
        <p>
          We reserve the right to deny refund requests in cases of repeated abuse, limit COD options for customers with high
          refusal rates, and investigate suspicious claims.
        </p>
      </PolicySection>

      <PolicySection title="10. Contact Details">
        <p>
          <strong>Company Name:</strong> Aurevia Ventures<br />
          <strong>Brand:</strong> SALTD.<br />
          <strong>Email:</strong>{' '}
          <a href="mailto:support@saltd.in" className="text-saltd-black underline underline-offset-4">support@saltd.in</a>
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
