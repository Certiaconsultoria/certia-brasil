import { CommodityPage } from "@/components/CommodityPage";
import { getCommodityBySlug } from "@/content/commodities";

export default function OleoDePalmaPage() {
  const commodity = getCommodityBySlug("oleo-de-palma");
  if (!commodity) return null;
  return <CommodityPage commodity={commodity} />;
}
