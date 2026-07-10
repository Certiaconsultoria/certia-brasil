import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function BorrachaNaturalPage() {
  const commodity = getCommodityBySlug("borracha-natural");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
