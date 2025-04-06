import Layout from "@/layout";
import { modules } from "@/modules";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const comp = modules.find((module) => module.id === moduleId);

  if (!comp) {
    return <div>Module not found</div>;
  }
  return <Layout>{comp.component}</Layout>;
}
