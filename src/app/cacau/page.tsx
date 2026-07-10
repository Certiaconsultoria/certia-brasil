import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function CacauPage() {
  const commodity = getCommodityBySlug("cacau");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
