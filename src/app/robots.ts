import environments from "@/utils/environments";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/r/:roomId*", "/calendar"],
      },
    ],
    sitemap: `${environments.NEXT_PUBLIC_SERVER_URL}/sitemap.xml`,
  };
}
