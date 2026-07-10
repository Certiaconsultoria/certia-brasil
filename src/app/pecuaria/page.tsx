import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function PecuariaPage() {
  const commodity = getCommodityBySlug("pecuaria");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
