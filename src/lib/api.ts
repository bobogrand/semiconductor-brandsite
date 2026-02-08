const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
const STRAPI_READ_TOKEN = process.env.STRAPI_READ_TOKEN || "";

function strapiHeaders(): HeadersInit {
  if (!STRAPI_READ_TOKEN) return {};
  return { Authorization: `Bearer ${STRAPI_READ_TOKEN}` };
}

export interface SpecFeature {
  specName: string;
  specMinValue: string;
  specMaxValue: string;
}

export interface ProductItem {
  title: string;
  slug: string;
  description: string;
  displayTitle: string;
  displaySubCategory: string;
  tags: string[] | null;
  specfeatureList: SpecFeature[] | null;
  thumbnailUrl: string | null;
  keyImageUrl: string | null;
}

export interface Ddr5PageData {
  title: string;
  subtitle: string;
  description: string;
  heroImageUrl: string | null;
  keyFeatures: { title: string; value: string; description: string }[];
}

function getStrapiMediaUrl(media: Record<string, unknown> | null): string | null {
  if (!media) return null;
  const url = (media as { url?: string }).url;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_API_URL}${url}`;
}

// -- DDR5 Page (Single Type) --

export async function fetchDdr5Page(): Promise<Ddr5PageData | null> {
  try {
    const res = await fetch(
      `${STRAPI_API_URL}/api/ddr5-page?populate=*`,
      { headers: strapiHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const d = json.data;
    if (!d) return null;
    return {
      title: d.title || "DDR5",
      subtitle: d.subtitle || "",
      description: d.description || "",
      heroImageUrl: getStrapiMediaUrl(d.heroImage),
      keyFeatures: (d.keyFeatures || []).map(
        (f: { title: string; value: string; description: string }) => ({
          title: f.title,
          value: f.value,
          description: f.description || "",
        })
      ),
    };
  } catch (error) {
    console.error("Failed to fetch DDR5 page:", error);
    return null;
  }
}

// -- DDR5 Products (Collection Type) --

function mapStrapiProduct(item: Record<string, unknown>): ProductItem {
  return {
    title: (item.title as string) || "",
    slug: (item.slug as string) || "",
    description: (item.description as string) || "",
    displayTitle: (item.displayTitle as string) || "",
    displaySubCategory: (item.displaySubCategory as string) || "",
    tags: (item.tags as string[]) || null,
    specfeatureList: (item.specfeatures as SpecFeature[]) || null,
    thumbnailUrl: getStrapiMediaUrl(item.thumbnail as Record<string, unknown> | null),
    keyImageUrl: getStrapiMediaUrl(item.keyImage as Record<string, unknown> | null),
  };
}

export async function fetchDdr5Products(): Promise<ProductItem[]> {
  try {
    const res = await fetch(
      `${STRAPI_API_URL}/api/ddr5-products?populate=*&pagination[pageSize]=100`,
      { headers: strapiHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map(mapStrapiProduct);
  } catch (error) {
    console.error("Failed to fetch DDR5 products:", error);
    return [];
  }
}

export async function fetchDdr5ProductBySlug(
  slug: string
): Promise<ProductItem | null> {
  try {
    const res = await fetch(
      `${STRAPI_API_URL}/api/ddr5-products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { headers: strapiHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const items = json.data || [];
    if (items.length === 0) return null;
    return mapStrapiProduct(items[0]);
  } catch (error) {
    console.error(`Failed to fetch product (${slug}):`, error);
    return null;
  }
}

export async function fetchDdr5ProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${STRAPI_API_URL}/api/ddr5-products?fields[0]=slug&pagination[pageSize]=100`,
      { headers: strapiHeaders() }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((item: { slug: string }) => item.slug);
  } catch (error) {
    console.error("Failed to fetch product slugs:", error);
    return [];
  }
}
