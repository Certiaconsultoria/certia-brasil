import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function MadeiraPage() {
  const commodity = getCommodityBySlug("madeira");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
