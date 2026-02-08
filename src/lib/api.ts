const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
const SAMSUNG_SEARCH_API = process.env.NEXT_PUBLIC_SAMSUNG_SEARCH_API || "";
const SAMSUNG_IMAGE_BASE = process.env.NEXT_PUBLIC_SAMSUNG_IMAGE_BASE || "";

export interface ProductItem {
  title: string;
  description: string;
  linkUrl: string;
  thumbnailUrl: string;
  displayTitle: string;
  displaySubCategory: string;
  keyImageUrl: string;
  iaid: string;
  staticTag: string[] | null;
  specfeatureList: SpecFeature[] | null;
  stateCd: string;
  stateNm: string;
}

export interface SpecFeature {
  specName: string;
  specMinValue: string;
  specMaxValue: string;
}

export function getSamsungImageUrl(keyImageUrl: string): string {
  if (!keyImageUrl) return "";
  return `${SAMSUNG_IMAGE_BASE}${keyImageUrl}`;
}

export function getSamsungThumbnailUrl(thumbnailUrl: string): string {
  if (!thumbnailUrl) return "";
  return `${SAMSUNG_IMAGE_BASE}/semiconductor${thumbnailUrl}`;
}

export async function fetchProducts(
  filter?: string,
  num: number = 100
): Promise<ProductItem[]> {
  try {
    const filterParam = filter ? `&filter=${encodeURIComponent(filter)}` : "";
    const res = await fetch(
      `${SAMSUNG_SEARCH_API}?q=&site=semi&num=${num}&pageno=1&category=products&stage=live${filterParam}&hashtagFlag=N`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const contentList =
      data?.response?.resultData?.resultList?.[0]?.contentList || [];
    return contentList.map((item: Record<string, unknown>) => ({
      title: item.title || "",
      description: item.description || "",
      linkUrl: item.linkUrl || "",
      thumbnailUrl: item.thumbnailUrl || "",
      displayTitle: item.displayTitle || "",
      displaySubCategory: item.displaySubCategory || "",
      keyImageUrl: item.keyImageUrl || "",
      iaid: item.iaid || "",
      staticTag: item.staticTag || null,
      specfeatureList: item.specfeatureList || null,
      stateCd: item.stateCd || "",
      stateNm: item.stateNm || "",
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function fetchStrapiContent(endpoint: string) {
  try {
    const res = await fetch(`${STRAPI_API_URL}/api/${endpoint}`, {
      next: { revalidate: 3600 },
    });
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch from Strapi (${endpoint}):`, error);
    return null;
  }
}

export function filterProductsByCategory(
  products: ProductItem[],
  category: string
): ProductItem[] {
  return products.filter((p) =>
    p.linkUrl.toLowerCase().includes(`/${category.toLowerCase()}/`)
  );
}

export function getProductBySlug(
  products: ProductItem[],
  slug: string
): ProductItem | undefined {
  return products.find((p) => {
    const parts = p.linkUrl.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];
    return lastPart?.toLowerCase() === slug.toLowerCase();
  });
}
