import { getInventoryMedicine } from "@/actions/inventory";
import EditInventoryForm from "./EditInventoryForm";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditMedicinePage({ params }: Props) {
  const medicine = await getInventoryMedicine(Number(params.id));

  if (!medicine) {
    return <div>Medicine not found</div>;
  }

  return <EditInventoryForm medicine={medicine} />;
}
