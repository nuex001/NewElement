import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "llnmhm6w",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skZJ9ebTPXh4WqwYrpVvppTz6qrrUV06fvRuZzMCO9tfp9vaorpFhfU61pKPGd9XsyeaIbFWkhAsdXH0W1w0dd94pyuviNdv9JSNXhWPMzprITXcPgks4qvyHtai47BVo3v4Jd99H11UnASe5Nvrh3iLa8LH3oBRU3pyveJoOrYg9geRr6rR",
  useCdn: false,
});
