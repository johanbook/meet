import { ReactElement } from "react";

import { PrivacyPolicyPageNav } from "./PrivacyPolicyPage.nav";

export function PrivacyPolicyPage(): ReactElement {
  return (
    <PrivacyPolicyPageNav>
      <p>Version 1.0, Updated 2024-07-10</p>

      <h2>Introduction</h2>
      <p>
        Welcome to Meetly (the {'"App"'}). We respect your privacy and are
        committed to protecting the personal information you share with us. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you use our App.
      </p>

      <h2>Information We Collect</h2>

      <p>
        Since our App operates entirely on-premises and no data is shared with
        third parties, the information we collect is limited to what is
        necessary for the App to function properly. <br />
        Personal Information: This may include, but is not limited to, your
        name,email address, and any other information you voluntarily provide to
        us. <br />
        Usage Data: We do not collect usage data for tracking purposes. Any data
        related to your usage of the App remains within the on-premises
        environment and is not shared externally.
      </p>

      <h2>How We Use Your Information</h2>

      <p>
        We use the information we collect to: Provide, operate, and maintain our
        App.
      </p>

      <h2>Data Storage and Security</h2>

      <p>
        All data is stored on-premises and is not transmitted to any external
        servers or third parties. We implement appropriate technical and
        organizational measures to ensure a level of security appropriate to the
        risk, including: Encryption of data in transit and at rest. Regular
        security audits and updates. Access controls to ensure that only
        authorized personnel have access to your personal information.
      </p>

      <h2>Data Sharing</h2>

      <p>
        We do not share your personal information with any third parties. All
        data remains within our secure, on-premises environment.
      </p>

      <h2>Your Data Protection Rights</h2>

      <p>
        Depending on your location, you may have the following rights regarding
        your personal information:
        <ul>
          <li>
            The right to access: You have the right to request copies of your
            personal information.
          </li>
          <li>
            The right to rectification: You have the right to request that we
            correct any information you believe is inaccurate or complete
            information you believe is incomplete. The right to erasure You have
            the right to request that we erase your personal information, under
            certain conditions.
          </li>
          <li>
            The right to restrict processing: You have the right to request that
            we restrict the processing of your personal information, under
            certain conditions.
          </li>
          <li>
            The right to object to processing: You have the right to object to
            our processing of your personal information, under certain
            conditions.
          </li>
          <li>
            The right to data portability: You have the right to request that we
            transfer the data that we have collected to another organization, or
            directly to you, under certain conditions.
          </li>
        </ul>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us at our contact
        information provided below.
      </p>

      <h2> Changes to This Privacy Policy</h2>

      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>
    </PrivacyPolicyPageNav>
  );
}
