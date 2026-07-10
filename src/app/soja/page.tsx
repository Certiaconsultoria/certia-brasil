import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function SojaPage() {
  const commodity = getCommodityBySlug("soja");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
