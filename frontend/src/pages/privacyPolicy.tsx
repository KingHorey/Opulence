import { PageContainer } from "../components/pageContainer";
import { NavBar } from "../components/navBar";
import { Footer } from "../components/footer";

export function PrivacyPolicy() {
  return (
    <PageContainer>
      <NavBar />
      <main className="">
        <div className="w-3/4 mx-auto flex flex-col gap-5 text-xl">
          <h1 className="text-4xl  raleway font-semibold mb-5">
            Privacy Policy
          </h1>
          <p className="text-2xl">
            <strong>Last updated: August 28, 2024</strong>
          </p>
          <p className="text-xl">
            Welcome to Opulence! We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data when you visit our
            website{" "}
            <a href="https://opulence-zeta.vercel.app">
              https://opulence-six.vercel.app
            </a>{" "}
            and make use of our services.
          </p>
          <p>
            By using Opulence, you agree to the collection and use of
            information in accordance with this policy.
          </p>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <h3>1.1 Personal Information</h3>
          <p>
            When you register on our site, make a purchase, or interact with our
            services, we may collect the following personal information:
          </p>
          <ul className="list-disc">
            <li>Name</li>
            <li>Email address</li>
            <li>Shipping and billing address</li>
            <li>Phone number</li>
            <li>Payment information (credit/debit card details, etc.)</li>
            <li>Any other information you choose to provide</li>
          </ul>
          <h3>1.2 Non-Personal Information</h3>
          <p>
            We also collect non-personal information automatically, such as:
          </p>
          <ul className="list-disc">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on the site</li>
            <li>Referral source</li>
          </ul>
          <h2 className="text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            We may use the information we collect for various purposes,
            including:
          </p>
          <ul className="list-disc">
            <li>
              <strong>To Process Transactions:</strong> Handling payments,
              shipping orders, and providing customer support.
            </li>
            <li>
              <strong>To Improve Our Services:</strong> Analyzing usage patterns
              to enhance the user experience.
            </li>
            <li>
              <strong>To Send Periodic Emails:</strong> With your consent, we
              may send promotional emails, updates, and special offers.
            </li>
            <li>
              <strong>To Protect Our Site:</strong> Monitoring and preventing
              fraud, security breaches, and illegal activities.
            </li>
          </ul>
          <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties, except:
          </p>
          <ul className="list-disc">
            <li>
              <strong>Service Providers:</strong> Trusted third-party companies
              that assist us in operating our website, conducting business, or
              servicing you (e.g., payment processors, shipping companies).
            </li>
            <li>
              <strong>Legal Compliance:</strong> When required by law, or to
              protect our rights, property, or safety, we may disclose your
              information.
            </li>
          </ul>
          <h2 className="text-xl font-semibold">
            4. Cookies and Tracking Technologies
          </h2>
          <p>Opulence uses cookies and similar tracking technologies to:</p>
          <ul className="list-disc">
            <li>
              <strong>Remember your preferences:</strong> Such as items in your
              shopping cart or your login status.
            </li>
            <li>
              <strong>Analyze site traffic:</strong> To understand user behavior
              and improve our services.
            </li>
          </ul>
          <p>
            You can disable cookies through your browser settings, but this may
            affect your ability to use certain features of the site.
          </p>
          <h2 className="text-xl font-semibold">5. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored in secure networks
            and is only accessible by authorized personnel with special access
            rights.
          </p>
          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc">
            <li>
              <strong>Access:</strong> Request a copy of the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Ask us to correct any inaccuracies in
              your information.
            </li>
            <li>
              <strong>Deletion:</strong> Request the deletion of your personal
              information, subject to legal obligations.
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing
              communications at any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:oreoluwa@example.com">oreoluwa@example.com</a>.
          </p>
          <h2 className="text-xl font-semibold">7. Third-Party Links</h2>
          <p>
            Our site may include links to third-party websites. We are not
            responsible for the privacy practices or content of these sites. We
            encourage you to read the privacy policies of any third-party sites
            you visit.
          </p>
          <h2 className="text-xl font-semibold">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated date. We encourage you
            to review this policy periodically.
          </p>
          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>Oreoluwa Akinbo</p>
          <br></br>
          17, Pastor Ayeni Avenue, Magboro<br></br>
          <a href="mailto:opulence@scrribbles.tech">opulence@scrribbles.tech</a>
          <p>Thank you for trusting Opulence with your personal information.</p>
        </div>
      </main>
      <Footer />
    </PageContainer>
  );
}
