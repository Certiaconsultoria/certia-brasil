import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function CafePage() {
  const commodity = getCommodityBySlug("cafe");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
