import { Card, Typography } from "@mui/material";
import { ReactElement } from "react";

export function PrivacyPolicyPage(): ReactElement {
  return (
    <Card
      sx={{ p: 4, maxHeight: "80vh", overflowY: "auto" }}
      variant="outlined"
    >
      <Typography variant="caption">Version 1.0. Updated 2024-07-10</Typography>

      <Typography gutterBottom sx={{ mt: 3 }} variant="h5">
        Introduction
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        Welcome to Meetly (the {'"App"'}). We respect your privacy and are
        committed to protecting the personal information you share with us. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you use our App.
      </Typography>

      <Typography gutterBottom variant="h5">
        Information We Collect
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        Since our App operates entirely on-premises and no data is shared with
        third parties, the information we collect is limited to what is
        necessary for the App to function properly. <br />
        Personal Information: This may include, but is not limited to, your
        name,email address, and any other information you voluntarily provide to
        us. <br />
        Usage Data: We do not collect usage data for tracking purposes. Any data
        related to your usage of the App remains within the on-premises
        environment and is not shared externally.
      </Typography>

      <Typography gutterBottom variant="h5">
        How We Use Your Information
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        We use the information we collect to: Provide, operate, and maintain our
        App.
      </Typography>

      <Typography gutterBottom variant="h5">
        Data Storage and Security
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        All data is stored on-premises and is not transmitted to any external
        servers or third parties. We implement appropriate technical and
        organizational measures to ensure a level of security appropriate to the
        risk, including: Encryption of data in transit and at rest. Regular
        security audits and updates. Access controls to ensure that only
        authorized personnel have access to your personal information.
      </Typography>

      <Typography gutterBottom variant="h5">
        Data Sharing
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        We do not share your personal information with any third parties. All
        data remains within our secure, on-premises environment.
      </Typography>

      <Typography gutterBottom variant="h5">
        Your Data Protection Rights
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
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
      </Typography>

      <Typography gutterBottom variant="h5">
        {" "}
        Changes to This Privacy Policy
      </Typography>

      <Typography gutterBottom sx={{ mb: 3 }}>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </Typography>
    </Card>
  );
}
