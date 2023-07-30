export type Policy = unknown;

interface CreatePublicBucketPolicyProps {
  bucketName: string;
}

export function createPublicBucketPolicy({
  bucketName,
}: CreatePublicBucketPolicyProps): Policy {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: ["s3:GetObject"],
        Effect: "Allow",
        Principal: "*",
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };
}
